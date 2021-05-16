import React, { useContext, useState, useEffect, useCallback } from 'react';
import ChatArea from '../components/ChatArea';
import SideBar, { MemoizedSideBar } from '../components/SideBar';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Layout from 'antd/lib/layout';
import { useAuth } from '../hooks/use-auth';
import Profile from '../components/Profile';
import Alert from 'antd/lib/alert';
import notification from 'antd/lib/notification';
import Spin from 'antd/lib/spin';
import SmileOutlined from '@ant-design/icons/SmileOutlined';
import { MessageStoreContext } from '../stores/message.store';
import { PER_PAGE_OPTIONS } from '../dto/commons/PaginationRequest.dto';
import { observer } from 'mobx-react';
import { ConversationStoreContext } from '../stores/conversation.store';
import { PersonalityStoreContext } from '../stores/personality.store';
import { LoadingOutlined, FrownOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { Chatbot } from '../apis/chatbot';
import { SocketStoreContext } from '../stores/socket.store';
import { toast } from 'react-toastify';

const { Sider, Content } = Layout;

const Chat = () => {
  const { user } = useAuth();
  const history = useHistory();
  const Auth = useAuth();
  const location = useLocation();
  const isFirstLogin = false || (location.state && location.state.isFirstLogin);

  const [conversationName, setConversationName] = useState(null);
  const [partnerId, setPartnerId] = useState(-1);
  const [message, setMessage] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isQueued, setIsQueued] = useState(false);
  const [isChatbotActive, setIsChatbotActive] = useState(false);

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(+PER_PAGE_OPTIONS[1]);
  const [skipPersonality, setSkipPersonality] = useState(0);
  const [takePersonality, setTakePersonality] = useState(+PER_PAGE_OPTIONS[0]);
  const [isCollapsed, setIsCollapsed] = useState(
    window.screen.width < 768 ? true : false
  );
  const [conversations, setConversation] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(-1);
  const [personalities, setPersonalities] = useState([]);
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [isSensitive, setIsSensitive] = useState(false);

  const messageStore = useContext(MessageStoreContext);
  const conversationStore = useContext(ConversationStoreContext);
  const personalityStore = useContext(PersonalityStoreContext);
  const socketStore = useContext(SocketStoreContext);
  const [socket, setSocket] = useState(socketStore.socket);
  const [numUser, setNumUser] = useState(0);
  const [listUser, setListUser] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  React.useEffect(() => {
    socket.emit('online', { username: user.username });
    socket.on('connected', (data) => {
      setNumUser(data.numUser);
      setListUser(data.onlineUsers);

      console.log({ onlineUser: data.onlineUsers, numUser: data.numUser });
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
      setAlert(
        <Alert
          className="w-full"
          message="Đang tìm người trò chuyện"
          description="Nhanh thôi, bạn chờ tí nhé. Trong lúc chờ đợi, hãy chat với chat bot của tụi mình nhé"
          type="info"
          showIcon
          icon={
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          }
          closeText="Mình hiểu rồi"
        />
      );
    });

    socket.on('joined', (data) => {
      if (data.status === 'new') {
        handleFoundNotification();
        setSelectedConversation(-1);
        setMessage([]);
        getConversations();
        // handleNewConversation(data.avatarUrl);
      }
      handleSetConversationName(data.conversationName);
      setPartnerId(data.partnerId);
      setAlert(null);
    });

    socket.on('online', (data) => {
      setNumUser(data.numUser);
    });
  }, [socket]);

  React.useEffect(() => {
    Chatbot.init();
  }, []);

  useEffect(() => {
    socket.on(conversationName, (m) => {
      if (m === 'end') {
        getConversations();
        setIsQueued(false);
        notification['info']({
          message: 'Kết thúc cuộc trò chuyện',
          description: 'Cuộc trò chuyện đã được kết thúc',
          icon: <FrownOutlined style={{ color: '#108ee9' }} />,
        });
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

  const logout = async () => {
    const result = await Auth.logout();
    if (result.success === true) {
      history.push('/dang-nhap');
    }
  };

  useEffect(() => {
    Chatbot.init();
  }, []);

  useEffect(() => {
    if (isDisconnected) {
      socket.emit('logout', user.token);
      logout();
    }
  }, [isDisconnected]);

  const handleSetConversationName = (conversationName) => {
    setConversationName(conversationName);
  };

  const handleFindPartner = () => {
    setIsChatbotActive(false);
    setMessage([]);
    socket.emit('find', {
      token: user.token,
    });
    getConversations();
    setSelectedConversation(-1);
  };

  const handleChatBot = () => {
    setMessage([]);
    setIsChatbotActive(true);
  };

  const handleEndConversation = () => {
    setIsChatbotActive(false);
    socket.emit('end', {
      token: user.token,
      conversationName,
      selectedConversation,
      partnerId,
    });

    setSelectedConversation(-1);
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

  const handleGetConversation = (values) => {
    setIsChatbotActive(false);
    setSelectedConversation(values.id);
    handleSetConversationName(values.name);
    setAlert(null);
    getConversations();
  };

  const handleRemovePersonality = async (values) => {
    await personalityStore.remove(values.id);
    getPersonality();
  };

  useEffect(() => {
    if (selectedConversation !== -1) {
      messageStore.getConversation(selectedConversation, {
        skip,
        take,
      });
    }
  }, [selectedConversation, skip, take]);

  const getConversations = useCallback(() => {
    return conversationStore.get();
  }, []);

  const getPersonality = useCallback(() => {
    personalityStore.get({
      skipPersonality,
      takePersonality,
    });
  }, [skipPersonality, takePersonality]);

  const handleDisconnected = () => {
    setIsDisconnected(true);
  };

  useEffect(() => {
    getPersonality();
  }, []);

  useEffect(() => {
    if (!isQueued) {
      setAlert(
        <Alert
          className="w-full"
          message="Tìm người tâm sự ngay nhé!"
          description="Nếu bạn đang chưa có ai tâm sự cùng, hãy tìm bằng cách nhấn nút la bàn ở thanh bên trái nha"
          type="info"
          showIcon
          onClose={() => {
            setAlert(null);
          }}
          closeText="Mình hiểu rồi"
        />
      );

      setIsQueued(true);
    }
  }, [isQueued]);

  useEffect(() => {
    if (!isChatbotActive) {
      const storedMessage = messageStore.messages.map((m) => ({
        message: m.message,
        isOwn: m.senderInfo.id === user.id,
        updatedAt: m.updatedAt,
      }));
      setMessage(storedMessage.reverse());
      if (messageStore.messages[0]) {
        const oneMessage = messageStore.messages[0];
        handleSetConversationName(oneMessage.conversationName);
        setPartnerId(
          oneMessage.senderInfo.id === user.id
            ? oneMessage.partnerInfo.id
            : oneMessage.senderInfo.id
        );
      }
    }
  }, [messageStore.messages, isChatbotActive]);

  useEffect(() => {
    setPersonalities(personalityStore.personalities);
  }, [personalityStore.personalities]);

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    setConversation(conversationStore.conversations);
  }, [conversationStore.conversations]);
  useEffect(() => {
    if (isChatbotActive) {
      toast('Chat với chatbot ngay nhé', { position: 'top-center' });
    }
  }, [isChatbotActive]);
  return (
    <Row className="flex flex-nowrap">
      <SideBar
        handleFindPartner={handleFindPartner}
        handleEndConversation={handleEndConversation}
        handleGetConversation={handleGetConversation}
        isChatbotActive={isChatbotActive}
        handleChatBot={handleChatBot}
        conversations={conversations}
        triggerSider={setIsCollapsed}
        isSiderCollapsed={isCollapsed}
        handleDisconnected={handleDisconnected}
        isFirstLogin={isFirstLogin}
        numUser={numUser}
        onlineUsers={listUser}
      />
      <Col className="w-full">
        <Layout className="App">
          <Layout>
            <Content>
              <React.Suspense fallback={<Spin />}>
                <ChatArea
                  handleSendMessage={handleSendMessage}
                  messages={message}
                  alert={alert}
                  setTake={setTake}
                  isSensitive={isSensitive}
                  handleSensitive={handleSensitive}
                  isFetching={isFetching}
                />
              </React.Suspense>
            </Content>
          </Layout>
          <Sider
            width="20rem"
            style={{ backgroundColor: '#1e3239' }}
            breakpoint="md"
            collapsedWidth="0"
            trigger={null}
            collapsible
            collapsed={isCollapsed}
          >
            <Profile
              personalities={personalities}
              handleRemovePersonality={handleRemovePersonality}
            />
          </Sider>
        </Layout>
      </Col>
    </Row>
  );
};

export default observer(Chat);
