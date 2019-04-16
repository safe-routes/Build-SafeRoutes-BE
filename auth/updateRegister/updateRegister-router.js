const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../users/users-model.js');

router.put('/', async (req, res) => {
  let user = req.body;
  const { username, newUsername } = user;
  res.status(200).send('working');
  // try {
  //   const updatedUser = await Users.updateUser(newUsername);
  //   if () {

  //   }
  // } catch (error) {

  // }
});

module.exports = router;
