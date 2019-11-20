const express = require('express');
const router = express.Router();
import './seedbox.png'

// @route   GET api/data
// @desc    Get All Data
// @access  Public
router.get('/assets/:id', (req, res) => {
  Data.find()
    .then(data => res.json(data));
});

module.exports = router;