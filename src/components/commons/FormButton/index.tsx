import { Button, Col, Row } from 'antd';
import { ReactNode } from 'react';

interface ComponentProps {
  handleCloseModal: any;
  submit?: ReactNode;
}

const FormButton = (props: ComponentProps) => {
  const { handleCloseModal, submit } = props;

  return (
    <Row justify="end" className="form-footer">
      <Col>
        <Button
          type="primary"
          htmlType="button"
          danger
          onClick={handleCloseModal}
        >
          Close
        </Button>
      </Col>

      <Col>{submit}</Col>
    </Row>
  );
};

export default FormButton;
