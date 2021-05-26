import { observer } from 'mobx-react';
import React from 'react';
import { useConversation } from '../hooks/use-conversation';
import { UserStoreContext } from '../stores/user.store';

const ExpertList = () => {
  const userStore = React.useContext(UserStoreContext);
  const { handleChatExpert } = useConversation();

  React.useEffect(() => {
    userStore.getListExpert();
  }, []);

  return (
    <>
      {userStore.expertList.map((e) => (
        <div className="expert-container" key={e.id}>
          <div className="expert">
            <div className="expert-image">
              <img
                style={{ height: 100, width: 100 }}
                src={
                  e.avatarUrl !== ''
                    ? e.avatarUrl
                    : `https://avatars.dicebear.com/api/micah/${e.username}.svg`
                }
              />
            </div>
            <div className="expert-info">
              <h6>{e.username}</h6>
              <h2>{e.description}</h2>
              <h2>Hoạt động: {e.schedule}</h2>
              <div className="arrow-chat">
                <a
                  onClick={() => {
                    console.log(e);
                    handleChatExpert(e.id, e.username);
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
