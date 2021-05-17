import React, { useContext, useState, useEffect, useCallback } from 'react';
import ChatArea from '../components/ChatArea';
import SideBar from '../components/SideBar';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Layout from 'antd/lib/layout';
import Profile from '../components/Profile';
import { PER_PAGE_OPTIONS } from '../dto/commons/PaginationRequest.dto';
import { observer } from 'mobx-react';
import { PersonalityStoreContext } from '../stores/personality.store';
import { useLocation } from 'react-router-dom';
import { Chatbot } from '../apis/chatbot';
import { ProvideConversation } from '../hooks/use-conversation';

const { Sider, Content } = Layout;

const Chat = () => {
  const location = useLocation();
  const isFirstLogin = false || (location.state && location.state.isFirstLogin);
  const [skipPersonality, setSkipPersonality] = useState(0);
  const [takePersonality, setTakePersonality] = useState(+PER_PAGE_OPTIONS[0]);
  const [isCollapsed, setIsCollapsed] = useState(
    window.screen.width < 768 ? true : false
  );
  const [personalities, setPersonalities] = useState([]);

  const personalityStore = useContext(PersonalityStoreContext);

  React.useEffect(() => {
    Chatbot.init();
  }, []);

  useEffect(() => {
    Chatbot.init();
  }, []);

  const handleRemovePersonality = async (values) => {
    await personalityStore.remove(values.id);
    getPersonality();
  };

  const getPersonality = useCallback(() => {
    personalityStore.get({
      skipPersonality,
      takePersonality,
    });
  }, [skipPersonality, takePersonality]);

  useEffect(() => {
    getPersonality();
  }, []);

  useEffect(() => {
    setPersonalities(personalityStore.personalities);
  }, [personalityStore.personalities]);

  return (
    <ProvideConversation>
      <Row className="flex flex-nowrap">
        <SideBar
          triggerSider={setIsCollapsed}
          isSiderCollapsed={isCollapsed}
          isFirstLogin={isFirstLogin}
        />
        <Col className="w-full">
          <Layout className="App">
            <Layout>
              <Content>
                <ChatArea />
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
