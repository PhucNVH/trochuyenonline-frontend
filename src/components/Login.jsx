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

export const LoginComponent = () => {
  const { login } = useAuth();
  const history = useHistory();
  const onFinish = async (values) => {
    const res = await login(values);
    console.log(res);
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
      <Col>
        <div className="flex">
          <Card className="w-72 sm:w-80 px-2 sm:px-0 border-r-0">
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <Link to="signup">register now!</Link>
              </Form.Item>
            </Form>
          </Card>

          <Card className="w-72 sm:w-80 px-2 sm:px-0">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Chat anonymously
            </Button>
          </Card>
        </div>
      </Col>
    </Row>
  );
};
