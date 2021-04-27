import React, { useContext, useState } from 'react';
import ChatArea from '../components/ChatArea';
import SideBar from '../components/SideBar';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Layout from 'antd/lib/layout';
import { useAuth } from '../hooks/use-auth';
import { io } from 'socket.io-client';
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
import {
  AlertOutlined,
  FrownOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { Sider, Content } = Layout;

const Chat = () => {
  const { user } = useAuth();
  const Auth = useAuth();

  // const socket = io.connect('https://socket.trochuyenonline.com');
  const socket = io.connect(process.env.REACT_APP_SOCKET_URI);

  const [conversationName, setConversationName] = useState(null);
  const [partnerId, setPartnerId] = useState(-1);
  const [message, setMessage] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isQueued, setIsQueued] = useState(false);

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

  const history = useHistory();

  socket.on('finding', () => {
    setAlert(
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
        <Alert
          message="Đang tìm người trò chuyện"
          description="Nhanh thôi, bạn chờ tí nhé"
          type="info"
          showIcon
        />
      </Spin>
    );
  });

  const logout = async () => {
    const result = await Auth.logout();
    if (result.status === 'success') {
      history.push('/login');
    }
  };

  React.useEffect(() => {
    if (isDisconnected) {
      socket.emit('logout', user.token);
      logout();
    }
  }, [isDisconnected]);

  socket.on('joined', (data) => {
    if (data.status === 'new') {
      handleFoundNotification();
      // handleNewConversation(data.avatarUrl);
    } else if (data.status === 'stored') {
      handleStoredNotification();
    }
    setConversationName(data.conversationName);
    setPartnerId(data.partnerId);
    setAlert(null);
  });

  const handleFindPartner = () => {
    socket.emit('find', {
      token: user.token,
    });
    setMessage([]);
    getConversations();
  };

  const handleEndConversation = () => {
    socket.emit('end', {
      token: user.token,
      conversationName,
      selectedConversation,
      partnerId,
    });
  };

  const handleSendMessage = (message) => {
    socket.emit('message', {
      token: user.token,
      conversationName,
      partnerId,
      message,
      isSensitive,
    });

    setIsSensitive(false);
  };

  const handleSensitive = (value) => {
    setIsSensitive(value);
  };

  const handleFoundNotification = () => {
    notification.open({
      message: 'Đã tìm thấy',
      description:
        'Đã tìm được người tâm sự với bạn rồi đây. Chúc bạn có một cuộc nói chuyện vui vẻ <3',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const handleStoredNotification = () => {
    notification.open({
      message: 'Cuộc trò chuyện vẫn còn đấy',
      description: 'Hãy tiếp tục cuộc trò chuyện nhé <3',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const handleGetConversation = (values) => {
    setSelectedConversation(values.id);
    setConversationName(values.name);
    handleStoredNotification();
    setAlert(null);
    getConversations();
  };

  const handleRemovePersonality = async (values) => {
    await personalityStore.remove(values.id);
    getPersonality();
  };

  React.useEffect(() => {
    if (selectedConversation !== -1) {
      messageStore.getConversation(selectedConversation, {
        skip,
        take,
      });
    }
  }, [selectedConversation, skip, take]);

  const getConversations = React.useCallback(() => {
    conversationStore.get();
  }, []);

  const getPersonality = React.useCallback(() => {
    personalityStore.get({
      skipPersonality,
      takePersonality,
    });
  }, [skipPersonality, takePersonality]);

  const handleDisconnected = () => {
    setIsDisconnected(true);
  };

  React.useEffect(() => {
    getPersonality();
  }, []);

  React.useEffect(() => {
    socket.on(conversationName, (m) => {
      if (m === 'end') {
        getConversations();
        setIsQueued(false);
        setMessage([]);
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
        history.push('/login');
      }

      setMessage((prev) => [
        ...prev,
        { message: m.message, isOwn: m.partnerId !== user.id },
      ]);
    });
  }, [conversationName]);

  React.useEffect(() => {
    if (!isQueued) {
      socket.emit('chat', {
        token: user.token,
      });

      setAlert(
        <Alert
          message="Tìm người tâm sự ngay nhé!"
          description="Bạn đang chưa có ai tâm sự cùng. Hãy chờ người khác tìm thấy bạn, hoặc chủ động tìm bằng cách nhấn nút la bàn ở thanh bên trái nha"
          type="info"
          showIcon
          closeText="Tôi hiểu rồi"
        />
      );

      setIsQueued(true);
    }
  }, [isQueued]);

  React.useEffect(() => {
    const storedMessage = messageStore.messages.map((m) => ({
      message: m.message,
      isOwn: m.senderInfo.id === user.id,
    }));
    setMessage(storedMessage.reverse());
    if (messageStore.messages[0]) {
      const oneMessage = messageStore.messages[0];
      setConversationName(oneMessage.conversationName);
      setPartnerId(
        oneMessage.senderInfo.id === user.id
          ? oneMessage.partnerInfo.id
          : oneMessage.senderInfo.id
      );
    }
  }, [messageStore.messages]);

  React.useEffect(() => {
    setPersonalities(personalityStore.personalities);
  }, [personalityStore.personalities]);

  React.useEffect(() => {
    getConversations();
  }, []);

  React.useEffect(() => {
    setConversation(conversationStore.conversations);
  }, [conversationStore.conversations]);

  return (
    <Row className="flex flex-nowrap">
      <SideBar
        handleFindPartner={handleFindPartner}
        handleEndConversation={handleEndConversation}
        handleGetConversation={handleGetConversation}
        conversations={conversations}
        triggerSider={setIsCollapsed}
        handleDisconnected={handleDisconnected}
      />
      <Col className="w-full">
        <Layout className="App">
          <Layout>
            <Content>
              <ChatArea
                handleSendMessage={handleSendMessage}
                messages={message}
                alert={alert}
                isSensitive={isSensitive}
                handleSensitive={handleSensitive}
              />
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
