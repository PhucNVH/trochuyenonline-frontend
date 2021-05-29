import Modal from 'antd/lib/modal';
import Typography from 'antd/lib/typography';
import { Button } from 'antd';
import {
  UserOutlined,
  CompassTwoTone,
  CheckCircleTwoTone,
  EyeInvisibleTwoTone,
  HeartTwoTone,
  CloseCircleOutlined,
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar';

const { Paragraph } = Typography;

export default function Guide({ isModalVisible, handleOk }) {
  return (
    <Modal
      id="guide-modal"
      title={'HƯỚNG DẪN SỬ DỤNG'}
      className="top-8"
      visible={isModalVisible}
      width={700}
      onCancel={handleOk}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          Mình đã đọc
        </Button>,
      ]}
    >
      <>
        <Paragraph>
          <ul>
            <li>
              <UserOutlined style={{ fontSize: '20px', marginRight: '10px' }} />{' '}
              Quản lý thông tin cá nhân bằng cách đóng mở thanh bên phải. Ở đó
              bạn có thể đổi ảnh đại diện và cập nhật danh sách thông tin về bạn
              trong quá trình trò chuyện
            </li>
            <br></br>
            <li>
              <CompassTwoTone
                style={{ fontSize: '20px', marginRight: '10px' }}
              />{' '}
              Tìm kiếm một người trò chuyện cùng với bạn, bạn có thể tìm kiếm
              tiếp ngay khi đang trò chuyện
            </li>
            <br></br>
            <li>
              <CloseCircleOutlined
                style={{
                  fontSize: '20px',
                  color: 'rgba(239, 68, 68',
                  marginRight: '10px',
                }}
              />
              Kết thúc cuộc trò chuyện, cuộc trò chuyện sẽ bị xóa, tuy nhiên bạn
              có thể liên hệ admin để xem lại tin nhắn cuộc trò chuyện này
            </li>
            <br></br>
            <li>
              <Avatar src={'/default_profile.jpg'} /> Chúng mình có lưu trữ lại
              các cuộc trò chuyện để bạn có thể tiếp tục trò chuyện với nhiều
              người
            </li>
            <br></br>
            <li>
              <EyeInvisibleTwoTone
                style={{ fontSize: '20px', marginRight: '10px' }}
              />{' '}
              Bật tính năng này nếu bạn không muốn chúng mình lưu trữ tin nhắn
              của bạn
            </li>
            <br></br>
            <li>
              <HeartTwoTone
                style={{ fontSize: '20px', marginRight: '10px' }}
                twoToneColor="#eb2f96"
              />
              Nhận xét người trò chuyện cùng với bạn, họ cũng có thể nhận xét về
              bạn
            </li>
            <br></br>
            <li>
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: '20px', marginRight: '10px' }}
              />
              Nếu bạn được nhiều nhận xét tốt, chúng mình gửi bạn một đề nghị để
              bạn trở thành chuyên gia tư vấn, lúc này mọi người có thể tìm đến
              bạn để tâm sự thay vì phải tìm kiếm
            </li>
            <br></br>
            <li>
              <img
                src={
                  'https://cdn.iconscout.com/icon/free/png-256/star-bookmark-favorite-shape-rank-16-28621.png'
                }
                alt="expert"
                style={{
                  width: 28,
                  height: 28,
                }}
              />
              Danh sách những tâm sự viên, được tuyển chọn từ những thành viên
              tích cực trò chuyện của trochuyenonline
            </li>
            <br></br>
            <li>
              <img
                src={'https://img.icons8.com/cotton/2x/like.png'}
                style={{
                  width: 32,
                  height: 32,
                  marginRight: 8,
                  marginLeft: -4,
                }}
              />
              Kho cảm xúc, nơi bạn có thể chia sẻ những cảm xúc hiện tại của
              mình
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
