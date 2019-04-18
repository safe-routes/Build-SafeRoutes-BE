const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const registerRouter = require('../auth/register/register-router.js');
const unregisterRouter = require('../auth/unregister/unregister-router.js');
const updateUserRouter = require('../auth/updateRegister/updateRegister-router.js');
const loginRouter = require('../auth/login/login-router.js');

const addressesRouter = require('../addresses/addresses-router.js');
const groupsRouter = require('../groups/groups-router.js');
const { authenticate } = require('../auth/authenticate-middleware.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'success' });
});

// OPEN routes
server.use('/api/auth/register', registerRouter);
server.use('/api/auth/login', loginRouter);

// RESTRICTED routes
server.use('/api/addresses', authenticate, addressesRouter);
server.use('/api/user', authenticate, unregisterRouter);
server.use('/api/user', authenticate, updateUserRouter);
server.use('/api/group', authenticate, groupsRouter);

module.exports = server;
