import React, { useState } from 'react';
import Image from '../asset/people-talking-2.jpg';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { Link } from 'react-router-dom';
import Terms from '../components/Terms';
import Typography from 'antd/lib/typography';
import FacebookOutlined from '@ant-design/icons/FacebookOutlined';
import ReactGA from 'react-ga';
const { Title } = Typography;
ReactGA.pageview(window.location.pathname + window.location.search);

export function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
        <div className="flex items-center ml-auto mr-2">
          <a
            href="https://facebook.com/trochuyenonline"
            target="_blank"
            rel="noopener noreferrer"
            className="text"
          >
            <FacebookOutlined className="text-2xl text-gray-700 hover:text-blue-500" />
          </a>
        </div>
        <div className="m-auto ">
          <Link
            className="relative flex flex-col justify-center items-center hover:text-gray-50"
            to="tro-chuyen"
          >
            <Title className="hover:text-blue-600">Trò chuyện online</Title>
            <button className="HomeButton" to="tro-chuyen">
              Trò chuyện ngay nhé
            </button>
          </Link>
        </div>
        <div className="flex justify-center mb-4 text-lg">
          <a
            className="mr-2"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            Điều khoản sử dụng
          </a>
          <Terms isModalVisible={isModalVisible} handleOk={handleOk} />
        </div>
      </Col>
    </Row>
  );
}
