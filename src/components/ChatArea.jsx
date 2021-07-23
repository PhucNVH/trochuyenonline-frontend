import React, { useEffect, useState } from 'react';
import theme from './theme';
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
import { useChatbot } from '../hooks/use-chatbot';
import UserInfoBar from './UserInfoBar';
import ChatInput from './ChatInput';
import { Chatbot } from '../apis/chatbot';
import { useConversation } from '../hooks/use-conversation.js';

const Maximized = ({ alert }) => {
  const {
    handleSendMessage,
    isSensitive,
    setIsSensitive,
    messages,
    setTake,
    onlineUsers,
    handleEndConversation,
    isChatbotActive,
    personalities,
    conv,
    currentConversation,
    setMessage,
  } = useConversation();
  const avatarUrl =
    conv?.conversationUser.avatarUrl !== ''
      ? conv?.conversationUser.avatarUrl
      : `https://avatars.dicebear.com/api/micah/${conv.conversationUser.username}.svg`;
  const { chatbotUrl } = useChatbot();

  useEffect(() => {
    document.getElementById('chat-area').onscroll = (e) => {
      e.preventDefault();
      if (document.getElementById('chat-area').scrollTop == 0) {
        setTake((prev) => prev + 10);
      }
    };
  }, []);
  useEffect(async () => {
    if (isChatbotActive) {
      await Chatbot.init(personalities.map((e) => e.mention));
    }
  }, [isChatbotActive]);
  const resetChat = async () => {
    setMessage([]);
    if (chatbotUrl === 'chatbot2') {
      await Chatbot.reset();
    }
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
        <UserInfoBar
          className="absolute h-12 w-full"
          isChatbotActive={isChatbotActive}
          isVisible={conv !== null || isChatbotActive}
          isOnline={onlineUsers.includes(conv?.conversationUser.username)}
          username={conv?.conversationUser.username}
          handleEndConversation={handleEndConversation}
          conv={conv}
          avatarUrl={avatarUrl}
          currentChatbot={chatbotUrl}
          resetChat={resetChat}
        />
        <div
          className={`${conv !== null || isChatbotActive ? 'mt-12' : ''}`}
          style={{
            flexGrow: 1,
            minHeight: 0,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <MessageList active containScrollInSubtree id="chat-area">
            <MessageGroup
              avatar={
                'https://image.flaticon.com/icons/png/512/2040/2040946.png'
              }
              className={'flex-row'}
              onlyFirstWithMeta
              isOwn={false}
              key="survey"
            >
              <Message className="text-sm" isOwn={false} key={'survey'}>
                <Bubble isOwn={false} className="chat-bubble">
                  <div className="px-4 py-1">
                    <p>
                      Các bạn dành thời gian điền vào khảo sát dưới đây để bọn
                      mình hoàn thiện chatbot nhé.
                    </p>
                    <a
                      href="https://forms.gle/RuonupxMYqunumpo9"
                      target="_blank"
                    >
                      https://forms.gle/RuonupxMYqunumpo9
                    </a>
                  </div>
                </Bubble>
              </Message>
            </MessageGroup>
            {formatMessage(messages).map((v, idx) => {
              return (
                <MessageGroup
                  avatar={
                    v[0].isOwn
                      ? ''
                      : avatarUrl
                      ? avatarUrl
                      : 'https://image.flaticon.com/icons/png/512/2040/2040946.png'
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
          {isChatbotActive || currentConversation != -1 ? (
            <Row align="center">
              <Fill>
                <ChatInput
                  handleSendMessage={(v) => {
                    handleSendMessage(v, chatbotUrl);
                  }}
                  handleSensitive={setIsSensitive}
                  isSensitive={isSensitive}
                />
              </Fill>
            </Row>
          ) : (
            <></>
          )}
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
