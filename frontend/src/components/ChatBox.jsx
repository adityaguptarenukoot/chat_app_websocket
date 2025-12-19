
import React, { useState } from 'react';

const ChatBox = ({ onSendMessage, isConnected }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && isConnected) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={!isConnected}
        style={{
          flex: 1,
          padding: '10px',
          fontSize: '14px',
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}
      />
      <button
        type="submit"
        disabled={!isConnected || !message.trim()}
        style={{
          padding: '10px 20px',
          backgroundColor: isConnected ? '#007bff' : '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: isConnected ? 'pointer' : 'not-allowed'
        }}
      >
        Send
      </button>
    </form>
  );
};

export default ChatBox;
