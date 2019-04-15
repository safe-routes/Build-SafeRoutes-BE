const router = require('express').Router();
const { authenticate } = require('../auth/authenticate-middleware.js');

const Addresses = require('./addresses-model.js');

router.get('/', authenticate, (req, res) => {
  res.status(200).json({
    message: 'success'
  });
});

// router.get('/:id', async (req, res) => {

// });

router.post('/:id', async (req, res) => {
  const { address } = req.body;
  const user_id = req.params.id;

  if (!address || !user_id) {
    res.status(422).json({ message: 'Must provide address and user id.' });
  } else {
    try {
      const addedAddress = await Addresses.addAddressByUserId(user_id, address);
      res.status(201).json(addedAddress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Address could not be added.' });
    }
  }
});

module.exports = router;
