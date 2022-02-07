import React from 'react';
import DotLoading from '../../../../components/DotLoading';

interface InboxProp {
    senderAvatar: string
    senderName: string
    latestMsg: string
    latestMsgTime: string
    unreadMsgCount?: number
    isTyping?: boolean
}

const Inbox = ({ senderAvatar, senderName, latestMsg, latestMsgTime, unreadMsgCount, isTyping }: InboxProp) => {
  
  return (
    <div className="inbox">
        <div className="sender-avt">
            <img src={senderAvatar} alt="sender-avatar" />
            <span className='icon-circle-fullfil active'></span>
        </div>
        <div className="inbox-preview">
            <div className="sender-name">
                <span>{senderName}</span>
                <span>{latestMsgTime}</span>
            </div>
            <div className="latest-msg">
                <p className={`${isTyping ? 'typing' : ''}`}>
                    {isTyping ? "typing" : latestMsg}
                    {isTyping && <DotLoading style={{ left: "-9942px", top: "-8px" }}/>}
                </p>
                {
                    unreadMsgCount && (
                        <span>{unreadMsgCount}</span>
                    )
                }
            </div>
        </div>
    </div>
  );
};

export default Inbox;
