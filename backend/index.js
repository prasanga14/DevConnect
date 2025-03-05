import { config } from 'dotenv';
config();

import express from 'express';
import cors from 'cors';
import connectDB from './utils/db.js';
import userRoutes from './routes/userRoutes.js';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes);

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  ); // its type will be map so change to Array from Array.from
};

io.on('connection', (socket) => {
  // console.log(`User connected: ${socket.id}`);
  socket.on('join', ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    // notify to all user for new user joined
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit('joined', {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on('code-change', ({ roomId, code }) => {
    socket.in(roomId).emit('code-change', { code });
  });

  socket.on('sync-code', ({ socketId, code }) => {
    io.to(socketId).emit('code-change', { code });
  });

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit('disconnected', {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

server.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server running at ${process.env.PORT}`);
});
