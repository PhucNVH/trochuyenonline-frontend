import Col from 'antd/lib/col';
import Layout from 'antd/lib/layout';
import Row from 'antd/lib/row';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Chatbot } from '../apis/chatbot';
import ChatArea from '../components/ChatArea';
import ExpertInfo from '../components/ExpertInfo';
import Profile from '../components/Profile';
import SideBar from '../components/SideBar';
import { useAuth } from '../hooks/use-auth';
import { ProvideConversation } from '../hooks/use-conversation';
import ExpertList from '../components/ExpertList';
import Feed from '../components/Feed';

const { Sider, Content } = Layout;

const Chat = () => {
  const auth = useAuth();

  const location = useLocation();
  const isFirstLogin = false || (location.state && location.state.isFirstLogin);
  const [isShowExpertList, setIsShowExpertList] = React.useState(false);
  const [isShowFeed, setIsShowFeed] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = useState(
    window.screen.width < 768 ? true : false
  );

  React.useEffect(() => {
    Chatbot.init();
  }, []);

  useEffect(() => {
    Chatbot.init();
  }, []);

  const handleShowExpertList = (value) => {
    setIsShowExpertList(value);
  };

  const handleShowFeed = (value) => {
    setIsShowFeed(value);
  };

  return (
    <ProvideConversation handleShowExpertList={handleShowExpertList}>
      <Row className="flex flex-nowrap">
        <SideBar
          triggerSider={setIsCollapsed}
          isSiderCollapsed={isCollapsed}
          isFirstLogin={isFirstLogin}
          handleShowExpertList={handleShowExpertList}
          handleShowFeed={handleShowFeed}
        />
        <Col className="w-full">
          <Layout className="App">
            <Layout>
              <Content>
                {isShowExpertList && <ExpertList />}
                {isShowFeed && <Feed />}
                {!isShowExpertList && !isShowFeed && <ChatArea />}
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
            {auth.user?.isBecomingExpert && <ExpertInfo />}
          </Layout>
        </Col>
      </Row>
    </ProvideConversation>
  );
};

export default observer(Chat);
