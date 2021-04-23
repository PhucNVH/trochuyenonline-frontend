import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import LockOutlined from '@ant-design/icons/LockOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { Typography } from 'antd';
import Lottie from 'react-lottie';
import animationData from '../asset/conversation.json';

const { Title } = Typography;

export const LoginComponent = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const { login } = useAuth();
  const history = useHistory();
  const onFinish = async (values) => {
    const res = await login(values);
    if (res && res.result.isFirstLogin == true) {
      history.push('survey');
      return;
    }
    if (res && res.status === 'success') {
      history.push('chat');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <div className="absolute top-24 md:top-32">
        <Link to="/">
          <Title className="text-primary">Trò chuyện online</Title>
        </Link>
      </div>
      <Col className="flex flex-col items-center">
        <div className="w-96 md:w-full">
          <Lottie options={defaultOptions} />
        </div>
        <div className="flex flex-col md:flex-row center">
          <Card className="w-72 sm:w-80 px-2 sm:px-0 border-2">
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
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Row style={{ marginLeft: '16%' }}>
                  <Col span={8}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Login
                    </Button>
                  </Col>
                  <Col>
                    <Link to="signup">
                      <Button className="login-form-button">
                        Register now!
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Col>
    </Row>
  );
};
