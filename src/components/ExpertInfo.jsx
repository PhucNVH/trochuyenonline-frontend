import { Form, Modal, Row, Input, Button } from 'antd';
import React from 'react';

export default function ExpertInfo() {
  const [isShow, setIsShow] = React.useState(true);
  const [step, setStep] = React.useState('first');

  const handleCancel = () => {
    setIsShow(false);
  };

  const handleStep = () => {
    if (step === 'first') {
      setStep('second');
    }
  };
  return (
    <Modal
      title="Đề nghị trở thành chuyên gia"
      visible={isShow}
      onOk={handleStep}
      onCancel={handleCancel}
      okText={step === 'first' ? 'Tiếp theo' : 'Đồng ý'}
      cancelText={step === 'first' ? 'Tạm đóng' : 'Trở về'}
    >
      {step === 'first' && (
        <>
          <Row justify="center">
            <img
              width={120}
              src="https://image.flaticon.com/icons/png/128/4245/4245652.png"
            />
          </Row>

          <p>Cảm ơn bạn đã tích cực trò chuyện trong thời gian qua.</p>
          <p>
            Chúng mình nhận thấy bạn đã hoạt động rất tích cực, đồng thời mọi
            người cũng trân trọng những cuộc trò chuyện với bạn
          </p>
          <p>
            Vì thế, chúng mình muốn đề xuất bạn trở thành một chuyên gia tư vấn.
            Nếu bạn đồng ý, xin hãy cập nhật thông tin ở trang sau. Những thông
            tin này sẽ được công khai đến mọi người, họ sẽ có thể nhắn tin tâm
            sự trực tiếp cho bạn mà không cần phải tìm kiếm.
          </p>
          <p>
            Mong bạn tiếp tục đồng hành cùng trochuyenonline, hi vọng sẽ có thêm
            nhiều người được tâm sự cùng với bạn.
          </p>
        </>
      )}
      {step === 'second' && (
        <>
          <Form
            // {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={() => {
              console.log('finish');
            }}
            onFinishFailed={() => {
              console.log('failed');
            }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Modal>
  );
}
