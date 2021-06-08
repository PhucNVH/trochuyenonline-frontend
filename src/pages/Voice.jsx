import { Button, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { usePeer } from '../hooks/voice';

export function Voice() {
  const { peer, connect, call, create } = usePeer();
  const [id, setId] = useState('');

  useEffect(() => {
    console.log(peer);
  }, [peer]);
  return (
    <div className="h-52">
      <Input onChange={(e) => setId(e.target.value)}></Input>
      <Button
        onClick={() => {
          connect(id);
        }}
      >
        Submit
      </Button>
      <Button
        onClick={() => {
          call(id);
        }}
      >
        Call
      </Button>
      <Button
        onClick={() => {
          create();
          console.log(peer);
        }}
      >
        Generate
      </Button>
      <div>{peer ? peer.id : 'nan'}</div>
      <audio id="audio-player" controls></audio>
    </div>
  );
}
