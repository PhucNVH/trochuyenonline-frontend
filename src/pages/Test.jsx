import React, { useEffect } from 'react';

import Lottie from 'react-lottie';
import animationData from '../asset/lottie_conversation.json';

export function Test() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <div style={{ width: 400, height: 400 }}>
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
          isStopped={false}
        />
      </div>
    </div>
  );
}
