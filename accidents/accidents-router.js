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

module.exports = router;
