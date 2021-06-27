import React, { useState } from 'react';
import { Card } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';
import personalityService from '../apis/personality.service';

export default function PersonalityCard({ item, index, onRemove }) {
  const handleSavePersonality = () => {
    return personalityService.update({ id: item.id, mention: personality });
  };
  const [personality, setPersonality] = useState(item.mention);
  const inputRef = React.createRef();

  return (
    <Card
      size="small"
      className="w-11/12 max-h-12 mb-4 border-0 text-white fact-card px-0.5"
      hoverable
      key={item.id}
    >
      <div className="flex items-center">
        <div className="w-1/12">
          <div className="w-5 h-5 rounded-full border border-solid flex justify-center items-center">
            {index + 1}
          </div>
        </div>
        <div className="w-11/12 flex justify-between items-center">
          <input
            className="ml-0.5 mb-0 text-base card-input"
            value={personality}
            onChange={(v) => {
              setPersonality(v.target.value);
            }}
            onBlur={handleSavePersonality}
            ref={inputRef}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                inputRef.current.blur();
              }
            }}
          ></input>
          <CloseCircleTwoTone
            twoToneColor="#FF0000"
            className="text-xl"
            onClick={() => onRemove(item)}
          />
        </div>
      </div>
    </Card>
  );
}
