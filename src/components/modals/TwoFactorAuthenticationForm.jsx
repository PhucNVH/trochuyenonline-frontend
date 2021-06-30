import React, { useState, useEffect } from 'react';
import { useCountdownTimer } from 'use-countdown-timer';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Switch, Typography } from 'antd';
import FormButton from '../commons/FormButton';
import { Auth } from '../../apis/auth';

const { Text } = Typography;

const TwoFactorAuthenticationForm = (props) => {
  const { countdown, start, reset, isRunning } = useCountdownTimer({
    timer: 1000 * 90,
  });

  const { form, user, handleCloseModal, isEnable, setIsEnable } = props;

  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const request2FA = async () => {
    setMessage('');
    const { image: imageStream, status } = await Auth.generate2FAToken({
      password: password,
      username: user.username,
      userId: user.id,
    });
    if (status === 'fail') return;
    var img = URL.createObjectURL(imageStream);
    if (isRunning) {
      reset();
      setImage(img);
    }
    setImage(img);
    start();
  };
  const save2fasetting = async () => {
    const data = await Auth.save2fasetting(isEnable);
    if (data.success) setMessage('2FA Setting Updated');
    console.log(data.success);
  };

  useEffect(() => {
    if (!isRunning) {
      setImage(null);
    }
  }, [isRunning]);

  return (
    <Form
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
      onFinish={save2fasetting}
    >
      <div className="flex mb-4">
        <div className="mr-2 w-1/6">
          <Text>Enable 2FA:</Text>
        </div>
        <Switch
          type="2fa"
          checked={isEnable}
          onClick={() => {
            setMessage('');
            setIsEnable((prev) => !prev);
          }}
        />
      </div>
      {isEnable && (
        <div className="mb-4">
          <div className="flex mb-2">
            <div className="mr-2 w-1/6">
              <Text>Mật khẩu:</Text>
            </div>
            <Input
              className="w-7/12 mr-2"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={request2FA}>Request 2FA QR</Button>
          </div>
          <Text className="mb-4">
            Tải Google Authenticator hoặc Microsoft Authenticator trước khi yêu
            cầu mã QR.
          </Text>
          <div className="flex flex-col justify-center items-center mx-auto">
            <img id="img" src={image} />
            {isRunning && (
              <Text strong>
                Mã QR sẽ biến mất sau: {Math.floor(countdown / 1000)}s
              </Text>
            )}
          </div>
        </div>
      )}
      {message !== '' && (
        <Text className="text-blue-400" strong>
          {message}
        </Text>
      )}
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

export default TwoFactorAuthenticationForm;
