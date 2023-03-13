import React from "react";
import Avatar from "../../../assets/images/avatar.jpg";
import ChatList from "../ChatList";
import EmojiPicker from "emoji-picker-react";

const actions = [
  {
    icon: <span className="icon-search"></span>,
    action: () => {},
  },
  {
    icon: <span className="icon-call"></span>,
    action: () => {},
  },
  {
    icon: <span className="icon-video-call"></span>,
    action: () => {},
  },
  {
    icon: <span className="icon-user"></span>,
    action: () => {},
  },
  {
    icon: <span className="icon-more-md"></span>,
    action: () => {},
  },
];

const ChatBox = () => {
  const [openEmojiPicker, setOpenEmojiPicker] = React.useState(false);

  return (
    <div className="chat-box">
      <div className="chat-box-header">
        <div className="chat-box-header-left">
          <img src={Avatar} alt="" className="active-friend-avt" />
          <div className="friend-name">Patrick Hendricks</div>
          <span className="icon-circle-fullfil active"></span>
        </div>
        <div className="chat-box-header-right">
          {actions.map((action) => {
            return (
              <div className="chat-box-header-action" onClick={action.action}>
                {action.icon}
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat-box-content">
        <ChatList />
      </div>
      <div className="chat-box-footer">
        <div className="write-msg">
          <input type="text" placeholder="Enter message..." />
        </div>
        <div className="chat-box-footer-actions">
          <div
            className="chat-box-footer-action"
            onClick={() => setOpenEmojiPicker(true)}
          >
            <span className="icon-emoji"></span>
            {openEmojiPicker && <EmojiPicker />}
          </div>
          <div className="chat-box-footer-action">
            <span className="icon-attach"></span>
          </div>
          <div className="chat-box-footer-action">
            <span className="icon-image"></span>
          </div>
          <div className="chat-box-footer-action">
            <span className="icon-mail"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
