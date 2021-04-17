import React, { useState } from 'react';
import {
  BellTwoTone,
  LogoutOutlined,
  MessageOutlined,
  UserOutlined,
  ThunderboltTwoTone,
  CompassTwoTone,
  PauseCircleTwoTone,
} from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

export default function SideBar(props) {
  const { handleFindPartner, handleEndConversation, triggerSider } = props;
  const Auth = useAuth();
  const history = useHistory();
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
    const result = await Auth.logout();
    if (result.status == 'success') {
      history.push('/login');
    }
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
    </div>
  );
}