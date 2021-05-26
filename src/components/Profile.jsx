import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import FacebookOutlined from '@ant-design/icons/FacebookOutlined';
import { Button, Form, message, Modal, Row, Tooltip, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import Typography from 'antd/lib/typography';
import { useContext, useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useConversation } from '../hooks/use-conversation';
import { UserStoreContext } from '../stores/user.store';
import FormButton from './commons/FormButton';
import PersonalityCard from './PersonalityCard';
const { Title } = Typography;

export default function Profile() {
  const { user } = useAuth();
  const userStore = useContext(UserStoreContext);

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

  const { personalities, handleRemovePersonality } = useConversation();
  const handleCloseModal = () => {
    setUpdateModalVisible(false);
  };

  const [updateForm] = Form.useForm();

  const handleUpdateProfile = async (values) => {
    const result = await userStore.uploadAvatar(values);
    if (result) {
      message.success('Success!');
      const data = await userStore.getUser(user.token);
      setAvatarUrl(data.avatarUrl);
      handleCloseModal();
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
        <AvatarModal
          form={updateForm}
          user={user}
          handleUpdateProfile={handleUpdateProfile}
          handleCloseModal={handleCloseModal}
        />
      </Modal>
      <div className="mt-8 w-full flex flex-col items-center">
        <Title level={4} className="text-white">
          <Row>
            Thông tin về bạn
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
      </div>

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
    </div>
  );
}

const AvatarModal = (props) => {
  const { form, user, handleUpdateProfile, handleCloseModal } = props;
  const [fileList, setFileList] = useState([]);

  const createFormBeforeCreate = (value) => {
    if (value.target < 1) {
      return message.error('Please set an valid amount target');
    }
    handleUpdateProfile({
      ...value,
      images: fileList,
    });
    setFileList([]);
  };

  return (
    <Form
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 19 }}
      layout="horizontal"
      onFinish={(value) => {
        createFormBeforeCreate(value);
      }}
      scrollToFirstError
      form={form}
    >
      <Form.Item label="Tên đăng nhập">{user.username}</Form.Item>

      <Form.Item label="Ảnh đại diện">
        <ImgCrop rotate>
          <Upload
            multiple={true}
            name="file"
            listType="text"
            fileList={fileList}
            showUploadList={{ showRemoveIcon: true }}
            beforeUpload={(file) => {
              setFileList([...fileList, file]);
              return false;
            }}
            onRemove={(file) => {
              const list = fileList.filter((f) => {
                if (f.uid !== file.uid) {
                  return true;
                }
                return false;
              });
              setFileList(list);
            }}
          >
            <Button>
              <UploadOutlined /> Chọn tệp
            </Button>
          </Upload>
        </ImgCrop>
      </Form.Item>

      <FormButton
        handleCloseModal={handleCloseModal}
        submit={
          <Button className="ml-2" type="primary" htmlType="submit">
            Cập nhật
          </Button>
        }
      />
    </Form>
  );
};
