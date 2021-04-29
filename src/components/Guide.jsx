import Modal from 'antd/lib/modal';
import Typography from 'antd/lib/typography';
import { Button } from 'antd';
import {
  UserOutlined,
  CompassTwoTone,
  PauseCircleTwoTone,
  EyeInvisibleOutlined,
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
              <CompassTwoTone style={{ fontSize: '20px' }} />: Bạn có thể tìm
              kiếm một hoặc nhiều người trò chuyện cùng bằng cách nhấn nút này
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
            <br></br>
            <li>
              <EyeInvisibleOutlined
                style={{ fontSize: '20px', color: '#08c' }}
              />
              : Nhấn nút này nếu bạn không muốn hệ thống lưu tin nhắn mà bạn gửi
              đi
            </li>
          </ul>
        </Paragraph>
      </>
    </Modal>
  );
}
