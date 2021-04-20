import React from 'react';
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

const { Sider, Content } = Layout;

const Chat = () => {
  const { user } = useAuth();

  // const socket = io.connect('https://socket.trochuyenonline.com');
  const socket = io.connect('http://localhost:3131');

  const [conversationName, setConversationName] = React.useState(null);
  const [partnerId, setPartnerId] = React.useState(-1);
  const [message, setMessage] = React.useState([]);
  const [alert, setAlert] = React.useState(null);
  const [isQueued, setIsQueued] = React.useState(false);

  const [skip, setSkip] = React.useState(0);
  const [take, setTake] = React.useState(+PER_PAGE_OPTIONS[1]);
  const [isCollapsed, setIsCollapsed] = React.useState(
    window.screen.width < 768 ? true : false
  );
  const [conversations, setConversation] = React.useState([]);
  const [selectedConversation, setSelectedConversation] = React.useState(-1);

  const messageStore = React.useContext(MessageStoreContext);
  const conversationStore = React.useContext(ConversationStoreContext);

  socket.on('finding', () => {
    setAlert(
      <Spin spinning={true}>
        <Alert
          className="absolute"
          message="Đang tìm người trò chuyện"
          description="Nhanh thôi, bạn chờ tí nhé"
          type="info"
          showIcon
        />
      </Spin>
    );
  });

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

    // setIsQueued(false);
  };

  const handleEndConversation = () => {
    socket.emit('end', {
      token: user.token,
      conversationName,
      partnerId,
    });
  };

  const handleSendMessage = (message) => {
    socket.emit('message', {
      token: user.token,
      conversationName,
      partnerId,
      message,
    });
  };

  const handleFoundNotification = () => {
    notification.open({
      message: 'Đã tìm thấy',
      description:
        'Đã tìm được người tâm sự với bạn rồi đây. Chúc bạn có một cuộc nói chuyện vui vẻ <3',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  // const handleNewConversation = (avatarUrl) => {
  //   setConversation((data) => [...data, { conversationUser: { avatarUrl } }]);
  // };

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

  React.useEffect(() => {
    socket.on(conversationName, (m) => {
      if (m === 'end') {
        setIsQueued(false);
        setMessage([]);
        return;
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
          className="absolute"
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
    getConversations();
  }, []);

  React.useEffect(() => {
    setConversation(conversationStore.conversations);
  }, [conversationStore.conversations]);

  return (
    <Row>
      <Col xs={3} md={1} style={{ backgroundColor: '#18282E' }}>
        <SideBar
          handleFindPartner={handleFindPartner}
          handleEndConversation={handleEndConversation}
          handleGetConversation={handleGetConversation}
          conversations={conversations}
          triggerSider={setIsCollapsed}
        />
      </Col>
      <Col xs={21} md={23}>
        <Layout className="App">
          <Layout>
            <Content>
              <ChatArea
                handleSendMessage={handleSendMessage}
                messages={message}
                alert={alert}
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
            <Profile />
          </Sider>
        </Layout>
      </Col>
    </Row>
  );
};

export default observer(Chat);
