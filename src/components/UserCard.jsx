import React, { useState } from 'react';
import { Badge, Avatar } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import CloseConversation from './modals/CloseConversation';

export default function UserCard({
  handleGetConversation,
  handleEndConversation,
  conv,
  isOnline,
}) {
  const [isVisibleClose, setIsVisibleClose] = useState(false);
  const handleOkClose = () => {
    handleEndConversation();
    setIsVisibleClose(false);
  };
  const handleCancelClose = () => {
    setIsVisibleClose(false);
  };

  return (
    <div
      className="user-item flex justify-center sm:justify-between items-center cursor-pointer p-1.5 mb-2"
      onClick={() => handleGetConversation(conv)}
    >
      <div className="mr-0 sm:mr-1 w-full sm:w-1/4 text-center">
        <Badge
          dot={true}
          color={isOnline ? 'green' : 'red'}
          className="mt-1"
          size="small"
        >
          <Avatar
            size="small"
            src={conv.conversationUser.avatarUrl || '/default_profile.jpg'}
          />
        </Badge>
      </div>
      <div className="hidden sm:flex w-3/4 justify-around items-center">
        <p className="mb-0 text-sm text-white truncate">
          {conv.conversationUser.username}
        </p>
        <div className="ml-1">
          <CloseCircleOutlined
            title="Xóa cuộc trò chuyện"
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
