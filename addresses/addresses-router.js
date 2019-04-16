const router = require('express').Router();

const Addresses = require('./addresses-model.js');

router.get('/:id', async (req, res) => {
  const user_id = req.params.id;

  try {
    const userAddresses = await Addresses.getAddressesByUserId(user_id);
    if (!userAddresses[0]) {
      res.status(404).json({ message: `User has no addresses saved.` });
    } else {
      res.status(200).json(userAddresses);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Addresses could not be retrieved.' });
  }
});

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

router.delete('/:id', async (req, res) => {
  const { address_id } = req.body;

  try {
    const count = await Addresses.deleteAddressById(address_id);
    if (count) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Address not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Address could not be deleted.' });
  }
});

module.exports = router;
