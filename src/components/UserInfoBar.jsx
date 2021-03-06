import { CloseCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Layout, message, Rate, Typography } from 'antd';
import React, { useState } from 'react';
import { RatingStoreContext } from '../stores/rating.store';
import CloseConversation from './modals/CloseConversation';

const { Header } = Layout;
const { Title } = Typography;

export default function UserInfoBar(props) {
  const {
    isVisible,
    isOnline,
    handleEndConversation,
    avatarUrl,
    isChatbotActive,
    currentChatbot,
    resetChat,
    conv,
    ...rest
  } = props;
  const [isVisibleClose, setIsVisibleClose] = useState(false);
  const ratingStore = React.useContext(RatingStoreContext);

  const [score, setScore] = React.useState(null);

  const handleOkClose = () => {
    handleEndConversation(conv);
    setIsVisibleClose(false);
  };
  const handleCancelClose = () => {
    setIsVisibleClose(false);
  };

  const handleRating = (value) => {
    setScore(value);

    if (isChatbotActive) {
      const result = ratingStore.putChatbot({
        score: value,
      });

      if (result) {
        message.success('Cảm ơn bạn đã đánh giá cuộc trò chuyện này');
      }
      return;
    }

    const result = ratingStore.post({
      userId: isChatbotActive ? null : conv?.conversationUser.id,
      score: value,
      isChatbot: isChatbotActive,
      conversationName: conv?.name,
    });

    if (result) {
      message.success('Cảm ơn bạn đã đánh giá cuộc trò chuyện này');
    }

    return;
  };

  React.useEffect(() => {
    if (conv && !isChatbotActive) {
      ratingStore.get({
        userId: isChatbotActive ? null : conv.conversationUser.id,
        isChatbot: isChatbotActive,
        conversationName: conv?.name,
      });
      setScore(ratingStore.score);
    }
  }, [ratingStore.score, conv]);

  React.useEffect(() => {
    if (isChatbotActive) {
      ratingStore.getChatbot();
      setScore(ratingStore.scoreChatbot);
    }
  }, [ratingStore.scoreChatbot, isChatbotActive]);

  return isVisible ? (
    <div {...props}>
      <Header className="px-2 sm:px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex justify-start items-center">
            <Badge
              count={1}
              className="leading-8"
              dot
              color={isOnline || isChatbotActive ? 'green' : 'red'}
            >
              <Avatar
                className={isChatbotActive ? '' : 'h-8 w-8'}
                src={
                  isChatbotActive
                    ? `https://image.flaticon.com/icons/png/512/2040/2040946.png`
                    : avatarUrl
                }
              />
            </Badge>
            <div className="flex md:flex-row flex-col justify-around">
              <Title
                id="username"
                className="mb-0 mr-4 mx-2 text-white"
                level={3}
                onClick={resetChat}
              >
                {isChatbotActive ? currentChatbot : ''}
              </Title>
              <Rate
                className="flex justify-start text-base"
                allowHalf
                value={score}
                onChange={(value) => {
                  handleRating(value);
                }}
              />
            </div>
          </div>
          <div className="ml-1 flex items-center justify-end w-1/2">
            {/* <SearchBar /> */}

            {isChatbotActive ? (
              <></>
            ) : (
              <CloseCircleOutlined
                title="Kết thúc cuộc trò chuyện"
                onClick={() => {
                  setIsVisibleClose(true);
                }}
                size={32}
                className="w-8 h-8 text-xl ml-1 text-red-500"
              />
            )}
          </div>
        </div>
      </Header>
      <CloseConversation
        isModalVisible={isVisibleClose}
        handleOk={handleOkClose}
        handleCancel={handleCancelClose}
      />
    </div>
  ) : (
    <></>
  );
}
