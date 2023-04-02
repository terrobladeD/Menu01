import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';
const WS_URL = 'ws://localhost:8080';

function HomePage() {
  const [messages, setMessages] = useState([]);

  const {
    sendMessage,
    readyState,
  } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage: (event) => {
      const newMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    },
  });

  const handleButtonClick = () => {
    if (readyState === WebSocket.OPEN) {
      sendMessage('Hello, server!');
    } else {
      console.log('WebSocket connection is not open.');
    }
  };

  return (
    <div>
      <div>This is Home page</div>
      <button onClick={handleButtonClick}>Send message to server</button>
      <textarea
        readOnly
        value={messages.join('\n')}
        rows="10"
        cols="50"
        style={{ marginTop: '10px', resize: 'none' }}
      />
    </div>
  );
}

export default HomePage;
