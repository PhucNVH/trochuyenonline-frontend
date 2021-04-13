import React from 'react';
import Image from '../asset/people-talking.jpg';
import { Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
const { Title } = Typography;

export function Home() {
  return (
    <Row style={{ height: ' 100vh', width: '100vw' }}>
      <Col xs={24} lg={14}>
        <div className="flex justify-center items-center w-full h-full">
          <img src={Image} alt="people talking" style={{ width: '100%' }} />
        </div>
      </Col>
      <Col xs={24} lg={10} style={{ backgroundColor: '#00f4a6' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <Title>Chatbot</Title>
          <Link className="HomeButton" to="chat">
            Let's talk
          </Link>
        </div>
      </Col>
    </Row>
  );
}
