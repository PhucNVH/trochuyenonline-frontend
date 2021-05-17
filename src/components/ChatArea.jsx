import React, { useEffect, useState, useRef } from 'react';
import theme from './theme';
import { Input } from 'antd';
import {
  MessageList,
  Message,
  MessageGroup,
  MessageText,
  TextComposer,
  Row,
  Fill,
  ThemeProvider,
  Bubble,
} from '@livechat/ui-kit';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  SendOutlined,
} from '@ant-design/icons';
import UserInfoBar from './UserInfoBar';
import EmojiPicker from './EmojiPicker';

import { useConversation } from '../hooks/use-conversation.js';

const Maximized = ({ avatarUrl, alert }) => {
  const {
    handleSendMessage,
    isSensitive,
    setIsSensitive,
    messages,
    setTake,
  } = useConversation();
  const [inputValue, setInputValue] = useState('');
  const textInputRef = useRef(null);
  useEffect(() => {
    document.getElementById('chat-area').onscroll = (e) => {
      e.preventDefault();
      if (document.getElementById('chat-area').scrollTop == 0) {
        setTake((prev) => prev + 10);
      }
    };
  }, []);
  const handleSelectEmoji = (e) => {
    setInputValue((prev) => prev + e.emoji);
  };
  const onSend = () => {
    handleSendMessage(inputValue);
    setInputValue('');
  };
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
        className="relative"
      >
        <div className="relative w-full">{alert}</div>
        <UserInfoBar className="absolute h-12 w-full" isVisible={false} />
        <div
          className=""
          style={{
            flexGrow: 1,
            minHeight: 0,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <MessageList active containScrollInSubtree id="chat-area">
            {/* {isFetching ? <Spin size="large" /> : <></>} */}
            {formatMessage(messages).map((v, idx) => {
              return (
                <MessageGroup
                  avatar={
                    v[0].isOwn
                      ? ''
                      : avatarUrl
                      ? avatarUrl
                      : '/default_profile.jpg'
                  }
                  className={v[0].isOwn ? 'flex-row-reverse' : 'flex-row'}
                  onlyFirstWithMeta
                  isOwn={true}
                  key={idx.toString()}
                >
                  {v.map((e, i) => {
                    return (
                      <Message
                        className="text-sm"
                        isOwn={e.isOwn}
                        key={i.toString()}
                        date={new Date(v[0].updatedAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      >
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
                    );
                  })}
                </MessageGroup>
              );
            })}
          </MessageList>
        </div>
        <TextComposer>
          <Row align="center">
            <Fill>
              <Input.Group className="flex" compact>
                <div>
                  <div
                    className="mx-1"
                    style={{ fontSize: '18px', color: '#08c' }}
                    onClick={() => setIsSensitive(!isSensitive)}
                  >
                    {isSensitive ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  </div>
                </div>
                <Input
                  className="w-full rounded-lg"
                  ref={textInputRef}
                  value={inputValue}
                  onChange={(v) => setInputValue(v.target.value)}
                  onPressEnter={onSend}
                ></Input>
                <div className="flex w-auto mx-1">
                  <EmojiPicker className="mx-1" onSelect={handleSelectEmoji} />
                  <SendOutlined
                    className="text-xl mx-1 hover:text-blue-500"
                    onClick={onSend}
                  />
                </div>
              </Input.Group>
            </Fill>
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

const formatMessage = (messages) => {
  return messages.reduce((acc, value) => {
    if (acc.length && acc[acc.length - 1][0].isOwn == value.isOwn) {
      acc[acc.length - 1].push(value);
    } else {
      acc.push([value]);
    }
    return acc;
  }, []);
};
export default Maximized;
