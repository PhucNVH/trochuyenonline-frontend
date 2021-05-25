import { Button, PageHeader, Row, Tag, Typography, Input } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';

const { Paragraph } = Typography;

const Feed = () => {
  // const feedStore = React.useContext(FeedStoreContext);

  // const handlePost = (id) => {
  //   // conversationStore.create({id})
  //   console.log({ id });
  // };

  // const handleLike = (id) => {
  //   // conversationStore.create({id})
  //   console.log({ id });
  // };

  // React.useEffect(() => {
  //   feedStore.get();
  // }, []);

  const IconLink = ({ src, text }) => (
    <a>
      <img src={src} alt={text} />
      {text}
    </a>
  );

  const content = (
    <>
      <Paragraph>
        Ant Design interprets the color system into two levels: a system-level
        color system and a product-level color system.
      </Paragraph>
      <Paragraph>
        Ant Design&#x27;s design team preferred to design with the HSB color
        model, which makes it easier for designers to have a clear psychological
        expectation of color when adjusting colors, as well as facilitate
        communication in teams.
      </Paragraph>
      <div>
        <IconLink src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />
      </div>
    </>
  );

  const Content = ({ children, extraContent }) => (
    <Row>
      <div>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );

  return (
    <>
      <div class="feed-container">
        <div class="feed">
          <Input.TextArea
            placeholder="Chia sẻ cảm xúc của bạn"
            showCount
            maxLength={100}
            style={{ width: '98%', margin: 'auto' }}
            rows={3}
            bordered={false}
          />
        </div>
        <div class="feed">
          <PageHeader
            title="Title"
            className="site-page-header"
            subTitle="This is a subtitle"
            // tags={<Tag color="blue">Running</Tag>}
            extra={[
              <Button key="1" type="primary">
                Primary
              </Button>,
              // <DropdownMenu key="more" />,
            ]}
            avatar={{
              src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
            }}
            // breadcrumb={{ routes }}
          >
            <Content
              extraContent={
                <>
                  <img
                    src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                    alt="content"
                    width="100%"
                  />{' '}
                </>
              }
            >
              {content}
            </Content>
          </PageHeader>
        </div>
      </div>
    </>
  );
};

export default observer(Feed);
