const router = require('express').Router();
const db = require('../data/dbConfig.js');

router.get('/:county', async (req, res) => {
  const COUNTY = req.params.county;

  try {
    const accidents = await db('accidents')
      .select()
      .where({ COUNTY });
    res.status(200).json(accidents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving accidents.' });
  }
});

router.post('/', async (req, res) => {
  const accident = req.body;

  try {
    const response = await db('accidents').insert(accident);
    console.log(response);
    res.status(201).json({ message: 'Accident added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding accidents.' });
  }
});

module.exports = router;
