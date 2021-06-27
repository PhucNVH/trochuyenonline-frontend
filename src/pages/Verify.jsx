import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useHistory } from 'react-router-dom';
import { Auth } from '../apis/auth';
import { Form, Button, InputNumber, Typography, Input } from 'antd';
import { toast } from 'react-toastify';

const { Title, Text } = Typography;

export function Verify() {
  const { user, verify2FAToken } = useAuth();
  const history = useHistory();

  const onFinish = async (value) => {
    const res = await verify2FAToken(value.token);
    console.log(res);
    if (res.result !== null) {
      history.push('/tro-chuyen');
    } else {
      toast('Token is invalid.', { position: 'top-center' });
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <Title level={2} className="text-center uppercase">
        2FA Check
      </Title>
      <div className="w-1/3 h-40">
        <Form name="verify" onFinish={onFinish} scrollToFirstError>
          <Text disabled className="cursor-default">
            Dùng ứng dụng bạn đã lưu QR 2FA để lấy token
          </Text>
          <Form.Item
            className="mb-4"
            name="token"
            rules={[
              {
                required: true,
                message: 'Không được để trống ô này!',
              },
              {
                len: 6,
                message: 'Token có đúng 6 chữ số!',
              },
              () => ({
                validator(_, value) {
                  if (RegExp('^[0-9]*$').test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Chỉ được nhập số!'));
                },
              }),
            ]}
            hasFeedback
          >
            <Input placeholder="Token" className="w-full" size="large" />
          </Form.Item>
          <div className="flex justify-center items-center">
            <Form.Item>
              <Button type="primary" className="mx-auto" htmlType="submit">
                Verify
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
