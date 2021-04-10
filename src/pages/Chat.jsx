import React, { useState, useEffect } from "react";
import ChatArea from "../components/ChatArea";
import SideBar from "../components/SideBar";
import { Layout, Row, Col } from "antd";
import { useAuth } from "../hooks/use-auth";
import { io } from "socket.io-client";
import Profile from "../components/Profile";
import {Alert, notification, Spin} from 'antd';
import { SmileOutlined } from '@ant-design/icons';


const { Sider, Content } = Layout;

export function Chat() {
  const { user } = useAuth();
  const socket = io.connect("http://localhost:3131");
  const [conversationName, setConversationName] = React.useState(null)
  const [partnerId, setPartnerId] = React.useState(-1)
  const [message, setMessage] = useState([]);
  const [alert, setAlert] = React.useState(null);
  const [isQueued, setIsQueued] = React.useState(false);

  socket.on("finding", () => {
    setAlert(
      <Spin spinning={true}>
        <Alert
          message="Đang tìm người trò chuyện"
          description="Nhanh thôi, bạn chờ tí nhé"
          type="info"
          showIcon
        />
      </Spin>
    )
  });

  socket.on("stored", (data) => {
    setAlert(
      <Alert
          message="Cuộc trò chuyện vẫn còn, đang load lại nè"
          description="Chưa hiện thực tính năng load lại nên bạn có thể kết thúc cuộc trò chuyện này bằng nút sấm sét bên trái"
          type="info"
          showIcon
        />
    );
  });

  socket.on("joined", (data) => {
    handleFoundNotification();
    setConversationName(data.conversationName);
    setPartnerId(data.partnerId);
    setAlert(null);
  });

  const handleFindPartner = () => {
    socket.emit("find", {
      token: user.token,
    });
  }

  const handleEndConversation = () => {
    socket.emit("end", {
      token: user.token,
      conversationName,
      partnerId
    });
  }

  const handleSendMessage = (message) => {
    socket.emit('message', {
      token: user.token,
      conversationName,
      partnerId,
      message
    })
  }

  const handleFoundNotification = () => {
    notification.open({
      message: 'Đã tìm thấy',
      description:
        'Đã tìm được người tâm sự với bạn rồi đây. Chúc bạn có một cuộc nói chuyện vui vẻ <3',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  }


  useEffect(() => {
    socket.on(conversationName, (m) => {
      if (m === 'end') {
          setIsQueued(false);
          setMessage(null)
          return;
      }

      setMessage((prev) =>
        ([...prev, { message: m.message, isOwn: m.partnerId !== user.id ? true : false }])
      )
    })
  }, [conversationName])

  useEffect(() => {
    if (!isQueued) {
      socket.emit("chat", {
        token: user.token,
      });
  
      setAlert(
        <Alert
          message="Tìm người tâm sự ngay nhé!"
          description="Bạn đang chưa có ai tâm sự cùng. Hãy chờ người khác tìm thấy bạn, hoặc chủ động tìm bằng cách nhấn nút chuông xanh ở thanh bên trái nha"
          type="info"
          showIcon
          closeText="Tôi hiểu rồi"
        />
      )

      setIsQueued(true)
    }
  }, [isQueued]);

  return (
    <Row>
      <Col span={1} style={{ backgroundColor: "#00f4a6" }}>
        <SideBar handleFindPartner={handleFindPartner} handleEndConversation={handleEndConversation}></SideBar>
      </Col>
      <Col span={23}>
        <Layout className="App">
          <Layout>
            <Content>
              <ChatArea handleSendMessage={handleSendMessage} messages={message} alert={alert}/>
            </Content>
          </Layout>
          <Sider
            width="20rem"
            style={{ backgroundColor: "#1e3239" }}
            trigger={null}
            breakpoint="lg"
            collapsedWidth="0"
          >
            <Profile></Profile>
          </Sider>
        </Layout>
      </Col>
    </Row>
  );
}
