
import React, { useState, useEffect } from 'react';
import websocketService from '../services/websocketService';
import MessageList from '../components/MessageList';
import ChatBox from '../components/ChatBox';

function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
   
    websocketService.onMessage((messageData) => {
      setMessages(prev => [...prev, messageData]);
    });

    
    websocketService.onStatusChange((status) => {
      setIsConnected(status === 'connected');
    });

    
    return () => {
      websocketService.disconnect();
    };
  }, []);

  const handleJoinChat = () => {
    if (username.trim()) {
      websocketService.connect()
        .then(() => {
          setHasJoined(true);
          setIsConnected(true);
        })
        .catch(() => {
          alert('Failed to connect to chat server');
        });
    }
  };

  const handleSendMessage = (text) => {
    websocketService.sendMessage(username, text);
  };

  if (!hasJoined) {
    return (
      <div style={{ 
        maxWidth: '400px', 
        margin: '100px auto', 
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1> Simple Chat App</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '100%',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
        />
        <button
          onClick={handleJoinChat}
          disabled={!username.trim()}
          style={{
            padding: '10px 30px',
            fontSize: '16px',
            backgroundColor: username.trim() ? '#28a745' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: username.trim() ? 'pointer' : 'not-allowed'
          }}
        >
          Join Chat
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <h1> Chat Room</h1>
        <div>
          <span style={{ 
            color: isConnected ? 'green' : 'red',
            fontWeight: 'bold'
          }}>
            {isConnected ? ' Connected' : ' Disconnected'}
          </span>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            Logged in as: <strong>{username}</strong>
          </p>
        </div>
      </div>

      <MessageList messages={messages} />
      <ChatBox onSendMessage={handleSendMessage} isConnected={isConnected} />
    </div>
  );
}

export default Dashboard;
