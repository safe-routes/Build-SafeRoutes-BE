const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const registerRouter = require('../auth/register/register-router.js');
const loginRouter = require('../auth/login/login-router.js');
const addressesRouter = require('../addresses/addresses-router.js');
const pythonRouter = require('../DS-routes/test-route.js');
const { authenticate } = require('../auth/authenticate-middleware.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'success' });
});

server.use('/python', express.static('../DS'));

// OPEN routes
server.use('/api/auth/register', registerRouter);
server.use('/api/auth/login', loginRouter);

// RESTRICTED routes
server.use('/api/addresses', authenticate, addressesRouter);

// PYTHON TEST: NOT FOR DEPLOY
// server.use('/api/pythontest', pythonRouter);

module.exports = server;
