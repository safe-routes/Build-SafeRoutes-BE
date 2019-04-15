const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../../users/users-model.js');
const secret = require('../../api/secrets.js').jwtSecret;

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.getUserByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({
        id: user.id,
        account_created_at: user.created_at,
        message: `Welcome, ${user.username}`,
        token
      });
    } else {
      res.status(401).json({ message: 'Incorrect credentials.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    user: user.username
    // groups: [] TBD
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
