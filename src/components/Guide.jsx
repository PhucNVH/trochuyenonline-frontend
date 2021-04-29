import Modal from 'antd/lib/modal';
import Typography from 'antd/lib/typography';
import { Button } from 'antd';
import {
  UserOutlined,
  CompassTwoTone,
  PauseCircleTwoTone,
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar';

const { Paragraph } = Typography;

export default function Guide({ isModalVisible, handleOk }) {
  return (
    <Modal
      title={'HƯỚNG DẪN SỬ DỤNG'}
      className="top-8"
      visible={isModalVisible}
      width={700}
      onCancel={handleOk}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          Tôi đã đọc
        </Button>,
      ]}
    >
      <>
        <Paragraph>
          <ul>
            <li>
              <UserOutlined style={{ fontSize: '20px' }} />: Quản lý thông tin
              cá nhân bằng cách đóng mở thanh bên phải. Ở đó bạn có thể đổi ảnh
              đại diện và cập nhật danh sách thông tin về bạn trong quá trình
              trò chuyện
            </li>
            <br></br>
            <li>
              <CompassTwoTone style={{ fontSize: '20px' }} />: Tìm kiếm một
              người trò chuyện cùng với bạn, thậm chí bạn có thể tìm kiếm nhiều
              người để trò chuyện cùng một lúc đó
            </li>
            <br></br>
            <li>
              <PauseCircleTwoTone
                style={{ fontSize: '20px' }}
                twoToneColor="#f88585"
              />
              : Kết thúc cuộc trò chuyện, bằng cách chọn vào cuộc trò chuyện bạn
              muốn kết thúc ở những hình tròn phía dưới và ấn nút này
            </li>
            <br></br>
            <li>
              <Avatar src={'/default_profile.jpg'} />: Cuộc trò chuyện đang diễn
              ra, chúng mình lưu trữ lại cuộc trò chuyện để bạn có thể tiếp tục
              trò chuyện với nhiều người
            </li>
          </ul>
        </Paragraph>
        <br></br>
        <Paragraph>
          Liên hệ với chúng mình qua{' '}
          <a target="_blank" href="https://www.facebook.com/trochuyenonline">
            Trò chuyện online page
          </a>{' '}
          nếu có bất cứ góp ý hoặc chia sẻ nào nha
        </Paragraph>
      </>
    </Modal>
  );
}
