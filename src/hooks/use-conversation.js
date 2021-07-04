import {
  AlertOutlined,
  FrownOutlined,
  LoadingOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import notification from 'antd/lib/notification';
import Spin from 'antd/lib/spin';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Chatbot } from '../apis/chatbot';
import conversationService from '../apis/conversation.service.ts';
import messageService from '../apis/message.service';
import Personality from '../apis/personality.service';
import { PER_PAGE_OPTIONS } from '../dto/commons/PaginationRequest.dto';
import { useAuth } from '../hooks/use-auth';
import { SocketStoreContext } from '../stores/socket.store';

const conversationContext = createContext();

export function ProvideConversation(props) {
  const { children, handleShowExpertList, handleShowFeed } = props;
  const conversation = useProvideConversation(
    handleShowExpertList,
    handleShowFeed
  );
  return (
    <conversationContext.Provider value={conversation}>
      {children}
    </conversationContext.Provider>
  );
}

export const useConversation = () => {
  return useContext(conversationContext);
};

function useProvideConversation(handleShowExpertList, handleShowFeed) {
  const { user } = useAuth();
  const history = useHistory();
  const Auth = useAuth();
  const [currentConversation, setCurrentConversation] = useState(-1);
  const [conv, setConv] = useState(null);
  const [isChatbotActive, setIsChatbotActive] = useState(false);
  const [conversationName, setConversationName] = useState('');
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessage] = useState([]);
  const socketStore = useContext(SocketStoreContext);
  const socket = socketStore.socket;
  const [isQueued, setIsQueued] = useState(false);
  const [numUser, setNumUser] = useState(0);
  const [listUser, setListUser] = useState([]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(+PER_PAGE_OPTIONS[1]);
  const [partnerId, setPartnerId] = useState(-1);
  const [isSensitive, setIsSensitive] = useState(false);
  const [personalities, setPersonalities] = useState([]);
  const [skipPersonality, setSkipPersonality] = useState(0);
  const [takePersonality, setTakePersonality] = useState(+PER_PAGE_OPTIONS[0]);

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    socket.emit('online', { username: user.username, token: user.token });
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
        duration: 0,
        onClose: partnerId ? true : false,
      });
    });

    socket.on('joined', (data) => {
      if (data.status === 'new') {
        handleFoundNotification();
        setCurrentConversation(-1);
        setMessage([]);
        handleShowExpertList(false);
        handleShowFeed(false);
        getAll();
      }
      setConversationName(data.conversationName);
      setPartnerId(data.partnerId);
    });

    socket.on('online', (data) => {
      setNumUser(data.numUser);
    });
  }, [socket]);

  useEffect(() => {
    socket.on(conversationName, (m) => {
      if (m === 'end') {
        setIsQueued(false);
        notification['info']({
          message: 'Kết thúc cuộc trò chuyện',
          description: 'Cuộc trò chuyện đã được kết thúc',
          icon: <FrownOutlined style={{ color: '#108ee9' }} />,
        });
        setIsChatbotActive(false);
        setMessage([]);
        setPartnerId(-1);
        setCurrentConversation(-1);
        setConversationName('');
        setConv(null);
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

  useEffect(() => {
    if (isDisconnected) {
      socket.emit('logout', user.token);
      logout();
    }
  }, [isDisconnected]);

  const handleRemovePersonality = async (values) => {
    await Personality.remove(values.id);
    getPersonality();
  };

  const getPersonality = useCallback(async () => {
    const result = await Personality.get({
      skipPersonality,
      takePersonality,
    });
    setPersonalities(result.data.reverse());
  }, [skipPersonality, takePersonality]);

  useEffect(() => {
    getPersonality();
  }, []);

  const logout = async () => {
    const result = await Auth.logout();
    if (result.success === true) {
      history.push('/dang-nhap');
    }
  };

  const handleFindPartner = () => {
    setIsChatbotActive(false);
    setMessage([]);
    socket.emit('find', {
      token: user.token,
    });
    setCurrentConversation(-1);
    setConv(null);
    getAll();
  };

  const handleChatExpert = (expertId, username) => {
    setIsChatbotActive(false);
    setMessage([]);
    socket.emit('chat-expert', {
      token: user.token,
      userId: user.id,
      expertId: expertId,
      username: username,
    });
    setCurrentConversation(-1);
    setConv(null);
    getAll();
  };

  const handleChatbot = () => {
    handleShowExpertList(false);
    handleShowFeed(false);
    setMessage([]);
    setIsChatbotActive(true);
    setCurrentConversation(-1);
    setPartnerId(-1);
    setConversationName('');
    setConv(null);
    notification.open({
      message: 'Chatbot',
      description: 'Bạn có thể chat với bot ngay bây giờ!',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const handleEndConversation = (conv) => {
    setIsChatbotActive(false);
    setMessage([]);
    setPartnerId(-1);
    setCurrentConversation(-1);
    setConversationName('');
    setConv(null);
    getAll();
    socket.emit('end', {
      token: user.token,
      conversationName: conv.name,
      selectedConversation: conv.id,
      partnerId: conv.conversationUser.id,
    });
  };

  const handleSendMessage = (message, chatbot) => {
    if (isChatbotActive) {
      setMessage((prev) => [
        ...prev,
        { message: message, isOwn: true, updatedAt: new Date().toISOString() },
      ]);
      console.log(message, chatbot);
      Chatbot.get_response({ text: message, type: chatbot }).then((res) => {
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

  const handleFoundNotification = () => {
    setIsChatbotActive(false);
    notification.destroy();
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
    setConv(values);
    setTake(+PER_PAGE_OPTIONS[1]);
    setPartnerId(values.conversationUser.id);
    setConversationName(values.name);
    getMessage(values.id);
    notification.open({
      message: 'Chat ngay nhé',
      // description: `Tiếp tục chat với ${values.conversationUser.username}. Chúc bạn có một cuộc nói chuyện vui vẻ <3`,
      description: `Cuộc trò chuyện của bạn vẫn còn, hãy tiếp tục tâm sự nhé.  Chúc bạn có một cuộc nói chuyện vui vẻ <3`,
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  useEffect(async () => {
    if (currentConversation !== -1) {
      getMessage(currentConversation, skip, take);
    }
  }, [skip, take]);

  const handleDisconnected = () => {
    setIsDisconnected(true);
  };

  const getAll = async () => {
    const { data, count } = await conversationService.get();
    setConversations(data);
  };

  const getMessage = async (
    conversation,
    skip = 0,
    take = +PER_PAGE_OPTIONS[1]
  ) => {
    handleShowExpertList(false);
    handleShowFeed(false);

    const { data, count } = await messageService.getConversation(conversation, {
      skip,
      take,
    });

    const storedMessage = data.map((m) => ({
      message: m.message,
      isOwn: m.senderInfo.id === user.id,
      updatedAt: m.updatedAt,
    }));
    setMessage(storedMessage.reverse());
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
    handleChatbot,
    handleFindPartner,
    handleSelectConversation,
    handleEndConversation,
    handleSendMessage,
    conversations,
    messages,
    send,
    clear,
    isSensitive,
    setIsSensitive,
    setTake,
    handleDisconnected,
    isChatbotActive,
    numUser,
    conv,
    onlineUsers: listUser,
    personalities,
    handleRemovePersonality,
    handleChatExpert,
    getPersonality,
  };
}
