import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setConversation } from '../../../store/reducers/conversation';

import Search from '../../../components/Search';
import ActiveFriend from './ActiveFriend';
import Avatar from '../../../assets/images/avatar.jpg';
import Slider from 'react-slick';
import Inbox from './Inbox';
import LoadingScreen from '../../../components/LoadingScreen';
import useConversation from '../../../hooks/useConversation';

const settings = {
  accessibility: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const Chat = () => {
  const { user, contacts, isFetching } = useAuth();
  const { conversations } = useConversation();
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    const lastestConversation = conversations[0];
    console.log('lastestConversation', lastestConversation);
    if(lastestConversation) {
      dispatch(setConversation(lastestConversation));
    }
  }, [conversations]);

  if (isFetching) return <LoadingScreen />;
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
          {user &&
            contacts &&
            contacts.map((contact) => {
              const otherPerson = contact.members.find(
                (contact) => contact._id !== user._id
              );
              return (
                <ActiveFriend
                  avatar={otherPerson?.avatar || Avatar}
                  name={`${otherPerson?.firstName || ''} ${
                    otherPerson?.lastName || ''
                  }`}
                />
              );
            })}
        </Slider>
      </div>
      <div className="chat-recent">
        <div className="chat-recent-title">Recent</div>
        <div className="inbox-list scroll-wrapper">
          {conversations &&
            conversations.length > 0 &&
            conversations.map((conversation) => {
              const sender = conversation.members.find(
                (el) => el.userId !== user?._id
              );
              const latestMsg = conversation.messages.at(-1);

              const handleSelectInbox = () => {
                dispatch(setConversation(conversation));
              }

              return (
                <Inbox
                  conversation={conversation}
                  senderAvatar={sender?.avatar || Avatar}
                  senderName={`${sender?.firstName || ''} ${
                    sender?.lastName || ''
                  }`}
                  latestMsg={
                    latestMsg?.messageText ||
                    `This is the first message to ${sender?.firstName || ''} ${
                      sender?.lastName || ''
                    }`
                  }
                  latestMsgTime={latestMsg?.createdAt || conversation.createdAt}
                  onClick={handleSelectInbox}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Chat;
