import { useState, useEffect, useCallback, useContext } from 'react';
import Peer from 'peerjs';

export const usePeer = () => {
  const [peer, setPeer] = useState(new Peer());
  const socketStore = useContext(SocketStoreContext);
  const socket = socketStore.socket;

  const create = () => {
    setPeer(new Peer());
  };

  const connect = useCallback(
    (id) => {
      if (peer) {
        var conn = peer.connect(id);
        // on open will be launch when you successfully connect to PeerServer
        conn.on('open', function () {
          // here you have conn.id
          conn.send('hi!');
        });
      }
    },
    [peer]
  );

  const call = useCallback(
    (id) => {
      if (peer) {
        var getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia;
        getUserMedia(
          { video: false, audio: true },
          function (stream) {
            var call = peer.call(id, stream);
            call.on('stream', function (remoteStream) {
              // Show stream in some video/canvas element.
            });
          },
          function (err) {
            console.log('Failed to get local stream', err);
          }
        );
      }
    },
    [peer]
  );

  useEffect(() => {
    socket.on('receive_call', (data) => {
      console.log(data);
    });
    return () => {
      socket.off('receive_call');
    };
  }, [peer, socket]);

  useEffect(() => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    peer.on('call', function (call) {
      console.log('receive_call');
      getUserMedia(
        { video: false, audio: true },
        function (stream) {
          call.answer(stream); // Answer the call with an A/V stream.
          call.on('stream', function (remoteStream) {
            // Show stream in some video/canvas element.
            const audio = document.getElementById('audio-player');
            console.log(audio, remoteStream);
            audio.srcObject = remoteStream;
            audio.onloadedmetadata = function (e) {
              console.log('now playing the audio');
              audio.play();
            };
          });
        },
        function (err) {
          console.log('Failed to get local stream', err);
        }
      );
    });
    return () => {
      peer.off('call');
    };
  }, [peer]);

  useEffect(() => {
    console.log(peer);
    if (peer) {
      peer.on('connection', function (conn) {
        conn.on('data', function (data) {
          console.log(data);
        });
      });
    }
    return () => {
      peer.off('connection');
    };
  }, [peer]);

  return { peer, connect, create, call };
};
