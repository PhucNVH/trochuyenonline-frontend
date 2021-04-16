import React from 'react';
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
import { Alert } from 'antd';
import UseAnimations from 'react-useanimations';
const Maximized = (props) => {
  const { handleSendMessage, messages, alert } = props;

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
          {alert}
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
        <TextComposer onSend={handleSendMessage}>
          <Row align="center">
            <Fill>
              <TextInput />
            </Fill>
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
        ></div>
      </div>
    </ThemeProvider>
  );
};

export default Maximized;
