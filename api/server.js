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

server.get('/name', callName);

function callName(req, res) {
  // Use child_process.spawn method from
  // child_process module and assign it
  // to variable spawn
  var spawn = require('child_process').spawn;

  // Parameters passed in spawn -
  // 1. type_of_script
  // 2. List containing Path of the script
  //    and arguments for the script

  // E.g.: http://localhost:3000/name?firstname=Mike&lastname=Will
  // So, first name = Mike and last name = Will
  var process = spawn('python', [
    './hello.py',
    req.query.firstname,
    req.query.lastname
  ]);

  // Takes stdout data from script which executed
  // with arguments and send this data to res object
  process.stdout.on('data', function(data) {
    res.send(data.toString());
  });
}

// OPEN routes
server.use('/api/auth/register', registerRouter);
server.use('/api/auth/login', loginRouter);

// RESTRICTED routes
server.use('/api/addresses', authenticate, addressesRouter);

// PYTHON TEST: NOT FOR DEPLOY
// server.use('/api/pythontest', pythonRouter);

module.exports = server;
