const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../users/users-model.js');

router.post('/', async (req, res) => {
  let user = req.body;
  const { email, name, username, password } = user;

  if (!email || !name || !username || !password) {
    res.status(422).json({
      message: 'Must provide email, name, username, and password.'
    });
  } else {
    const usernameAlreadyTaken = await Users.getUserByUsername(username);
    const emailAlreadyTaken = await Users.getUserByEmail(email);

    if (usernameAlreadyTaken && emailAlreadyTaken) {
      res.status(405).json({
        message: 'Username and email are already taken, try another.'
      });
    } else if (usernameAlreadyTaken) {
      res
        .status(405)
        .json({ message: 'Username is already taken, try another.' });
    } else if (emailAlreadyTaken) {
      res.status(405).json({ message: 'Email is already taken, try another.' });
    } else {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      user.password = hashedPassword;
      try {
        const addedUserCount = await Users.addUser(user);
        if (addedUserCount) {
          const newUser = await Users.getUserByEmail(email);
          res.status(201).json(newUser);
        } else res.status(200).json({ message: 'Error adding user.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'User could not be added.' });
      }
    }
  }
});

module.exports = router;
