import React from 'react';
import Search from '../../../components/Search';
import ActiveFriend from './ActiveFriend';
import Avatar from '../../../assets/images/avatar.jpg';
import Slider from 'react-slick';
import Inbox from './Inbox';
import useConversation from '../../../hooks/useConversation';
import LoadingScreen from '../../../components/LoadingScreen';
import useAuth from '../../../hooks/useAuth';

const settings = {
  accessibility: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  arrows: false,
};
const Chat = () => {
  const { conversations, isFetching, isSuccess, isError } = useConversation();
  const { user } = useAuth();

  if(isFetching) return <LoadingScreen />

  return (
    <div className="chat">
      <div className="tab-content-header">
        <h1 className="title">Chat</h1>
      </div>
      <div className="chat-top">
        <Search placeholder="Search messages or users" />
      </div>
      <div className="chat-active-friends">
        <Slider {...settings}>
          <ActiveFriend avatar={Avatar} name={'Doris'} />
          <ActiveFriend avatar={Avatar} name={'Doris'} />
          <ActiveFriend avatar={Avatar} name={'Doris'} />
          <ActiveFriend avatar={Avatar} name={'Doris'} />
          <ActiveFriend avatar={Avatar} name={'Doris'} />
          <ActiveFriend avatar={Avatar} name={'Doris'} />
        </Slider>
      </div>
      <div className="chat-recent">
        <div className="chat-recent-title">Recent</div>
        <div className="inbox-list scroll-wrapper">
          {conversations &&
            conversations.length > 0 &&
            conversations.map((conversation) => {
              const sender = conversation.members.find(el => el.userId !== user?.id);
              const latestMsg = conversation.messages.at(-1);
              
              return (
                <Inbox
                  senderAvatar={sender?.avatar || Avatar}
                  senderName={`${sender?.firstName || ""} ${sender?.lastName || ""}`}
                  latestMsg={latestMsg?.messageText || ""}
                  latestMsgTime={latestMsg?.createdAt || ""}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Chat;
