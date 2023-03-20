import React from 'react'
import useAuth from '../../../hooks/useAuth';
import useConversation from '../../../hooks/useConversation';
import { ETypes, IMessage } from '../../../types/message';
import { IUser } from '../../../types/user';
import { TextMessage } from '../Messages';

//TODO make emoji message
//TODO divide message to unique component

const ChatList = () => {
  const { user } = useAuth();
  const { currentConversation } = useConversation();

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
          {currentConversation && currentConversation.messages.map((message) => (
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