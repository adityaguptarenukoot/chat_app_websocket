# backend/app.py
from flask import Flask, request
from flask_cors import CORS
from simple_websocket import Server, ConnectionClosed
import json
from datetime import datetime
import threading

app = Flask(__name__)
CORS(app)


clients = []
clients_lock = threading.Lock()

@app.route('/ws', websocket=True)
def websocket_handler():
    ws = Server.accept(request.environ)
    
    
    with clients_lock:
        clients.append(ws)
    
    print(f" Client connected. Total: {len(clients)}")
    
    try:
       
        while True:
            data = ws.receive(timeout=30)
            if data:
                handle_message(ws, data)
    
    except ConnectionClosed:
        print(" Client disconnected")
    finally:
        
        with clients_lock:
            if ws in clients:
                clients.remove(ws)
        print(f"Total clients: {len(clients)}")
    
    return ''

def handle_message(sender_ws, message):
    """Receive and broadcast messages"""
    print(f" Received: {message}")


# Add to app.py

def handle_message(sender_ws, message):
    print(f" Received: {message}")  # Add this line
    try:
        data = json.loads(message)
        data['timestamp'] = datetime.now().isoformat()
        
        broadcast_message(data)  # Make sure this is called!
        print(f" Broadcasted to {len(clients)} clients")  # Add this
        
    except json.JSONDecodeError:
        print(" Invalid JSON received")
        print("Invalid JSON received")

def broadcast_message(message_data):
    """Send message to all connected clients"""
    message = json.dumps(message_data)
    disconnected_clients = []
    
    with clients_lock:
        for client in clients:
            try:
                client.send(message)
            except ConnectionClosed:
                disconnected_clients.append(client)
    
    # Clean up disconnected clients
    for client in disconnected_clients:
        with clients_lock:
            if client in clients:
                clients.remove(client)

    

if __name__ == '__main__':
    app.run(debug=True, port=5001)
