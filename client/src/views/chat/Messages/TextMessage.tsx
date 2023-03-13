import React from "react";
import { IMessage } from "../../../types/message";
import { IUser } from "../../../types/user";

export type ITextMessageProps = {
  user: IUser;
  message: IMessage;
};

export const TextMessage = ({ user, message }: ITextMessageProps) => {
  return (
    <>
      {user && user.id !== message.fromUser && (
        <div className="member-avatar">
          <img
            src="https://res.cloudinary.com/dgycitw77/image/upload/v1652281571/236db40c1f8383211d8bf4428517a916_qrbln5.jpg"
            alt="avatar"
          />
        </div>
      )}
      <div className="ml-3">
        {user && user.id !== message.fromUser && (
          <div className="member-name">Lê Tâm</div>
        )}
        <p className="message-content">{message.messageText}</p>
      </div>
    </>
  );
};
