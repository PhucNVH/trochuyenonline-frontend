import React, { useContext, useState, useEffect, useCallback } from 'react';
import ChatArea from '../components/ChatArea';
import SideBar, { MemoizedSideBar } from '../components/SideBar';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Layout from 'antd/lib/layout';
import { useAuth } from '../hooks/use-auth';
import Profile from '../components/Profile';
import Alert from 'antd/lib/alert';
import { MessageStoreContext } from '../stores/message.store';
import { PER_PAGE_OPTIONS } from '../dto/commons/PaginationRequest.dto';
import { observer } from 'mobx-react';
import { ConversationStoreContext } from '../stores/conversation.store';
import { PersonalityStoreContext } from '../stores/personality.store';
import { useHistory, useLocation } from 'react-router-dom';
import { Chatbot } from '../apis/chatbot';
import { SocketStoreContext } from '../stores/socket.store';
import { toast } from 'react-toastify';
import {
  useConversation,
  ProvideConversation,
} from '../hooks/use-conversation';

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
  const [isFetching, setIsFetching] = useState(false);
  console.log('rerender');

  React.useEffect(() => {
    Chatbot.init();
  }, []);

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

  const handleChatBot = () => {
    setMessage([]);
    setIsChatbotActive(true);
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
    conversationStore.get();
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

  return (
    <ProvideConversation>
      <Row className="flex flex-nowrap">
        <SideBar
          handleChatBot={handleChatBot}
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
                <ChatArea
                  handleSendMessage={handleSendMessage}
                  messages={message}
                  alert={alert}
                  setTake={setTake}
                  isSensitive={isSensitive}
                  handleSensitive={handleSensitive}
                  isFetching={isFetching}
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
    </ProvideConversation>
  );
};

export default observer(Chat);
