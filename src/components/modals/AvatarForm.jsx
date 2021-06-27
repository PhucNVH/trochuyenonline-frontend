import React, { useState } from 'react';
import { Button, Form, message, Upload } from 'antd';
import FormButton from '../commons/FormButton';
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from '@ant-design/icons';

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

export default AvatarModal;
