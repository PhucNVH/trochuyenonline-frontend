import React, { useState } from 'react';
import Image from '../asset/people-talking-2.jpg';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Modal from 'antd/lib/modal';
import Typography from 'antd/lib/typography';
import { Link } from 'react-router-dom';
const { Title } = Typography;

export function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTerm, setIsTerm] = useState(true);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <Row style={{ height: ' 100vh', width: '100vw' }}>
      <Col xs={24} lg={14}>
        <div className="flex justify-center items-center w-full h-full">
          <img src={Image} alt="people talking" style={{ width: '100%' }} />
        </div>
      </Col>
      <Col
        xs={24}
        lg={10}
        className="flex flex-col"
        style={{ backgroundColor: '#DEE5FF' }}
      >
        <div
          className="m-auto"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Title>Trò chuyện online</Title>
          <Link className="HomeButton" to="chat">
            Let's talk
          </Link>
        </div>
        <div className="flex justify-center mb-4  text-lg">
          <a
            className="mr-2"
            onClick={() => {
              setIsTerm(true);
              setIsModalVisible(true);
            }}
          >
            Điều khoản sử dụng
          </a>
          <Modal
            title={'ĐIỀU KHOẢN SỬ DỤNG'}
            className="top-8"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleOk}
          >
            {
              <>
                <Title level={4}>
                  Chào mừng bạn đến với trochuyenonline.com
                </Title>
                <p>
                  Trochuyenonline tạo ra các công nghệ và dịch vụ nhằm hỗ trợ
                  mọi người kết nối và trò chuyện với nhau, xây dựng cộng đồng.
                  Các Điều khoản này điều chỉnh việc bạn sử dụng trang web
                  Trochuyenonline và các sản phẩm, tính năng, ứng dụng, dịch vụ,
                  công nghệ cũng như phần mềm khác mà chúng tôi cung cấp.
                </p>
                <p>
                  Bạn không mất phí sử dụng Trochuyenonline để trò chuyện hay
                  các sản phẩm và dịch vụ khác thuộc phạm vi điều chỉnh của
                  những Điều khoản này.
                </p>
                <p>
                  Chúng tôi không bán dữ liệu cá nhân của bạn cho bất kì bên thứ
                  3 nào và cũng không chia sẻ thông tin trực tiếp nhận dạng bạn
                  (chẳng hạn như tên, địa chỉ email hoặc thông tin liên hệ khác)
                  với những đơn vị khác trừ khi được bạn cho phép cụ thể.
                </p>
                <p>
                  Chính sách quyền riêng tư của chúng tôi sẽ giải thích cách
                  chúng tôi thu thập và sử dụng dữ liệu cá nhân của bạn để phục
                  vụ cho mục đích nghiên cứu khoa học.
                </p>
                <Title level={5}>Dịch vụ chúng tôi cung cấp</Title>
                <p>
                  Sứ mệnh của chúng tôi là đem đến cho mọi người khả năng xây
                  dựng cộng đồng và đưa thế giới lại gần nhau hơn. Người dùng có
                  thể nhắn tin trò chuyện chia sẻ với nhau mà không sợ lộ danh
                  tính (trừ khi họ chủ động làm chuyện đó với đối phương).
                </p>
                <Title level={5}>
                  Cam kết của bạn với Trochuyenonline và cộng đồng của chúng tôi
                </Title>
                <p>
                  Chúng tôi cung cấp các dịch vụ này cho bạn và người khác nhằm
                  thúc đẩy sứ mệnh của mình. Để đổi lại, chúng tôi cần bạn thực
                  hiện các cam kết sau:
                  <ul>
                    <li>
                      Không sử dụng dịch vụ của chúng tôi để gửi thư rác hoặc
                      lừa đảo người khác.
                    </li>
                    <li>
                      Tuyên truyền và quảng bá các hành vi bạo lực chống phá,
                      ...
                    </li>
                    <li>Có ngôn từ hoặc hành vi xúc phạm người khác</li>
                  </ul>
                </p>
              </>
            }
          </Modal>
        </div>
      </Col>
    </Row>
  );
}
