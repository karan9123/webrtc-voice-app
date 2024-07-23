const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();

const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Store users and their selections
const users = new Map();
const userSelections = new Map();

io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    // Handle user joining the lobby
    socket.on('join-lobby', (username) => {
        console.log('User joined lobby:', username);
        users.set(socket.id, username);
        userSelections.set(socket.id, null);
        io.emit('update-user-list', Array.from(users.values()));
    });

    // Handle user selection
    socket.on('select-user', (selectedUsername) => {
        console.log('User selection:', socket.id, selectedUsername);
        const currentUser = users.get(socket.id);
        userSelections.set(socket.id, selectedUsername);

        // Check if there's a match
        for (const [otherId, otherUsername] of users.entries()) {
            if (otherId !== socket.id && otherUsername === selectedUsername) {
                const otherSelection = userSelections.get(otherId);
                if (otherSelection === currentUser) {
                    // Match found, create a room for these two users
                    const roomId = `${socket.id}-${otherId}`;
                    socket.join(roomId);
                    io.sockets.sockets.get(otherId).join(roomId);
                    
                    // Notify both users about the match
                    io.to(roomId).emit('match-found', roomId);
                    console.log('Match found:', roomId);
                    
                    // Remove both users from the lobby
                    users.delete(socket.id);
                    users.delete(otherId);
                    userSelections.delete(socket.id);
                    userSelections.delete(otherId);
                    
                    // Update user list for remaining users
                    io.emit('update-user-list', Array.from(users.values()));
                    return;
                }
            }
        }
    });

    // Handle WebRTC signaling
    socket.on('offer', (offer, roomId) => {
        console.log('Received offer, broadcasting to room:', roomId);
        socket.to(roomId).emit('offer', offer);
    });

    socket.on('answer', (answer, roomId) => {
        console.log('Received answer, broadcasting to room:', roomId);
        socket.to(roomId).emit('answer', answer);
    });

    socket.on('ice-candidate', (candidate, roomId) => {
        console.log('Received ICE candidate, broadcasting to room:', roomId, candidate);
        socket.to(roomId).emit('ice-candidate', candidate);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
        const username = users.get(socket.id);
        users.delete(socket.id);
        userSelections.delete(socket.id);
        io.emit('update-user-list', Array.from(users.values()));
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on port ${port}`));