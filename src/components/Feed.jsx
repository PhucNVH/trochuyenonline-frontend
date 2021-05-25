import { EyeTwoTone } from '@ant-design/icons';
import { Button, Input, PageHeader, Row, Typography, message } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { PER_PAGE_OPTIONS } from '../dto/commons/PaginationRequest.dto';
import { FeedStoreContext } from '../stores/feed.store';

const { Paragraph } = Typography;

const Feed = () => {
  const feedStore = React.useContext(FeedStoreContext);
  const [status, setStatus] = React.useState('');
  const [skip, setSkip] = React.useState(0);
  const [take, setTake] = React.useState(+PER_PAGE_OPTIONS[1]);
  const [feeds, setFeeds] = React.useState([]);

  const handleSetStatus = (event) => {
    setStatus(event.target.value);
  };

  const handlePost = () => {
    const result = feedStore.post({ content: status });
    if (result) {
      message.success('Đã chia sẻ!');
      setStatus('');
      feedStore.get({
        skip,
        take,
      });
    }
  };

  const handleLike = (id) => {
    const result = feedStore.like(id);
  };

  const getFeed = React.useCallback(() => {
    feedStore.get({
      skip,
      take,
    });
  }, []);

  React.useEffect(() => {
    if (!feedStore.feeds.length) {
      getFeed();
    }
    setFeeds(feedStore.feeds);
  }, [feedStore.feeds]);

  // useEffect(() => {
  //   document.getElementById('feed-container').onscroll = (e) => {
  //     e.preventDefault();
  //     if (document.getElementById('chat-area').scrollWidth == 0) {
  //       setTake((prev) => prev + 10);
  //     }
  //   };
  // }, []);

  return (
    <>
      <div class="feed-container">
        <div class="feed">
          <Input.TextArea
            placeholder="Chia sẻ cảm xúc của bạn"
            style={{ width: '98%', margin: 'auto', paddingTop: '5px' }}
            rows={3}
            bordered={false}
            onChange={handleSetStatus}
            value={status}
          />
        </div>
        <div style={{ paddingBottom: '24px' }}>
          <Button
            style={{
              float: 'right',
              marginRight: '5%',
              borderRadius: '10px',
            }}
            onClick={handlePost}
          >
            Chia sẻ
          </Button>
          <Button
            style={{ float: 'right', borderRadius: '10px' }}
            disabled={true}
          >
            Thêm ảnh
          </Button>
        </div>
        {feeds.map((f) => (
          <>
            <div class="feed">
              <PageHeader
                subTitle={f.subContent}
                // tags={<Tag color="blue">Running</Tag>}
                extra={[
                  <Button
                    type="primary"
                    style={{
                      borderRadius: '10px',
                      display: 'flex',
                    }}
                  >
                    Trò chuyện
                  </Button>,
                ]}
                avatar={{
                  // style: 'borderColor: rgb(222, 229, 255)',
                  src:
                    f.userInfo.avatarUrl !== ''
                      ? f.userInfo.avatarUrl
                      : `https://avatars.dicebear.com/api/avataaars/${f.userInfo.id}.svg`,
                }}
              >
                <Row>
                  <div
                    style={{
                      maxWidth: '70%',
                      textAlign: 'justify',
                      marginRight: '5%',
                    }}
                  >
                    <Paragraph>{f.content}</Paragraph>

                    <div>
                      <Row>
                        <a>
                          <img
                            src="https://img.icons8.com/cotton/2x/like.png"
                            style={{
                              width: 32,
                              height: 32,
                              marginLeft: -4,
                            }}
                            onClick={() => {
                              handleLike(f.id);
                            }}
                          />
                        </a>
                        <span style={{ margin: 'auto', marginRight: '32px' }}>
                          {f.currentLike}
                        </span>
                        <EyeTwoTone
                          style={{
                            fontSize: '20px',
                            marginRight: '10px',
                            marginTop: '5px',
                          }}
                        ></EyeTwoTone>
                        <span style={{ margin: 'auto' }}>{f.currentView}</span>
                      </Row>
                    </div>
                  </div>
                  {/* <div className="image">
                <img
                  src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                  alt="content"
                  width="100%"
                  style={{ float: 'right', display: 'flex' }}
                />
              </div> */}
                </Row>
              </PageHeader>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default observer(Feed);
