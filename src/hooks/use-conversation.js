import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import {
  FrownOutlined,
  AlertOutlined,
  LoadingOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import notification from 'antd/lib/notification';
import Alert from 'antd/lib/alert';
import Spin from 'antd/lib/spin';
import conversationService from '../apis/conversation.service.ts';
import { MessageStoreContext } from '../stores/message.store';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { SocketStoreContext } from '../stores/socket.store';
import { PER_PAGE_OPTIONS } from '../dto/commons/PaginationRequest.dto';

const conversationContext = createContext();

export function ProvideConversation({ children }) {
  const conversation = useProvideConversation();
  return (
    <conversationContext.Provider value={conversation}>
      {children}
    </conversationContext.Provider>
  );
}

export const useConversation = () => {
  return useContext(conversationContext);
};

function useProvideConversation() {
  const { user } = useAuth();
  const history = useHistory();
  const [currentConversation, setCurrentConversation] = useState(-1);
  const [isChatbotActive, setIsChatbotActive] = useState(false);
  const [conversationName, setConversationName] = useState('');
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState([]);
  const socketStore = useContext(SocketStoreContext);
  const socket = socketStore.socket;
  const [alert, setAlert] = useState(null);
  const [isQueued, setIsQueued] = useState(false);
  const [numUser, setNumUser] = useState(0);
  const [listUser, setListUser] = useState([]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(+PER_PAGE_OPTIONS[1]);
  const [partnerId, setPartnerId] = useState(-1);
  const messageStore = useContext(MessageStoreContext);

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    socket.emit('online', { username: user.username });
    socket.on('connected', (data) => {
      setNumUser(data.numUser);
      setListUser(data.onlineUsers);
    });
    socket.on('online', (data) => {
      setNumUser(data.numUser);
      if (data.isOnline) {
        setListUser((prev) => prev.concat(data.username));
      } else {
        setListUser((prev) => prev.filter((e) => e !== data.username));
      }
    });
    socket.on('finding', () => {
      notification['info']({
        message: 'Đang tìm người trò chuyện',
        description:
          'Nhanh thôi, bạn chờ tí nhé. Trong lúc chờ đợi, hãy chat với chat bot của tụi mình nhé',
        icon: (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        ),
      });
    });

    socket.on('joined', (data) => {
      console.log(data);
      if (data.status === 'new') {
        console.log('abcdef');
        handleFoundNotification();
        setCurrentConversation(-1);
        setMessage([]);
        getAll();
      }
      setConversationName(data.conversationName);
      setPartnerId(data.partnerId);
      setAlert(null);
    });

    socket.on('online', (data) => {
      setNumUser(data.numUser);
    });
  }, [socket]);

  useEffect(() => {
    console.log(conversationName);
    socket.on(conversationName, (m) => {
      if (m === 'end') {
        setIsQueued(false);
        notification['info']({
          message: 'Kết thúc cuộc trò chuyện',
          description: 'Cuộc trò chuyện đã được kết thúc',
          icon: <FrownOutlined style={{ color: '#108ee9' }} />,
        });
        getAll();
        return;
      }

      if (m.isGotPersonality) {
        getPersonality();
      }

      if (m.isBadword) {
        notification['warning']({
          message: 'Cẩn thận ngôn từ nhé',
          description:
            'Chúng mình nhận thấy cuộc trò chuyện đang sử dụng một số ngôn từ không phù hợp đó',
          icon: <FrownOutlined style={{ color: '#108ee9' }} />,
        });
      }

      if (m.isBlocked) {
        notification['error']({
          message: 'Liên hệ admin để mở khóa',
          description:
            'Tài khoản của bạn đã bị khóa vì sử dụng quá nhiều ngôn ngữ không phù hợp',
          icon: <AlertOutlined style={{ color: '#108ee9' }} />,
        });
        history.push('/dang-nhap');
      }

      setMessage((prev) => [
        ...prev,
        {
          message: m.message,
          isOwn: m.partnerId !== user.id,
          updatedAt: m.updatedAt,
        },
      ]);
    });

    return () => socket.off(conversationName);
  }, [conversationName]);

  const handleFindPartner = () => {
    setIsChatbotActive(false);
    setMessage([]);
    console.log('test');
    socket.emit('find', {
      token: user.token,
    });
    getAll();
    setCurrentConversation(-1);
  };

  const handleChatBot = () => {
    setMessage([]);
    setIsChatbotActive(true);
  };

  const handleEndConversation = (conv) => {
    setIsChatbotActive(false);
    console.log(conv);
    socket.emit('end', {
      token: user.token,
      conversationName: conv.name,
      selectedConversation: conv.id,
      partnerId: conv.conversationUser.id,
    });
    console.log('end');

    setCurrentConversation(-1);
  };

  const handleSendMessage = (message) => {
    if (isChatbotActive) {
      setMessage((prev) => [
        ...prev,
        { message: message, isOwn: true, updatedAt: new Date().toISOString() },
      ]);
      Chatbot.get_response({ text: message }).then((res) => {
        setMessage((prev) => [
          ...prev,
          {
            message: res.response,
            isOwn: false,
            updatedAt: new Date().toISOString(),
          },
        ]);
      });
    } else {
      socket.emit('message', {
        token: user.token,
        conversationName,
        partnerId,
        message,
        isSensitive,
      });

      setIsSensitive(false);
    }
  };

  const handleSensitive = (value) => {
    setIsSensitive(value);
  };

  const handleFoundNotification = () => {
    setIsChatbotActive(false);
    notification.open({
      message: 'Đã tìm thấy',
      description:
        'Đã tìm được người tâm sự với bạn rồi đây. Chúc bạn có một cuộc nói chuyện vui vẻ <3',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const handleSelectConversation = (values) => {
    setIsChatbotActive(false);
    setCurrentConversation(values.id);
    setConversationName(values.name);
    setAlert(null);
    getAll();
  };

  // useEffect(() => {
  //   if (setCurrentConversation !== -1) {
  //     messageStore.getConversation(setCurrentConversation, {
  //       skip,
  //       take,
  //     });
  //   }
  // }, [setCurrentConversation, skip, take]);

  const handleDisconnected = () => {
    setIsDisconnected(true);
  };

  const getAll = async () => {
    const { data, count } = await conversationService.get();
    console.log(data);
    setConversations(data);
  };

  const get = async (conversation) => {
    await conversationService.get(conversation);
    setCurrentConversation(conversation);
  };

  const send = (message) => {
    setMessage((prev) => [...prev, message]);
  };

  const clear = () => {
    setMessage([]);
  };

  // const find = () => {};
  return {
    currentConversation,
    handleFindPartner,
    handleSelectConversation,
    handleEndConversation,
    conversations,
    message,
    send,
    clear,
  };
}
