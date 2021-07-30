import React, { useState } from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import div from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import LockOutlined from '@ant-design/icons/LockOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { Typography } from 'antd';
import Lottie from 'react-lottie';
import animationData from '../asset/lottie_conversation.json';
import Terms from '../components/Terms';
const { Title } = Typography;

export const LoginComponent = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const { login } = useAuth();
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onFinish = async (values) => {
    const res = await login(values);
    if (res && res.success === true && res.result.isFirstLogin == true) {
      history.push('khao-sat');
      return;
    }
    if (
      res &&
      res.success === true &&
      res.result.isTwoFactorAuthenticationEnabled === true
    ) {
      history.push('2fa');
      return;
    }
    if (res && res.success === true) {
      history.push('tro-chuyen');
      return;
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-center flex flex-col items-center">
        <Link to="/">
          <Title className="text-primary">Trò chuyện online</Title>
        </Link>
        <div className="w-96 md:w-9/12 flex justify-center">
          <Lottie options={defaultOptions} />
        </div>
      </div>
      <Col className="flex flex-col items-center">
        <div className="flex flex-col center">
          <Card className="w-72 sm:w-80 px-2 sm:px-0 border-2 mb-4">
            <Form
              name="normal_login"
              className="login-form  -mx-4 sm:-mx-2"
              initialValues={{
                username: '',
                password: '',
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Bạn chưa nhập tên đăng nhập!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Tên đăng nhập"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Bạn chưa nhập mật khẩu!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Mật khẩu"
                />
              </Form.Item>

              <Form.Item>
                <div className="flex justify-evenly">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Đăng nhập
                  </Button>
                  <Link to="dang-ky">
                    <Button className="login-form-button">Đăng kí ngay!</Button>
                  </Link>
                </div>
              </Form.Item>
            </Form>
          </Card>
          <div className="flex justify-center mb-4 text-lg">
            <a
              className="mr-2"
              onClick={() => {
                setIsModalVisible(true);
              }}
            >
              Điều khoản sử dụng
            </a>
            <Terms isModalVisible={isModalVisible} handleOk={handleOk} />
          </div>
        </div>
      </Col>
    </div>
  );
};
