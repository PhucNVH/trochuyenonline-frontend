import { Form, Modal, Row, Input, Button, Popconfirm, message } from 'antd';
import { STEP } from '../dto/enums/step.enum';
import React from 'react';
import { UserStoreContext } from '../stores/user.store';

export default function ExpertInfo() {
  const userStore = React.useContext(UserStoreContext);
  const [isShow, setIsShow] = React.useState(true);
  const [step, setStep] = React.useState(STEP.ONE);

  const handleCancel = () => {
    setIsShow(false);
  };

  const handleNextStep = () => {
    if (step === STEP.ONE) {
      setStep(STEP.TWO);
    }
  };

  const handlePreviousStep = () => {
    if (step === STEP.TWO) {
      setStep(STEP.ONE);
    }
  };

  const handleReject = () => {
    console.log('rejected');
  };

  const handleAgree = async (values) => {
    if (step === STEP.TWO) {
      const result = await userStore.becomeExpert(values);
      if (result) {
        message.success('Bạn đã trở thành chuyên gia!');
        handleCancel();
      }
    }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Modal
      title="Đề nghị trở thành tâm sự viên"
      visible={isShow}
      footer={[
        <Button
          key="back"
          onClick={step === STEP.ONE ? handleCancel : handlePreviousStep}
        >
          {step === STEP.ONE ? 'Tạm đóng' : 'Trở về'}
        </Button>,
        <Popconfirm
          title="Nếu từ chối, bạn chỉ có thể liên hệ admin để nhận lại đề xuất này?"
          onConfirm={handleReject}
          // onCancel={cancel}
          okText="Đồng ý"
          cancelText="Đóng"
        >
          <Button danger onClick={handleReject}>
            Từ chối
          </Button>
        </Popconfirm>,

        <Button
          key="next"
          type="primary"
          onClick={
            step === STEP.ONE
              ? handleNextStep
              : () => {
                  //
                }
          }
          key={step === STEP.TWO ? 'submit' : ''}
          htmlType={step === STEP.TWO ? 'submit' : ''}
          form="expert-info"
        >
          {step === STEP.ONE ? 'Tiếp theo' : 'Đồng ý'}
        </Button>,
      ]}
      width={600}
    >
      {step === STEP.ONE && (
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
            Vì thế, chúng mình muốn đề xuất bạn trở thành một tâm sự viên của
            trochuyenonline. Nếu bạn đồng ý, xin hãy cập nhật thông tin ở trang
            sau. Những thông tin này sẽ được công khai đến mọi người, họ sẽ có
            thể nhắn tin tâm sự trực tiếp cho bạn mà không cần phải tìm kiếm.
          </p>
          <p>
            Mong bạn tiếp tục đồng hành cùng trochuyenonline, hi vọng sẽ có thêm
            nhiều người được tâm sự cùng với bạn.
          </p>
        </>
      )}
      {step === STEP.TWO && (
        <>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={(values) => {
              handleAgree(values);
            }}
            id="expert-info"
          >
            <Form.Item
              label="Tên hiển thị"
              name="expertName"
              tooltip="Bất cứ tên gì"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giới thiệu về bạn"
              name="description"
              tooltip="Không nhất thiết phải là thông tin về bản thân bạn"
            >
              <Input />
            </Form.Item>

            <Form.Item label="Thời gian bạn thường online" name="schedule">
              <Input />
            </Form.Item>
          </Form>
        </>
      )}
    </Modal>
  );
}
