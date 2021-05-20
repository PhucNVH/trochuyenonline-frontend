import React, { useRef, useState } from 'react';
import { Input } from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  SendOutlined,
} from '@ant-design/icons';
import EmojiPicker from './EmojiPicker';

export default function ChatInput({
  handleSendMessage,
  handleSensitive,
  isSensitive,
}) {
  const [inputValue, setInputValue] = useState('');
  const textInputRef = useRef(null);
  const onSend = () => {
    handleSendMessage(inputValue);
    setInputValue('');
  };

  const handleSelectEmoji = (e) => {
    setInputValue((prev) => prev + e.emoji);
  };

  return (
    <Input.Group className="flex" compact>
      <div
        className="mx-1"
        style={{ fontSize: '18px', color: '#08c' }}
        onClick={() => handleSensitive(!isSensitive)}
      >
        {isSensitive ? <EyeInvisibleOutlined /> : <EyeOutlined />}
      </div>
      <Input
        className="w-full rounded-lg"
        ref={textInputRef}
        value={inputValue}
        onChange={(v) => setInputValue(v.target.value)}
        onPressEnter={onSend}
      ></Input>
      <div className="flex w-auto mx-1">
        <EmojiPicker className="mx-1" onSelect={handleSelectEmoji} />
        <SendOutlined
          className="text-xl mx-1 hover:text-blue-500"
          onClick={onSend}
        />
      </div>
    </Input.Group>
  );
}
