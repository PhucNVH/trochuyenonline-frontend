import React, { useState } from 'react';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import CompassTwoTone from '@ant-design/icons/CompassTwoTone';
import PauseCircleTwoTone from '@ant-design/icons/PauseCircleTwoTone';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Avatar from 'antd/lib/avatar';
import {
  CloseCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import Sider from 'antd/lib/layout/Sider';

export default function SideBar(props) {
  const {
    handleFindPartner,
    handleEndConversation,
    handleGetConversation,
    triggerSider,
    conversations,
    handleDisconnected,
  } = props;

  const [isVisible, setVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const showModal = () => {
    setVisible(true);
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
      className={['h-screen flex']}
      collapsedWidth="0"
      width="68px"
      collapsible
      trigger={null}
      collapsed={isCollapsed}
    >
      <Button
        className="fixed bottom-16 left-6 w-8 h-8 flex items-center justify-center z-50 rounded-full"
        onClick={() => {
          setIsCollapsed((prev) => !prev);
        }}
      >
        {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Button
        className="sidebar-button block"
        onClick={() => {
          triggerSider((prev) => !prev);
        }}
        title="Find"
      >
        <UserOutlined className="sidebar-icon text-blue-700" />
      </Button>
      <Button
        className="sidebar-button"
        onClick={handleFindPartner}
        title="Find"
      >
        <CompassTwoTone className="sidebar-icon " />
      </Button>
      <Button
        className="sidebar-button"
        onClick={handleEndConversation}
        title="Stop conversation"
      >
        <PauseCircleTwoTone className="sidebar-icon" twoToneColor="#f88585" />
      </Button>
      {conversations.map((c) => (
        <div className="sidebar-button flex justify-center items-center button-avatar w-full bg-blue-400">
          <span
            className="avatar-item bubble-avatar hover:w-1/2 w-full flex justify-center"
            onClick={() => handleGetConversation(c)}
          >
            <Avatar
              size="small"
              src={c.conversationUser.avatarUrl || '/default_profile.jpg'}
            />
          </span>
          <Button className="close-button border-none border-0 w-1/2" danger>
            <CloseCircleOutlined />
          </Button>
        </div>
      ))}
      <Button className="sidebar-button " onClick={askLogout} title="Log out">
        <LogoutOutlined className="sidebar-icon text-red-600 " />
      </Button>
      <Modal
        title="Confirm"
        visible={isVisible}
        onOk={logout}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Do you want to sign out</p>
      </Modal>
    </Sider>
  );
}
