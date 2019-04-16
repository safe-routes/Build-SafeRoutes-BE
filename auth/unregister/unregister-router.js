const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../users/users-model.js');

router.delete('/', async (req, res) => {
  let user = req.body;
  const { username, password } = user;

  try {
    const user = await Users.getUserByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const deletedUserCount = await Users.removeUser(username);
      if (deletedUserCount) {
        res.status(204).end();
      } else res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'User could not be unregistered' });
  }
});

module.exports = router;
