import moment from 'moment';
import React from 'react';
import DotLoading from '../../../../components/DotLoading';
import { isThisMonth, isThisWeek, isToday } from '../../../../utils/helpers';
import { setConversation } from '../../../../store/reducers/conversation';
import { TConversation } from '../../../../store/reducers/conversation/types';
import { useDispatch } from 'react-redux';
import useConversation from '../../../../hooks/useConversation';

interface InboxProp {
  conversation: TConversation;
  senderAvatar: string;
  senderName: string;
  latestMsg: string;
  latestMsgTime: Date;
  unreadMsgCount?: number;
  isTyping?: boolean;
  onClick: (arg: any) => void;
}

const Inbox = ({
  conversation,
  senderAvatar,
  senderName,
  latestMsg,
  latestMsgTime,
  unreadMsgCount,
  isTyping,
  onClick,
}: InboxProp) => {
  const { currentConversation } = useConversation();

  const getDateString = (date: Date) => {
    const formattedDate = new Date(date);

    if (isToday(formattedDate)) {
      return moment(date).format('h:mm A');
    }
    if (isThisWeek(formattedDate)) {
      return moment(date).format('ddd D');
    }
    if (isThisMonth(formattedDate)) {
      return moment(date).format('MMMM D');
    } else {
      return moment(date).format('MM/DD/YYYY');
    }
  };

  return (
    <div
      className={`inbox ${
        currentConversation && currentConversation._id === conversation._id
          ? 'active'
          : ''
      }`}
      onClick={onClick}
    >
      <div className="sender-avt">
        <img src={senderAvatar} alt="sender-avatar" />
        <span className="icon-circle-fullfil active"></span>
      </div>
      <div className="inbox-preview">
        <div className="sender-name">
          <span>{senderName}</span>
          <span>{getDateString(latestMsgTime)}</span>
        </div>
        <div className="latest-msg">
          <p className={`${isTyping ? 'typing' : ''}`}>
            {isTyping ? 'typing' : latestMsg}
            {isTyping && (
              <DotLoading style={{ left: '-9942px', top: '-8px' }} />
            )}
          </p>
          {unreadMsgCount && <span>{unreadMsgCount}</span>}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
