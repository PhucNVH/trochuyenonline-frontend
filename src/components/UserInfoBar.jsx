import React, { useState } from 'react';
import { Layout, Badge, Avatar, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import SearchBar from './SearchBar';
import CloseConversation from './modals/CloseConversation';

const { Header } = Layout;
const { Title } = Typography;

export default function UserInfoBar(props) {
  const {
    isVisible,
    isOnline,
    username,
    handleEndConversation,
    avatarUrl,
    conv,
  } = props;
  const [isVisibleClose, setIsVisibleClose] = useState(false);

  const handleOkClose = () => {
    handleEndConversation(conv);
    setIsVisibleClose(false);
  };
  const handleCancelClose = () => {
    setIsVisibleClose(false);
  };

  return isVisible ? (
    <div {...props}>
      <Header className="px-2 sm:px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex justify-start">
            <Badge
              count={1}
              className="leading-8"
              dot
              color={isOnline ? 'green' : 'red'}
            >
              <Avatar className="h-8 w-8" src={avatarUrl} />
            </Badge>
            <Title className="mb-0 mx-2 text-white" level={3}>
              {username}
            </Title>
          </div>
          <div className="ml-1 flex items-center justify-end w-1/2">
            {/* <SearchBar /> */}
            <CloseCircleOutlined
              title="Xóa cuộc trò chuyện"
              onClick={() => {
                setIsVisibleClose(true);
              }}
              size={32}
              className="w-8 h-8 text-xl ml-1 text-red-500"
            />
          </div>
        </div>
      </Header>
      <CloseConversation
        isModalVisible={isVisibleClose}
        handleOk={handleOkClose}
        handleCancel={handleCancelClose}
      />
    </div>
  ) : (
    <></>
  );
}
