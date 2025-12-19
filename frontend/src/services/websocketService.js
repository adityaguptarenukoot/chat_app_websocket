// frontend/src/services/websocketService.js
class WebSocketService {
  constructor() {
    this.ws = null;
    this.url = 'ws://localhost:5001/ws';
    this.messageCallback = null;
    this.statusCallback = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('✅ Connected to chat server');
        if (this.statusCallback) {
          this.statusCallback('connected');
        }
        resolve();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (this.messageCallback) {
            this.messageCallback(data);
          }
        } catch (error) {
          console.error('Failed to parse message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        reject(error);
      };

      this.ws.onclose = () => {
        console.log('🔌 Disconnected');
        if (this.statusCallback) {
          this.statusCallback('disconnected');
        }
      };
    });
  }

  sendMessage(username, text) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        username: username,
        text: text
      }));
    } else {
      console.error('WebSocket not connected');
    }
  }

  onMessage(callback) {
    this.messageCallback = callback;
  }

  onStatusChange(callback) {
    this.statusCallback = callback;
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export default new WebSocketService();
