import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import FormButton from '../commons/FormButton';

const PasswordForm = (props) => {
  const { form, user, handleCloseModal } = props;

  return (
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
      <Form.Item
        label="Mật khẩu cũ"
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="old_password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        label="Mật khẩu mới"
        name="new_password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        label="Nhập lai mật khẩu"
        name="re_password"
        rules={[
          { required: true, message: 'Please input your Password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (
                (!value && !getFieldValue('new_password')) ||
                getFieldValue('new_password') === value
              ) {
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
          placeholder="Password"
        />
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

export default PasswordForm;
