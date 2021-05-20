import Typography from 'antd/lib/typography';
import Wrapper from '../components/commons/Wrapper';
import { Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

export default function PolicyPage() {
  return (
    <Wrapper header={true}>
      <Row justify="center">
        <Col span={12}>
          <Title level={4}>Chính sách quyền riêng tư trochuyenonline.com</Title>
          <b>Giới thiệu</b>
          <Paragraph>
            Chính sách quyền riêng tư này để chỉ ra cách mà Trochuyenonline sử
            dụng và bảo vệ dữ liệu thông tin cá nhân mà bạn cung cấp đến chúng
            tôi, hoặc là những dữ liệu thu được hoặc sinh ra bởi chúng tôi.
            Trong chính sách này, “chúng tôi” chính là Trochuyenonline, và “bạn”
            chính là bạn - người sử dụng dịch vụ của Trochuyenonline.
          </Paragraph>
          <b>Các nguyên tắc</b>
          <Paragraph>
            Trochuyenonline có các nguyên tắc trong việc thu thập và xử lý dữ
            liệu cá nhân:
            <ul>
              <li>
                Chúng tôi luôn mã hóa nội dung tin nhắn của bạn trước khi lưu,
                gửi và nhận.
              </li>
              <li>
                Việc sử dụng dữ liệu được dùng với mục đích nghiên cứu học
                thuật.
              </li>
              <li>
                Chúng tôi tôn trọng quyền riêng tư của bạn, vậy nên với các nội
                dung nhạy cảm hoặc bạn không muốn chúng tôi sử dụng vì mục đích
                học thuật, bạn có thể lựa chọn đề chúng tôi bỏ qua các nội dung
                đó.
              </li>
            </ul>
          </Paragraph>
        </Col>
      </Row>
    </Wrapper>
  );
}
