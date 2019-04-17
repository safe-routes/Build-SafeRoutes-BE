const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../users/users-model.js');

// router.delete('/:id', async (req, res) => {
//   let id = req.params.id;
//   try {
//     await Users.removeUser(id);
//     res.status(204).end();
//   } catch (error) {
//     res.status(500).json({ message: 'User could not be unregistered' });
//   }
// });

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const { username, password } = req.body;

  try {
    const user = await Users.getUserByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      try {
        await Users.removeUser(id);
        res.status(204).end();
      } catch (error) {
        res.status(404).json({ message: 'User not found.' });
      }
    } else {
      res.status(500).json({ message: 'Invalid credentials.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'User could not be deleted.' });
  }
});

module.exports = router;
