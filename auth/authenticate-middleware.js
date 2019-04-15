const jwt = require('jsonwebtoken');

const secrets = require('../api/secrets.js');

module.exports = {
  authenticate
};

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (error, decoded) => {
      if (error) return res.status(401).json(error);

      req.decoded = decoded;

      next();
    });
  } else {
    res.status(401).json({ message: 'No token provided.' });
  }
}
