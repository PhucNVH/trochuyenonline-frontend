import React from "react";
import theme from "./theme";
import {
  TextInput,
  MessageList,
  Message,
  MessageText,
  TextComposer,
  Row,
  Fill,
  Fit,
  SendButton,
  ThemeProvider,
  Bubble,
} from "@livechat/ui-kit";

const Maximized = ({ onMessageSend, messages }) => {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            minHeight: 0,
            height: "100%",
          }}
        >
          <MessageList active containScrollInSubtree>
            {messages.map((e, i) => (
              <Message isOwn={e.isOwn} key={i.toString()}>
                {!e.isOwn && (
                  <Bubble isOwn={e.isOwn} className="chat-bubble">
                    <MessageText>{e.message}</MessageText>
                  </Bubble>
                )}
                {e.isOwn && (
                  <Bubble isOwn={e.isOwn} className="chat-bubble">
                    <MessageText>{e.message}</MessageText>
                  </Bubble>
                )}
              </Message>
            ))}
          </MessageList>
        </div>
        <TextComposer onSend={onMessageSend}>
          <Row align="center">
            <Fill>
              <TextInput />
            </Fill>
            <Fit>
              <SendButton style={{ color: "#00f4a6 !important" }} />
            </Fit>
          </Row>
        </TextComposer>
        <div
          style={{
            textAlign: "center",
            fontSize: ".6em",
            padding: ".4em",
            background: "#fff",
            color: "#888",
          }}
        ></div>
      </div>
    </ThemeProvider>
  );
};

export default Maximized;
