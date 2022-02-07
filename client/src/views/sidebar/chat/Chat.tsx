import React from 'react';
import Search from '../../../components/Search';
import ActiveFriend from './ActiveFriend';
import Avatar from "../../../assets/images/avatar.jpg"
import Slider from "react-slick";
import Inbox from './Inbox';

const settings = {
      accessibility: false,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: false
    };
const Chat = () => {
  return (
    <div className="chat">
        <div className="tab-content-header">
            <h1 className="title">Chat</h1>
        </div>
        <div className="chat-top">
            <Search placeholder='Search messages or users'/>
        </div>
        <div className="chat-active-friends">
            <Slider
              {...settings}
            >
                <ActiveFriend
                    avatar={Avatar} 
                    name={"Doris"}
                />
                <ActiveFriend
                    avatar={Avatar} 
                    name={"Doris"}
                />
                <ActiveFriend
                    avatar={Avatar} 
                    name={"Doris"}
                />
                <ActiveFriend
                    avatar={Avatar} 
                    name={"Doris"}
                />
                <ActiveFriend
                    avatar={Avatar} 
                    name={"Doris"}
                />
                <ActiveFriend
                    avatar={Avatar} 
                    name={"Doris"}
                />
            </Slider>
        </div>
        <div className="chat-recent">
            <div className="chat-recent-title">
                Recent
            </div>
            <div className="inbox-list scroll-wrapper">
                    <Inbox
                        senderAvatar={Avatar}
                        senderName={"Patrick Hendricks"} 
                        latestMsg={"okay sure"}
                        latestMsgTime={"02:50"}
                    />
                    <Inbox
                        senderAvatar={Avatar}
                        senderName={"Patrick Hendricks"} 
                        latestMsg={"okay sure"}
                        latestMsgTime={"02:50"}
                    />
                    <Inbox
                        senderAvatar={Avatar}
                        senderName={"Patrick Hendricks"} 
                        latestMsg={"okay sure"}
                        latestMsgTime={"02:50"}
                        unreadMsgCount={3}
                    />
                    <Inbox
                        senderAvatar={Avatar}
                        senderName={"Patrick Hendricks"} 
                        latestMsg={"okay sure"}
                        latestMsgTime={"02:50"}
                        unreadMsgCount={3}
                    />
                    <Inbox
                        senderAvatar={Avatar}
                        senderName={"Patrick Hendricks"} 
                        latestMsg={"okay sure"}
                        latestMsgTime={"02:50"}
                        unreadMsgCount={3}
                    />
                    <Inbox
                        senderAvatar={Avatar}
                        senderName={"Patrick Hendricks"} 
                        latestMsg={"okay sure"}
                        latestMsgTime={"02:50"}
                        unreadMsgCount={3}
                    />
                    <Inbox
                        senderAvatar={Avatar}
                        senderName={"Patrick Hendricks"} 
                        latestMsg={"okay sure"}
                        latestMsgTime={"02:50"}
                        unreadMsgCount={3}
                    />
                    <Inbox
                        senderAvatar={Avatar}
                        senderName={"Patrick Hendricks"} 
                        latestMsg={"okay sure"}
                        latestMsgTime={"02:50"}
                        unreadMsgCount={3}
                        isTyping
                    />
                </div>
        </div>
    </div>
  );
};

export default Chat;
