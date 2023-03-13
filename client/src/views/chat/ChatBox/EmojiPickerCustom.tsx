import React from "react";
import EmojiPicker from 'emoji-picker-react';
import { listenForOutsideClicks } from "../../../utils/listenForOutsideClicks";

const EmojiPickerCustom = () => {
  const emojiPickerRef = React.useRef(null);
  const [listening, setListening] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    listenForOutsideClicks({
      listening,
      setListening,
      ref: emojiPickerRef,
      setIsOpen,
    });
  }, [listening]);

  return (
    <div ref={emojiPickerRef} className={isOpen ? "open" : "hidden"} onClick={toggle}>
      <EmojiPicker />
    </div>
  );
};

export default EmojiPickerCustom;
