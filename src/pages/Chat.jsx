import React from 'react';
import ChatArea from '../components/ChatArea';
import SideBar from '../components/SideBar';
import { Layout, Row, Col } from 'antd';
import { useAuth } from '../hooks/use-auth';
import { io } from 'socket.io-client';
import Profile from '../components/Profile';
import { Alert, notification, Spin } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { MessageStoreContext } from '../stores/message.store';
import { PER_PAGE_OPTIONS } from '../dto/commons/PaginationRequest.dto';
import { observer } from 'mobx-react';

const { Sider, Content } = Layout;

const Chat = () => {
  const { user } = useAuth();

  const socket = io.connect('https://socket.trochuyenonline.com');

  const [conversationName, setConversationName] = React.useState(null);
  const [partnerId, setPartnerId] = React.useState(-1);
  const [message, setMessage] = React.useState([]);
  const [alert, setAlert] = React.useState(null);
  const [isQueued, setIsQueued] = React.useState(false);
  const [isStored, setIsStored] = React.useState(false);

  const [skip, setSkip] = React.useState(0);
  const [take, setTake] = React.useState(+PER_PAGE_OPTIONS[1]);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const messageStore = React.useContext(MessageStoreContext);

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

  socket.on('stored', (data) => {
    // setAlert(
    //   <Alert
    // className="absolute"
    //     message="Cuộc trò chuyện vẫn còn, đang load lại nè"
    //     description="Chưa hiện thực tính năng load lại nên bạn có thể kết thúc cuộc trò chuyện này bằng nút sấm sét bên trái"
    //     type="info"
    //     showIcon
    //   />
    // );
    setIsStored(true);
  });

  socket.on('joined', (data) => {
    if (data.status === 'new') {
      handleFoundNotification();
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

  const handleStoredNotification = () => {
    notification.open({
      message: 'Cuộc trò chuyện vẫn còn đấy',
      description: 'Hãy tiếp tục cuộc trò chuyện nhé <3',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const getStoredMessages = React.useCallback(() => {
    messageStore.get({
      skip,
      take,
    });
  }, [skip, take]);

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
    if (isStored) {
      getStoredMessages();
      setAlert(null);
    }
  }, [isStored, getStoredMessages]);

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

  return (
    <Row>
      <Col xs={3} md={1} style={{ backgroundColor: '#18282E' }}>
        <SideBar
          handleFindPartner={handleFindPartner}
          handleEndConversation={handleEndConversation}
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
            <Profile></Profile>
          </Sider>
        </Layout>
      </Col>
    </Row>
  );
};

export default observer(Chat);
