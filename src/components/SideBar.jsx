import React, { useState } from 'react';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import CompassTwoTone from '@ant-design/icons/CompassTwoTone';
import PauseCircleTwoTone from '@ant-design/icons/PauseCircleTwoTone';
import FacebookOutlined from '@ant-design/icons/FacebookOutlined';
import div from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Badge from 'antd/lib/badge';
import Avatar from 'antd/lib/avatar';
import Divider from 'antd/lib/divider';
import {
  BookTwoTone,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import Sider from 'antd/lib/layout/Sider';
import Guide from './Guide';
import ChatBotImage from '../asset/chatbot.png';

export default function SideBar(props) {
  const {
    handleFindPartner,
    handleEndConversation,
    handleGetConversation,
    handleChatBot,
    triggerSider,
    conversations,
    handleDisconnected,
    isFirstLogin,
    isSiderCollapsed,
  } = props;

  const [isVisible, setVisible] = useState(false);
  const [isVisibleGuide, setVisibleGuide] = useState(isFirstLogin);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleSetVisibleGuide = () => {
    setVisibleGuide((pre) => !pre);
  };

  const handleOk = () => {
    setVisibleGuide(false);
  };

  const hideModal = () => {
    setVisible(false);
  };
  const askLogout = () => {
    showModal();
  };
  const logout = async () => {
    handleDisconnected(false);
  };

  return (
    <Sider
      breakpoint="sm"
      className="h-screen flex flex-grow-0 flex-shrink-0 w-16 min-w-max sm:w-52 flex-none relative"
      style={{ flexBasic: '0' }}
      collapsible={false}
      trigger={null}
    >
      <div className="w-16 sm:w-full flex flex-wrap flex-col justify-center">
        {/* <Button
          className="fixed bottom-16 left-6 w-8 h-8 flex items-center justify-center z-50 rounded-full"
          onClick={() => {
            setIsCollapsed((prev) => !prev);
          }}
        >
          {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button> */}

        <marquee
          className="text-white w-16 sm:w-52"
          behavior="scroll"
          direction="left"
          bgcolor="#72bbd3"
        >
          Có 321 user đang online. Chat ngay nào!
        </marquee>
        <div
          className="sidebar-button"
          onClick={() => {
            triggerSider((prev) => !prev);
          }}
          title="Thông tin cá nhân"
        >
          {isSiderCollapsed ? (
            <UserOutlined className="sidebar-icon text-blue-700" />
          ) : (
            <UserOutlined className="sidebar-icon text-blue-700" />
          )}
          <p className="hidden sm:block sm:w-4/5 mb-0 py-2">
            Thông tin cá nhân
          </p>
        </div>
        <div
          className="sidebar-button"
          onClick={handleSetVisibleGuide}
          title="Hướng dẫn sử dụng"
        >
          <BookTwoTone className="sidebar-icon " />
          <p className="hidden sm:block sm:w-4/5 mb-0 py-2">
            Hướng dẫn sử dụng
          </p>
        </div>
        <div
          className="sidebar-button"
          onClick={handleFindPartner}
          title="Tìm kiếm"
        >
          <CompassTwoTone className="sidebar-icon " />
          <p className="hidden sm:block sm:w-3/5 mb-0 py-2">Tìm kiếm</p>
        </div>
        <div
          className="sidebar-button"
          onClick={handleChatBot}
          title="Chat với bot"
        >
          <div className="sidebar-icon px-2">
            <img
              src={ChatBotImage}
              alt="chatbot"
              className="sidebar-icon w-6 h-6 px-0"
            />
          </div>
          <p className="hidden sm:block sm:w-3/5 mb-0 py-2">Chat với bot</p>
        </div>
        <div className="sidebar-button" onClick={askLogout} title="Đăng xuất">
          <LogoutOutlined className="sidebar-icon text-red-600 " />
          <p className="hidden sm:block sm:w-3/5 mb-0 py-2">Đăng xuất</p>
        </div>
        <Modal
          title="Đăng xuất"
          visible={isVisible}
          onOk={logout}
          onCancel={hideModal}
          okText="Đồng ý"
          cancelText="Hủy"
          okButtonProps={{ danger: true }}
        >
          <p>Bạn có muốn đăng xuất ngay bây giờ?</p>
        </Modal>
        <Guide isModalVisible={isVisibleGuide} handleOk={handleOk} />
      </div>

      <Divider
        className="text-white text-base sm:text-xs"
        style={{ borderColor: '#72bbd3' }}
      ></Divider>
      {conversations.map((c) => (
        <div
          className="user-item flex justify-center sm:justify-between items-center cursor-pointer p-1.5 mb-2"
          onClick={() => handleGetConversation(c)}
          key={c.id}
        >
          <div className="mr-0 sm:mr-1 w-full sm:w-1/4 text-center">
            <Badge dot={true} color="green" className="mt-1" size="small">
              <Avatar
                size="small"
                src={c.conversationUser.avatarUrl || '/default_profile.jpg'}
              />
              <p className="mb-0 text-white text-xs leading-3">
                {c.conversationUser.username}
              </p>
            </Badge>
          </div>
          <div className="hidden sm:flex w-3/4 justify-around items-center">
            <p className="mb-0 text-sm text-white truncate">Xin chào</p>
            <CloseCircleOutlined
              onClick={handleEndConversation}
              className="w-4 h-4 ml-1 text-red-500"
            />
          </div>
        </div>
      ))}

      <div className="absolute w-full bottom-2 flex justify-center items-center ml-auto mr-2">
        <a
          href="https://facebook.com/trochuyenonline"
          target="_blank"
          rel="noopener noreferrer"
          className="text"
        >
          <FacebookOutlined className="text-4xl text-gray-200 hover:text-primary" />
        </a>
      </div>
    </Sider>
  );
}
