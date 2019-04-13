const router = require('express').Router();
const users = require('../../users/users-model.js');

router.get('/', async (req, res) => {
  try {
    const usersAll = await users.getAll();
    res.status(200).json(usersAll);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
