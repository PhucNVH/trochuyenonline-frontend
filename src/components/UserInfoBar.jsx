import React from 'react';
import { Layout, Badge, Avatar, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import SearchBar from './SearchBar';
const { Header } = Layout;
const { Title } = Typography;

export default function UserInfoBar(props) {
  const { isVisible } = props;
  return isVisible ? (
    <div {...props}>
      <Header className="px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <Badge count={1} className="leading-8" dot color="green">
            <Avatar className="h-8 w-8" src={'/default_profile.jpg'} />
          </Badge>
          <div className="ml-1 flex items-center justify-end w-1/2">
            <SearchBar className="w-3/4" />
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
    </div>
  ) : (
    <></>
  );
}
