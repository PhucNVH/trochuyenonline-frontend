import React, { useRef, useState } from 'react';
import { useOutsideAlerter } from '../hooks/use-outsidealerter';
import Picker from 'emoji-picker-react';

export default function EmojiPicker({ onSelect }) {
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const wrapperRef = useRef(null);

  const onEmojiClick = (event, emojiObject) => {
    onSelect(emojiObject);
    setEmojiPickerVisible(false);
  };

  useOutsideAlerter(wrapperRef, () => {
    setEmojiPickerVisible(false);
  });

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className="cursor-pointer"
        style={{ fontSize: '18px', color: '#08c' }}
        onClick={() => setEmojiPickerVisible((prev) => !prev)}
      >
        😀
      </div>
      <div className="absolute z-50 bottom-8 right-0">
        {emojiPickerVisible ? (
          <Picker onEmojiClick={onEmojiClick} native disableAutoFocus={true} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
