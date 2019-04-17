const router = require('express').Router();

const Users = require('../../users/users-model.js');

router.delete('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    const user = await Users.getUserById(id);
    if (user) {
      await Users.removeUser(id);
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'User could not be unregistered' });
  }
});

module.exports = router;
