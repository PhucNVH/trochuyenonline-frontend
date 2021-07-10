import { PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Form, message, Modal, Row, Tooltip, Tabs, Card, Button } from 'antd';
import Typography from 'antd/lib/typography';
import { useContext, useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useConversation } from '../hooks/use-conversation';
import { UserStoreContext } from '../stores/user.store';
import PersonalityCard from './PersonalityCard';
import TwoFactorAuthenticationForm from './modals/TwoFactorAuthenticationForm';
import AvatarForm from './modals/AvatarForm';
import PasswordForm from './modals/PasswordForm';
import PersonalityForm from './modals/PersonalityForm.jsx';

import { Auth } from '../apis/auth';
const { Title } = Typography;

const { TabPane } = Tabs;

export default function Profile() {
  const [isChatbotModalVisible, setIsChatbotModalVisible] = useState(false);
  const { user } = useAuth();
  const userStore = useContext(UserStoreContext);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const {
    personalities,
    handleRemovePersonality,
    getPersonality,
  } = useConversation();
  const handleCloseModal = () => {
    setUpdateModalVisible(false);
  };
  const [updateForm] = Form.useForm();
  const [isEnable, setIsEnable] = useState(false);

  const handleUpdateProfile = async (values) => {
    const result = await userStore.uploadAvatar(values);
    if (result) {
      message.success('Success!');
      const data = await userStore.getUser(user.token);
      setAvatarUrl(data.avatarUrl);
      handleCloseModal();
    }
  };

  const callback = async (key) => {
    console.log(key);
    if (key === '3') {
      const data = await Auth.get2fa();
      setIsEnable(data.result.isTwoFactorAuthenticationEnabled);
    }
  };

  return (
    <div
      className="ProfileInfo"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        className="ProfileAvatar"
        style={{
          borderColor: '#DEE5FF',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderRadius: '9999px',
        }}
        onClick={() => {
          setUpdateModalVisible(true);
        }}
      >
        <img
          src={
            avatarUrl ||
            `https://avatars.dicebear.com/api/micah/${user.username}.svg`
          }
          alt="Profile Picture"
          style={{ height: 128, width: 128, borderRadius: '50%' }}
        />
      </div>
      <div>
        <Title level={2} style={{ color: 'white' }}>
          {user.username}
        </Title>
      </div>

      <Modal
        title="Thông tin cá nhân"
        visible={updateModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={700}
      >
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Avatar" key="1">
            <AvatarForm
              form={updateForm}
              user={user}
              handleCloseModal={handleCloseModal}
              handleUpdateProfile={handleUpdateProfile}
            />
          </TabPane>
          <TabPane tab="Password" key="2">
            <PasswordForm
              form={updateForm}
              user={user}
              handleCloseModal={handleCloseModal}
            />
          </TabPane>
          <TabPane tab="2FA" key="3">
            <TwoFactorAuthenticationForm
              form={updateForm}
              user={user}
              isEnable={isEnable}
              setIsEnable={setIsEnable}
              handleCloseModal={handleCloseModal}
            />
          </TabPane>
        </Tabs>
      </Modal>
      <Modal
        visible={isChatbotModalVisible}
        title="Personalities"
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
            form="chatbotform"
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
        />
      </Modal>
      <div className="mt-8 w-full flex flex-col items-center">
        <Title level={4} className="text-white">
          <Row>
            Tính cách chatbot 2
            <Tooltip
              title="Để huấn luyện chatbot có tính cách, chúng mình rất mong bạn liên tục cập nhật danh sách này đúng với cá nhân bạn. Chúng mình cam kết không sử dụng thông tin này với mục đích nào khác việc training nếu chưa có sự cho phép cụ thể từ bạn"
              color="blue"
            >
              <QuestionCircleOutlined
                style={{ fontSize: '14px', marginLeft: '8px' }}
              />
            </Tooltip>
          </Row>
        </Title>
        {personalities.map((item, index) => {
          return (
            <PersonalityCard
              item={item}
              index={index}
              key={item.id}
              onRemove={handleRemovePersonality}
            />
          );
        })}
        <Card
          size="small"
          className="w-11/12 max-h-12 border-0 text-white fact-card px-0.5"
          hoverable
          key={'add'}
          onClick={() => {
            setIsChatbotModalVisible((prev) => !prev);
          }}
        >
          <div className="flex items-center justify-center h-7">
            <PlusCircleOutlined className="text-lg pb-2" />
          </div>
        </Card>
      </div>
    </div>
  );
}
