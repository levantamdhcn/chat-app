import React from 'react'
import { useSelector } from 'react-redux';
import { authSelector } from '../../../store/reducers/auth/selectors';
import { ETypes, IMessage } from '../../../types/message';
import { IUser } from '../../../types/user';
import { TextMessage } from '../Messages';

//TODO make emoji message
//TODO divide message to unique component

const messages = [
  {
    _id: "1",
    fromUser: "1",
    toUser: "64046c6b6405c724942e2515",
    type: "string",
    messageText: "Helloo",
    conversationId: "1",
  },
  {
    _id: "2",
    fromUser: "64046c6b6405c724942e2515",
    toUser: "2",
    type: "string",
    messageText: "Helloo",
    conversationId: "1",
  },
  {
    _id: "1",
    fromUser: "64046c6b6405c724942e2515",
    toUser: "64046c6b6405c724942e2515",
    type: "string",
    messageText: "Helloo",
    conversationId: "1",
  },
  {
    _id: "1",
    fromUser: "1",
    toUser: "64046c6b6405c724942e2515",
    type: "string",
    messageText: "Helloo",
    conversationId: "1",
  },
]

const ChatList = () => {
  const { user } = useSelector(authSelector).auth;

  const getMessageComponentByType = (
    type: string,
    user: IUser,
    message: IMessage
  ) => {
    //TODO correct props of other type of message
    switch (type) {
      case ETypes.text:
        return <TextMessage user={user} message={message} />;
      default:
        return <TextMessage user={user} message={message} />;
    }
  };

  return (
    <div className="chatList-wrapper scroll-wrapper">
      <div className="chatList-content">
        <ul className="messageList">
          {messages.map((message) => (
            <li
              className={`${
                user && user.id === message.fromUser ? "right" : ""
              }`}
              key={message._id}
            >
              { user && getMessageComponentByType(message.type, user, message) }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatList