import Modal from 'antd/lib/modal';
import Typography from 'antd/lib/typography';
import Form from 'antd/lib/form';
import Checkbox from 'antd/lib/checkbox';
import { Button } from 'antd';
import { useState } from 'react';

const { Paragraph } = Typography;

export default function CloseConversation({
  isModalVisible,
  handleOk,
  handleCancel,
}) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Modal
      title={'Kêt thúc cuộc trò chuyện'}
      className="top-8"
      visible={isModalVisible}
      width={700}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="ghost" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button danger key="submit" type="primary" onClick={handleOk}>
          Xóa
        </Button>,
      ]}
    >
      <Paragraph>Bạn có muốn kết thúc cuộc trò chuyện này?</Paragraph>
      <Paragraph>
        Lưu ý: Bạn sẽ không thể xem lại cuộc trò chuyện này.
      </Paragraph>
      <Form>
        <Checkbox
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        >
          Báo cáo người dùng này
        </Checkbox>
      </Form>
    </Modal>
  );
}
