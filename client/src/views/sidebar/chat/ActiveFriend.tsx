import React from 'react';

interface ActiveFriendProp {
  avatar: string;
  name: string;
}

const ActiveFriend = ({ avatar, name }: ActiveFriendProp) => {
  return (
    <div className="active-friend">
      <div className="active-friend-avt-wrapper">
        {avatar && (
          <img src={avatar} alt="avatar" className="active-friend-avt" />
        )}
        <span className="icon-circle-fullfil"></span>
      </div>
      <div className="active-friend-name">{name && name}</div>
    </div>
  );
};

export default ActiveFriend;
