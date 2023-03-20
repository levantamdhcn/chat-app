import EmojiPicker, { Props as EmojiPickerProps } from "emoji-picker-react";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface EmojiPickerCustomProps extends EmojiPickerProps { 
  toggleOpen: Function
};

export default function EmojiPickerCustom({ toggleOpen, onEmojiClick }: EmojiPickerCustomProps) {
  const ref = useRef(null);

  const handleClickOutside = () => {
    console.log("A");
    toggleOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div ref={ref} className={"emoji-outside-custom"}>
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </div>
  );
}
