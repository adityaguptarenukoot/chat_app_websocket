WebSocket Chat Application

A simple real-time chat application built using Flask for the backend and React for the frontend, communicating through native WebSockets.

Features:

Real-time messaging between multiple users

Username-based chat system

Message timestamps

Broadcast messages to all connected clients

Tech Stack:
Backend: Python, Flask, simple-websocket, flask-cors
Frontend: React, Vite, native WebSocket API

Project Structure:
The project contains a backend folder with the Flask server and a frontend folder with the React application.

How to Run:
Start the backend by installing dependencies and running python app.py on port 5001.
Start the frontend by running npm install followed by npm run dev.
Open the frontend in the browser and connect to the chat.

How It Works:
The backend exposes a WebSocket endpoint at /ws. It keeps track of connected clients, receives messages, and broadcasts them to all users.
The frontend establishes a WebSocket connection, sends messages, and displays incoming messages with timestamps.

Message Format:
Messages are exchanged in JSON format containing username, text, and timestamp.

WebSocket Endpoint:
ws://localhost:5001/ws

Debugging:
Backend logs show client connections, disconnections, and messages.
Frontend logs can be viewed in the browser console.
WebSocket traffic can be inspected in Chrome DevTools under the Network → WS tab.

Future Improvements:
Authentication, chat rooms, message persistence, private messaging, typing indicators, file sharing, and read receipts.
