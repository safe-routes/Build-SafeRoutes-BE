const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// Unprotected routes
server.use('/api/auth', authRouter);

// Protected routes

server.get('/', (req, res) => {
  res.status(200).json({ message: 'success' });
});

module.exports = server;
