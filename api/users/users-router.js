const router = require('express').Router();
const users = require('../../users/users-model.js');

router.get('/:id', async (req, res) => {
  try {
    const user = await users.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
