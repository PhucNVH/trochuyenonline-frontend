import React from 'react';
import Typography from 'antd/lib/typography';
import ProfilePicture from '../asset/profile.jpg';
import { UploadOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/use-auth';
import { Button, Form, message, Modal, Upload } from 'antd';
const { Title } = Typography;
import ImgCrop from 'antd-img-crop';
import FormButton from './commons/FormButton';
import { MessageStoreContext } from '../stores/message.store';
import { UserStoreContext } from '../stores/user.store';

const AvatarModal = (props) => {
  const { form, user, handleUpdateProfile, handleCloseModal } = props;

  const [fileList, setFileList] = React.useState([]);

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
      <Form.Item label="Username">{user.username}</Form.Item>

      <Form.Item label="Avatar">
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
              <UploadOutlined /> Select File
            </Button>
          </Upload>
        </ImgCrop>
      </Form.Item>

      <FormButton
        handleCloseModal={handleCloseModal}
        submit={
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        }
      />
    </Form>
  );
};

export default function Profile() {
  const { user } = useAuth();

  const userStore = React.useContext(UserStoreContext);

  const [updateModalVisible, setUpdateModalVisible] = React.useState(false);
  const [avatarUrl, setAvatarUrl] = React.useState(user.avatarUrl);

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
    <div>
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
            src={avatarUrl}
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
          title="Profile"
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
      </div>
    </div>
  );
}
