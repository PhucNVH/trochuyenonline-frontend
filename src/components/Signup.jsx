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
import Typography from 'antd/lib/typography';
import Lottie from 'react-lottie';
import animationData from '../asset/conversation.json';

const { Title } = Typography;
export const SignupComponent = () => {
  const { signup } = useAuth();
  const history = useHistory();

  const onFinish = async (values) => {
    const res = await signup(values);
    if (res.success) {
      history.push('login');
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
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
        <Card className="w-72 sm:w-80 px-2 sm:px-0">
          <Form
            name="normal_login"
            className="login-form -mx-4 sm:-mx-2"
            initialValues={{
              remember: true,
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
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm password"
              />
            </Form.Item>

            <Form.Item>
              <Row style={{ marginLeft: '16%' }}>
                <Col span={10}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Sign up
                  </Button>
                </Col>
                <Col>
                  <Link to="login">
                    <Button className="login-form-button">Login!</Button>
                  </Link>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
