import React, { useState } from 'react';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import CompassTwoTone from '@ant-design/icons/CompassTwoTone';
import PauseCircleTwoTone from '@ant-design/icons/PauseCircleTwoTone';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Avatar from 'antd/lib/avatar';
import {
  BookTwoTone,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import Sider from 'antd/lib/layout/Sider';
import Guide from './Guide';

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
  const [isVisibleGuide, setVisibleGuide] = useState(false);
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
        title="Thông tin cá nhân"
      >
        <UserOutlined className="sidebar-icon text-blue-700" />
      </Button>

      <Button
        className="sidebar-button"
        onClick={handleSetVisibleGuide}
        title="Hướng dẫn sử dụng"
      >
        <BookTwoTone className="sidebar-icon " />
      </Button>
      <Button
        className="sidebar-button"
        onClick={handleFindPartner}
        title="Tìm kiếm"
      >
        <CompassTwoTone className="sidebar-icon " />
      </Button>
      <Button
        className="sidebar-button"
        onClick={handleEndConversation}
        title="Kết thúc cuộc trò chuyện"
      >
        <PauseCircleTwoTone className="sidebar-icon" twoToneColor="#f88585" />
      </Button>
      <Button className="sidebar-button " onClick={askLogout} title="Đăng xuất">
        <LogoutOutlined className="sidebar-icon text-red-600 " />
      </Button>
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
      {conversations.map((c) => (
        <span className="avatar-item bubble-avatar">
          <Button
            className="sidebar-button"
            onClick={() => handleGetConversation(c)}
          >
            {/* <Badge count={1}> */}
            <Avatar
              src={c.conversationUser.avatarUrl || '/default_profile.jpg'}
            />
            {/* </Badge> */}
          </Button>
        </span>
      ))}
    </Sider>
  );
}
