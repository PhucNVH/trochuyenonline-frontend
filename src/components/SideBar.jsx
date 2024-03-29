import { BookTwoTone } from '@ant-design/icons';
import CompassTwoTone from '@ant-design/icons/CompassTwoTone';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import Divider from 'antd/lib/divider';
import Sider from 'antd/lib/layout/Sider';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import React, { useState } from 'react';
import { useConversation } from '../hooks/use-conversation.js';
import Guide from './Guide';
import UserCard from './UserCard';
import { useChatbot } from '../hooks/use-chatbot';
import PersonalityForm from './modals/PersonalityForm.jsx';

export default function SideBar({
  triggerSider,
  isSiderCollapsed,
  isFirstLogin,
  handleShowExpertList,
  handleShowFeed,
}) {
  const {
    conversations,
    handleFindPartner,
    handleDisconnected,
    handleChatbot,
    numUser,
    onlineUsers,
    personalities,
    isChatbotActive,
    getPersonality,
  } = useConversation();
  const [isVisible, setVisible] = useState(false);
  // const [isMapVisible, setIsMapVisible] = useState(false);
  const [isVisibleGuide, setVisibleGuide] = useState(isFirstLogin);
  const [isSurveyVisible, setIsSurveyVisible] = useState(false);

  const { chatbotUrl, onChatbotSelected } = useChatbot();

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
  // const handleMap = () => {
  //   setIsMapVisible((prev) => !prev);
  // };

  const [isChatbotModalVisible, setIsChatbotModalVisible] = useState(false);
  const handleChatbotModal = () => {
    if (personalities.length <= 0) {
      setIsChatbotModalVisible(true);
    }
  };

  const gotoForm = () => {
    window.open('https://forms.gle/RuonupxMYqunumpo9', '_blank').focus();
    setIsSurveyVisible(false);
  };

  return (
    <Sider
      breakpoint="sm"
      className="h-screen flex flex-grow-0 flex-shrink-0 w-16 min-w-max sm:w-52 flex-none relative"
      style={{ flexBasic: '0', overflow: 'auto' }}
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
        {numUser > 0 ? (
          <marquee
            className="text-white w-16 sm:w-52"
            behavior="scroll"
            direction="left"
            bgcolor="#72bbd3"
          >
            Có {numUser} user đang online. Chat ngay nào!
          </marquee>
        ) : (
          <marquee
            className="text-white w-16 sm:w-52"
            behavior="scroll"
            direction="left"
            bgcolor="#72bbd3"
          >
            Không có user nào đang online. Hãy thử chat với chatbot nhé!
          </marquee>
        )}
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
          className={`sidebar-button ${
            chatbotUrl === 'chatbot1' && isChatbotActive ? 'tab-active' : ''
          }`}
          title="Chat với bot 1"
          onClick={() => {
            onChatbotSelected('chatbot1');
            handleChatbot();
          }}
        >
          <div className="sidebar-icon px-2">
            <img
              src={`https://image.flaticon.com/icons/png/512/2040/2040946.png`}
              alt="chatbot"
              style={{ width: 36, height: 36 }}
              // className="sidebar-icon w-6 h-6 px-0 border border-solid border-white rounded-full"
            />
          </div>
          <p className="hidden sm:block sm:w-3/5 mb-0 py-2">Tâm sự với bot 1</p>
        </div>
        <div
          className={`sidebar-button ${
            chatbotUrl === 'chatbot2' && isChatbotActive ? 'tab-active' : ''
          }`}
          title="Chat với bot 2"
          onClick={() => {
            onChatbotSelected('chatbot2');
            handleChatbot();
            handleChatbotModal();
          }}
        >
          <div className="sidebar-icon px-2">
            <img
              src={`https://image.flaticon.com/icons/png/512/2040/2040946.png`}
              alt="chatbot"
              style={{ width: 36, height: 36 }}
              // className="sidebar-icon w-6 h-6 px-0 border border-solid border-white rounded-full"
            />
          </div>
          <p className="hidden sm:block sm:w-3/5 mb-0 py-2">Tâm sự với bot 2</p>
        </div>

        <div
          className="sidebar-button"
          onClick={() => {
            handleShowExpertList(true);
            handleShowFeed(false);
          }}
          title="Danh sách tâm sự viên"
        >
          <div className="sidebar-icon px-2">
            <img
              src={
                'https://cdn.iconscout.com/icon/free/png-256/star-bookmark-favorite-shape-rank-16-28621.png'
              }
              alt="expert"
              style={{ width: 28, height: 28 }}
              // className="sidebar-icon w-6 h-6 border border-solid border-white rounded-full px-0 "
            />
          </div>
          <p className="hidden sm:block sm:w-3/5 mb-0 py-2">
            Danh sách tâm sự viên
          </p>
        </div>
        <div
          className="sidebar-button"
          onClick={() => {
            handleShowExpertList(false);
            handleShowFeed(true);
          }}
          title="Kho cảm xúc"
        >
          <div className="sidebar-icon px-2">
            <img
              src={'https://img.icons8.com/cotton/2x/like.png'}
              alt="expert"
              style={{ width: 32, height: 32 }}
              // className="sidebar-icon w-6 h-6 border border-solid border-white rounded-full px-0 "
            />
          </div>
          <p className="hidden sm:block sm:w-3/5 mb-0 py-2">Kho cảm xúc</p>
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
        <Modal
          title="Khảo sát"
          visible={isSurveyVisible}
          onOk={gotoForm}
          onCancel={() => {
            setIsSurveyVisible(false);
          }}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <p>
            Các bạn dành thời gian điền vào khảo sát dưới đây để bọn mình hoàn
            thiện chatbot nhé.
          </p>
          <a href="https://forms.gle/RuonupxMYqunumpo9" target="_blank">
            https://forms.gle/RuonupxMYqunumpo9
          </a>
        </Modal>
        <Guide isModalVisible={isVisibleGuide} handleOk={handleOk} />

        {/* <Modal
          visible={isMapVisible}
          onOk={() => {
            setIsMapVisible(false);
          }}
          onCancel={() => {
            setIsMapVisible(false);
          }}
        >
          <Map />
        </Modal> */}

        <Modal
          visible={isChatbotModalVisible}
          title="Personalities"
          key="sidebar-personalities"
          onCancel={() => {
            setIsChatbotModalVisible(false);
          }}
          footer={[
            <Button
              onClick={() => {
                setIsChatbotModalVisible(false);
              }}
            >
              Cancel
            </Button>,
            <Button
              form="chatbotform2"
              key="submit"
              htmlType="submit"
              type="primary"
              onClick={() => {
                setIsChatbotModalVisible(false);
              }}
            >
              Submit
            </Button>,
          ]}
        >
          <PersonalityForm
            setIsChatbotModalVisible={setIsChatbotModalVisible}
            getPersonality={getPersonality}
            id="chatbotform2"
            key="chatbotform2"
          />
        </Modal>
      </div>

      <Divider
        className="user-item text-white text-base sm:text-xs"
        style={{ borderColor: '#72bbd3' }}
      ></Divider>
      {conversations.map((c) => {
        return (
          <UserCard
            conv={c}
            key={c.id}
            isOnline={onlineUsers.includes(c.conversationUser.username)}
          />
        );
      })}
    </Sider>
  );
}
export const MemoizedSideBar = React.memo(SideBar);
