import { CloseCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import React, { useState } from 'react';
import { useConversation } from '../hooks/use-conversation.js';
import CloseConversation from './modals/CloseConversation';

export default function UserCard({ conv, isOnline }) {
  const {
    handleEndConversation,
    handleSelectConversation,
    currentConversation,
  } = useConversation();
  const [isVisibleClose, setIsVisibleClose] = useState(false);
  const handleOkClose = () => {
    handleEndConversation(conv);
    setIsVisibleClose(false);
  };
  const handleCancelClose = () => {
    setIsVisibleClose(false);
  };

  return (
    <div
      className={`user-item flex justify-center sm:justify-between items-center cursor-pointer p-1.5 mb-2 ${
        currentConversation === conv.id ? 'tab-active' : ''
      }`}
      onClick={() => handleSelectConversation(conv)}
    >
      <div className="mr-0 sm:mr-1 w-full sm:w-1/4 text-center">
        <Badge
          dot={true}
          color={isOnline ? 'green' : 'red'}
          className="mt-1"
          size="small"
        >
          <Avatar
            src={
              conv.conversationUser.avatarUrl ||
              `https://avatars.dicebear.com/api/avataaars/${conv.conversationUser.username}.svg`
            }
            // className="border border-solid"
          />
        </Badge>
      </div>
      <div className="hidden sm:flex w-3/4 justify-around items-center">
        <p className="mb-0 text-sm text-white truncate">{'một ai đó'}</p>
        <div className="ml-1">
          <CloseCircleOutlined
            title="Kết thúc cuộc trò chuyện"
            onClick={() => {
              setIsVisibleClose(true);
            }}
            className="w-4 h-4 ml-1 text-red-500"
          />
        </div>
      </div>

      <CloseConversation
        isModalVisible={isVisibleClose}
        handleOk={handleOkClose}
        handleCancel={handleCancelClose}
      />
    </div>
  );
}
