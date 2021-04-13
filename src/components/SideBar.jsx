import React, { useState } from 'react';
import {
  BellTwoTone,
  LogoutOutlined,
  MessageOutlined,
  ThunderboltTwoTone,
} from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

export default function SideBar(props) {
  const { handleFindPartner, handleEndConversation } = props;
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
      <Button className="sidebar-button bg-red-300">
        <Link to="chat">
          <MessageOutlined className="sidebar-icon" />
        </Link>
      </Button>
      <Button className="sidebar-button" onClick={askLogout}>
        <LogoutOutlined className="sidebar-icon" />
      </Button>
      <Button className="sidebar-button" onClick={handleFindPartner}>
        <BellTwoTone className="sidebar-icon" />
      </Button>
      <Button className="sidebar-button" onClick={handleEndConversation}>
        <ThunderboltTwoTone className="sidebar-icon" />
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
