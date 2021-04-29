import React from 'react';
import Typography from 'antd/lib/typography';
import {
  CloseOutlined,
  UploadOutlined,
  QuestionCircleOutlined,
  CloseCircleTwoTone,
} from '@ant-design/icons';
import { useAuth } from '../hooks/use-auth';
import {
  Button,
  Form,
  List,
  message,
  Modal,
  Upload,
  Tooltip,
  Row,
  Card,
} from 'antd';
const { Title } = Typography;
import ImgCrop from 'antd-img-crop';
import FormButton from './commons/FormButton';
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

export default function Profile(props) {
  const { personalities, handleRemovePersonality } = props;
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
          src={avatarUrl || '/default_profile.jpg'}
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
        {personalities.map((item, i) => {
          return (
            <Card
              size="small"
              className="w-11/12 max-h-12 mb-4 border-0 text-white fact-card px-0.5"
              hoverable
              key={i}
            >
              <div className="flex items-center">
                <div className="w-1/12">
                  <div className="w-5 h-5 rounded-full border border-solid flex justify-center items-center">
                    {i}
                  </div>
                </div>
                <div className="w-11/12 flex justify-between items-center">
                  <p className="ml-0.5 mb-0 text-base">{item.mention}</p>
                  <CloseCircleTwoTone
                    twoToneColor="#FF0000"
                    className="text-xl"
                    onClick={() => handleRemovePersonality(item)}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
