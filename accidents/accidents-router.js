const router = require('express').Router();
const db = require('../data/dbConfig.js');

router.get('/', async (req, res) => {
  const county = req.body.county;

  try {
    const accidents = await db('accidents')
      .select()
      .where({ county });
    res.status(200).json(accidents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving accidents.' });
  }
});

router.post('/', async (req, res) => {
  const accident = req.body;

  try {
    const { rowCount } = await db('accidents').insert(user);
    res.status(201).json({ message: 'Accident added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding accidents.' });
  }
});

module.exports = router;
