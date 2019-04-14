const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

router.post('/register', async (req, res) => {
  let user = req.body;
  const { email, name, username, password } = user;

  if (email && name && username && password) {
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
        const addedUser = await Users.addUser(user);
        res.status(201).json(addedUser);
      } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'User could not be added.' });
      }
    }
  } else {
    res
      .status(422)
      .json({ message: 'Must provide email, name, username, and password' });
  }
});

module.exports = router;

// if (error.errno === 19) {
//   res.status(405).json({
//     // can improve this later with more info (ie if its the username or email that is causing the error)
//     message: 'Someone already has an account with that username or email.'
//   });
// } else {
