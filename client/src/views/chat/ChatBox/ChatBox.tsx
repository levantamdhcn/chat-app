import React, { useRef, useState } from "react";
import { EmojiClickData } from "emoji-picker-react";
import Avatar from "../../../assets/images/avatar.jpg";
import ChatList from "../ChatList";
import EmojiPickerCustom from "./EmojiPickerCustom";
import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../../store/reducers/conversation";
import { ThunkDispatch } from "redux-thunk";
import { TConversation } from "../../../store/reducers/conversation/types";

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

export type MessageInput = {
  fromUser: string | undefined;
  toUser: string;
  type: string;
  messageText: string;
  conversationId: string | undefined;
};

export interface IChatBoxProps {
  conversation: TConversation;
}

const ChatBox = ({ conversation }: IChatBoxProps ) => {
  const { user } = useAuth();
  const messageRef = useRef<HTMLInputElement>(null);
  const [openEmojiPicker, setOpenEmojiPicker] = React.useState(false);
  const [message, setMessage] = useState<
    string | number | readonly string[] | undefined
  >(undefined);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleChooseEmoji = (emoji: EmojiClickData, event: MouseEvent) => {
    setMessage((prev) => (prev || "") + emoji.emoji);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(event.target.value);

  const partner = conversation.members.find(el => el._id !== user?._id);

  const handleSendMessage = () => {
    if (!message) return;
    const newMessage = {
      fromUser: user?._id,
      toUser: "1",
      type: "text",
      messageText: message as string,
      conversationId: conversation?._id,
    };

    dispatch(sendMessage({ data: newMessage }));

    setMessage("");
  };

  return (
    <div className="chat-box">
      <div className="chat-box-header">
        <div className="chat-box-header-left">
          <img src={partner?.avatar || Avatar} alt="" className="active-friend-avt" />
          <div className="friend-name">{partner?.firstName || ""} {partner?.lastName || ""}</div>
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
          <input
            type="text"
            placeholder="Enter message..."
            value={message}
            ref={messageRef}
            onChange={handleChange}
            onKeyDown={(event) => {
              console.log("event", event);
              if (event.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
        </div>
        <div className="chat-box-footer-actions">
          <div
            className="chat-box-footer-action"
            onClick={() => setOpenEmojiPicker(true)}
          >
            <span className="icon-emoji"></span>
            {openEmojiPicker && (
              <EmojiPickerCustom
                toggleOpen={setOpenEmojiPicker}
                onEmojiClick={handleChooseEmoji}
              />
            )}
          </div>
          <div className="chat-box-footer-action">
            <span className="icon-attach"></span>
          </div>
          <div className="chat-box-footer-action">
            <span className="icon-image"></span>
          </div>
          <div className="chat-box-footer-action" onClick={handleSendMessage}>
            <span className="icon-mail"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
