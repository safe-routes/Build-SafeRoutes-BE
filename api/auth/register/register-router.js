const router = require('express').Router();
const Users = require('../../../users/users-model.js');

router.post('/', async (req, res) => {
  let user = req.body;
  const { email, name, username, password } = user;

  if (email && name && username && password) {
    try {
      const addedUser = await Users.addUser(user);
      res.status(201).json(addedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'User could not be added.' });
    }
  } else {
    res
      .status(422)
      .json({ message: 'Must provide email, name, username, and password' });
  }
});

module.exports = router;
