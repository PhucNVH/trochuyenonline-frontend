import React, { useState } from 'react';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import CompassTwoTone from '@ant-design/icons/CompassTwoTone';
import PauseCircleTwoTone from '@ant-design/icons/PauseCircleTwoTone';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import Avatar from 'antd/es/avatar/avatar';

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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Button
        className="sidebar-button block md:hidden"
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
      <Button className="sidebar-button" onClick={askLogout} title="Log out">
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
      {conversations.map((c) => (
        <span className="avatar-item bubble-avatar">
          <Button
            className="sidebar-button"
            onClick={() => handleGetConversation(c)}
          >
            {/* <Badge count={1}> */}
            <Avatar src={c.conversationUser.avatarUrl} />
            {/* </Badge> */}
          </Button>
        </span>
      ))}
    </div>
  );
}
