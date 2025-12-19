
import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list" style={{
      height: '400px',
      overflowY: 'auto',
      border: '1px solid #ccc',
      padding: '10px',
      marginBottom: '10px',
      backgroundColor: '#f9f9f9'
    }}>
      {messages.length === 0 ? (
        <p style={{ color: '#999' }}>No messages yet. Start chatting!</p>
      ) : (
        messages.map((msg, index) => (
          <div 
            key={index} 
            style={{
              marginBottom: '10px',
              padding: '8px',
              backgroundColor: '#fff',
              borderRadius: '5px',
              borderLeft: '3px solid #007bff'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ color: '#007bff' }}>{msg.username}</strong>
              <small style={{ color: '#999' }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </small>
            </div>
            <p style={{ margin: '5px 0 0 0' }}>{msg.text}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
