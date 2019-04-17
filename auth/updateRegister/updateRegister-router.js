const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../users/users-model.js');

router.put('/:id', async (req, res) => {
  const { username, newUsername, password } = req.body;

  try {
    const user = await Users.getUserByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const update = {
        id: req.params.id,
        username: newUsername,
        password: user.password
      };
      try {
        const count = await Users.updateUser(update);
        if (count) {
          const user = await Users.getUserById(req.params.id);
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'User not found.' });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json({ message: 'Incorrect credentials.' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
