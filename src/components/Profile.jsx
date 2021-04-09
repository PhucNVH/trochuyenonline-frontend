import React, { useState } from "react";
import { Typography, Tabs, Modal } from "antd";
import ProfilePicture from "../asset/profile.jpg";
import ProfilePicture1 from "../asset/profile2.jpg";
import ProfilePicture2 from "../asset/profile3.jpg";
import ProfilePicture3 from "../asset/profile4.jpg";
import TabList from "./TabList";
import { useAuth } from "../hooks/use-auth";
const { TabPane } = Tabs;
const { Title } = Typography;

const AvatarModal = ({ visible, setVisible }) => {
  const avatars = [
    ProfilePicture,
    ProfilePicture1,
    ProfilePicture2,
    ProfilePicture3,
  ];
  return (
    <Modal
      title="Choose your avatar"
      centered
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      closable={false}
      width={1000}
    >
      <div className="flex justify-around">
        {avatars.map((e, i) => {
          return (
            <div
              key={i}
              className="ProfileAvatar"
              style={{
                borderColor: "black",
                borderWidth: "2px",
                borderStyle: "solid",
                borderRadius: "9999px",
              }}
            >
              <img
                src={e}
                alt="Profile Picture"
                style={{ height: 128, width: 128, borderRadius: "50%" }}
              />
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default function Profile() {
  const [visible, setVisible] = useState(false);
  const { user } = useAuth();
  const data = ["Điểm kém", "Hết tiền", "Chia tay"];
  return (
    <div>
      <AvatarModal visible={visible} setVisible={setVisible}></AvatarModal>
      <div
        className="ProfileInfo"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          className="ProfileAvatar"
          style={{
            borderColor: "#00f4a6",
            borderWidth: "2px",
            borderStyle: "solid",
            borderRadius: "9999px",
          }}
          onClick={() => {
            setVisible(true);
          }}
        >
          <img
            src={ProfilePicture}
            alt="Profile Picture"
            style={{ height: 128, width: 128, borderRadius: "50%" }}
          />
        </div>
        <div>
          <Title level={2} style={{ color: "white" }}>
            {user.username}
          </Title>
        </div>
      </div>
    </div>
  );
}
