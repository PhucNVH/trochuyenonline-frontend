import React, { useState, useContext, createContext, useEffect } from 'react';
import { useConversation } from './use-conversation';

const chatbotContext = createContext();

export function ProvideChatbot({ children }) {
  const chatbot = useProvideChatbot();
  return (
    <chatbotContext.Provider value={chatbot}>
      {children}
    </chatbotContext.Provider>
  );
}

export const useChatbot = () => {
  return useContext(chatbotContext);
};

function useProvideChatbot() {
  const { setMessage } = useConversation();
  const [chatbotUrl, setChatbotUrl] = useState('chatbot1');
  const onChatbotSelected = (value) => {
    setMessage([]);
    setChatbotUrl(value);
  };

  return {
    chatbotUrl,
    onChatbotSelected,
  };
}
