import React from 'react';

import { Layout, Col } from 'antd';

interface WrapperProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  header?: boolean;
}

const Wrapper: React.FC<WrapperProps> = (props) => {
  const { children, header = false } = props;

  return (
    <Layout>
      <Col className="container">
        {header}
        {children}
      </Col>
    </Layout>
  );
};

export default Wrapper;
