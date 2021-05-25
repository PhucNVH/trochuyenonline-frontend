import { observer } from 'mobx-react';
import React from 'react';
import { UserStoreContext } from '../stores/user.store';

const ExpertList = () => {
  const userStore = React.useContext(UserStoreContext);

  const handleChatWithExpert = (id) => {
    // conversationStore.create({id})
    console.log({ id });
  };

  React.useEffect(() => {
    userStore.getListExpert();
  }, []);

  return (
    <>
      {userStore.expertList.map((e) => (
        <div class="expert-container">
          <div class="expert">
            <div class="expert-image">
              <img
                src={
                  e.avatarUrl !== ''
                    ? e.avatarUrl
                    : 'https://cdn.iconscout.com/icon/free/png-256/star-bookmark-favorite-shape-rank-16-28621.png'
                }
              ></img>
            </div>
            <div class="expert-info">
              <h6>{e.expertName}</h6>
              <h2>{e.description}</h2>
              <h2>Hoạt động: {e.schedule}</h2>
              <div class="arrow-chat">
                <a
                  onClick={() => {
                    handleChatWithExpert(e.id);
                  }}
                >
                  Trò chuyện
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default observer(ExpertList);
