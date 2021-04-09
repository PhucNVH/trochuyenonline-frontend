import React, { useState, useEffect } from "react";
import ChatArea from "../components/ChatArea";
import SideBar from "../components/SideBar";
import { Layout, Row, Col } from "antd";
import { useAuth } from "../hooks/use-auth";
import { io } from "socket.io-client";
import Profile from "../components/Profile";

const { Sider, Content } = Layout;

export function Chat() {
  const { user } = useAuth();
  const socket = io("http://localhost:3030");
  socket.on(user.id.toString(), (event) => {
    console.log(event);
  });
  const [message, setMessage] = useState([]);

  useEffect(() => {
    console.log(user);
    socket.emit("chat", {
      token: user.token,
    });
    socket.emit("find", {
      token: user.token,
    });
  }, []);

  const onMessageSend = (text) => {
    const obj = {
      type: "message",
      text: text,
      user: user.username,
      channel: "websocket",
    };
    socket.emit("message", {});
    setMessage((prev) => prev.concat({ message: text, isOwn: true }));
  };

  // const { sendMessage, sendJsonMessage } = useWebSocket(socketUrl, {
  //   onOpen: () => {
  //     sendJsonMessage({
  //       type: "load_message",
  //       text: "hello",
  //       channel: "websocket",
  //       user: user.username,
  //     });
  //   },
  //   onMessage: (event) => {
  //     const data = JSON.parse(event.data);
  //     if (data.type === "load_message") {
  //       // console.log(data.messages);
  //       // setMessage(
  //       //   data.messages.map((e) => ({
  //       //     message: e.text,
  //       //     isOwn: e.sender !== "bot" ? true : false,
  //       //   }))
  //       // );
  //     } else {
  //       setMessage((prev) =>
  //         prev.concat({
  //           message: data.text,
  //           isOwn: data.sender === "user" ? true : false,
  //         })
  //       );
  //     }
  //   },
  //   shouldReconnect: (closeEvent) => true,
  // });

  return (
    <Row>
      <Col span={1} style={{ backgroundColor: "#00f4a6" }}>
        <SideBar></SideBar>
      </Col>
      <Col span={23}>
        <Layout className="App">
          <Layout>
            <Content>
              <ChatArea onMessageSend={onMessageSend} messages={message} />
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
