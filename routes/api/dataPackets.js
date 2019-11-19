const express = require('express');
const router = express.Router();

const Data = require('../../models/DataPacket');

// @route   GET api/data
// @desc    Get All Data
// @access  Public
router.get('/', (req, res) => {
  Data.find()
    .then(data => res.json(data));
});

// @route   POST api/data
// @desc    Post Data
// @access  Public
router.post('/', (req, res) => {
  const newData = new Data({
    name: req.body.name,
    info: req.body.info
  });
  newData.save().then(data => res.json(data))
});

// @route   DELETE api/data
// @desc    Delete Data
// @access  Public
router.delete('/:id', (req, res) => {
  Data.findById(req.params.id)
    .then(data => data.remove()
    .then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
})

module.exports = router;