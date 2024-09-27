const express = require('express');
const { 
    getSongs,
    createSong
} = require('../controllers/songs');

const Song = require('../models/Song');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({
    mergeParams: true
});

router.route('/')
    .get(advancedResults(Song, {
        path: 'entertainer',
        select: 'name'
    }), getSongs)
    .post(createSong);

module.exports = router;