import React, { useEffect } from 'react';
import theme from './theme';
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
} from '@livechat/ui-kit';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const Maximized = ({
  handleSendMessage,
  messages,
  alert,
  setTake,
  isSensitive,
  handleSensitive,
}) => {
  useEffect(() => {
    document.getElementById('chat-area').onscroll = (e) => {
      e.preventDefault();
      if (document.getElementById('chat-area').scrollTop == 0) {
        setTake((prev) => prev + 10);
      }
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div
          style={{
            flexGrow: 1,
            minHeight: 0,
            height: '100%',
          }}
        >
          <div className="relative w-full">{alert}</div>
          <MessageList active containScrollInSubtree id="chat-area">
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
        <TextComposer onSend={handleSendMessage}>
          <Row align="center">
            <Fill>
              <TextInput />
            </Fill>
            <div
              style={{ fontSize: '18px', color: '#08c' }}
              onClick={() => handleSensitive(!isSensitive)}
            >
              {isSensitive ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </div>
            <Fit>
              <SendButton style={{ color: '#DEE5FF !important' }} />
            </Fit>
          </Row>
        </TextComposer>
        <div
          style={{
            textAlign: 'center',
            fontSize: '.6em',
            padding: '.4em',
            background: '#fff',
            color: '#888',
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default Maximized;
