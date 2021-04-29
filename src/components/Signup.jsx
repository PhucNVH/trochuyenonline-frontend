import React, { useState } from 'react';

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
import animationData from '../asset/lottie_conversation.json';
import Terms from '../components/Terms';
import { Checkbox } from 'antd';

const { Title } = Typography;
export const SignupComponent = () => {
  const { signup } = useAuth();
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (values) => {
    const res = await signup(values);
    console.log(res);
    if (res.success) {
      history.push('login');
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
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
    <Row className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-center pt-0 mb-0 md:pt-10 md:-mb-10">
        <Link to="/">
          <Title className="text-primary">Trò chuyện online</Title>
        </Link>
        <div className="w-96 md:w-full">
          <Lottie options={defaultOptions} />
        </div>
      </div>
      <Col className="flex flex-col items-center">
        <Card className="w-72 sm:w-80 px-2 sm:px-0 mb-4">
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
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Xác nhận lại mật khẩu của bạn nhé!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Hai mật khẩu của bạn không trùng khớp!')
                    );
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Xác nhận lại mật khẩu"
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error('Bạn chưa đồng ý với Điều khoản sử dụng!')
                        ),
                },
              ]}
            >
              <Checkbox>
                Tôi đã đọc và đồng ý với{' '}
                <a
                  onClick={() => {
                    setIsModalVisible(true);
                  }}
                >
                  Điều khoản sử dụng
                </a>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <div className="flex justify-evenly">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Đăng ký
                </Button>
                <Link to="login">
                  <Button className="login-form-button">Đăng nhập!</Button>
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
      </Col>
    </Row>
  );
};
