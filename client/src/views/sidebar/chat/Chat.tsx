import React from 'react';
import Search from '../../../components/Search';

const Chat = () => {
  return (
    <div className="chat">
        <div className="chat-top">
            <Search placeholder='Search messages or users'/>
        </div>
        <div className="chat-active-friends">

        </div>
        <div className="chat-recent">
            
        </div>
    </div>
  );
};

export default Chat;
