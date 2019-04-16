const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../users/users-model.js');

router.put('/:id', async (req, res) => {
  const user = req.body;
  try {
    const count = await Users.updateUser({
      id: req.params.id,
      updatedUser: user
    });
    if (count) {
      const user = await Users.getUserById(req.params.id);
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
