import React from 'react';
import Modal from 'antd/lib/modal';
import Typography from 'antd/lib/typography';
import { Button } from 'antd';

const { Title, Paragraph } = Typography;

export default function Terms({ isModalVisible, handleOk }) {
  return (
    <Modal
      title={'ĐIỀU KHOẢN SỬ DỤNG'}
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
        <Title level={4}>Chào mừng bạn đến với trochuyenonline.com</Title>
        <Paragraph>
          Trochuyenonline tạo ra các công nghệ và dịch vụ nhằm hỗ trợ mọi người
          kết nối và trò chuyện với nhau, xây dựng cộng đồng. Các Điều khoản này
          điều chỉnh việc bạn sử dụng trang web Trochuyenonline và các sản phẩm,
          tính năng, ứng dụng, dịch vụ, công nghệ cũng như phần mềm khác mà
          chúng tôi cung cấp.
        </Paragraph>
        <Paragraph>
          Bạn không mất phí sử dụng Trochuyenonline để trò chuyện hay các sản
          phẩm và dịch vụ khác thuộc phạm vi điều chỉnh của những Điều khoản
          này.
        </Paragraph>
        <Paragraph>
          Chúng tôi không bán dữ liệu cá nhân của bạn cho bất kì bên thứ 3 nào
          và cũng không chia sẻ thông tin trực tiếp nhận dạng bạn (chẳng hạn như
          tên, địa chỉ email hoặc thông tin liên hệ khác) với những đơn vị khác
          trừ khi được bạn cho phép cụ thể.
        </Paragraph>
        <Paragraph>
          <a target="_blank" href="./policies">
            Chính sách quyền riêng tư
          </a>{' '}
          của chúng tôi sẽ giải thích cách chúng tôi thu thập và sử dụng dữ liệu
          cá nhân của bạn để phục vụ cho mục đích nghiên cứu khoa học.
        </Paragraph>
        <Title level={5}>Dịch vụ chúng tôi cung cấp</Title>
        <Paragraph>
          Sứ mệnh của chúng tôi là đem đến cho mọi người khả năng xây dựng cộng
          đồng và đưa thế giới lại gần nhau hơn. Người dùng có thể nhắn tin trò
          chuyện chia sẻ với nhau mà không sợ lộ danh tính (trừ khi họ chủ động
          làm chuyện đó với đối phương).
        </Paragraph>
        <Title level={5}>
          Cam kết của bạn với Trochuyenonline và cộng đồng của chúng tôi
        </Title>
        <Paragraph>
          Chúng tôi cung cấp các dịch vụ này cho bạn và người khác nhằm thúc đẩy
          sứ mệnh của mình. Để đổi lại, chúng tôi cần bạn thực hiện các cam kết
          sau:
          <ul>
            <li>
              Không sử dụng dịch vụ của chúng tôi để gửi thư rác hoặc lừa đảo
              người khác.
            </li>
            <li>Tuyên truyền và quảng bá các hành vi bạo lực chống phá, ...</li>
            <li>Có ngôn từ hoặc hành vi xúc phạm người khác</li>
          </ul>
        </Paragraph>
      </>
    </Modal>
  );
}
