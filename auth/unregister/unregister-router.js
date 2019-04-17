const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../users/users-model.js');

router.delete('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    await Users.removeUser(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'User could not be unregistered' });
  }
});

module.exports = router;
