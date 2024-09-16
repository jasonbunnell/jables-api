const express = require('express');
const { 
    getSongs
} = require('../controllers/songs');

const Song = require('../models/Song');

const advancedResults = require('../middleware/advancedResults');

const router = express.Router({
    mergeParams: true
});

router.route('/').get(getSongs);
// router.route('/:id').get(getSong).put(updateSong).delete(deleteSong);

module.exports = router;