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
            Terms & Conditions
          </a>
          <a
            className="ml-2"
            onClick={() => {
              setIsTerm(false);
              setIsModalVisible(true);
            }}
          >
            FAQs
          </a>
          <Modal
            title={isTerm ? 'Terms And Condition' : 'FAQs'}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleOk}
          >
            {isTerm == 'term' ? (
              <p>Terms</p>
            ) : (
              <>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </>
            )}
          </Modal>
        </div>
      </Col>
    </Row>
  );
}
