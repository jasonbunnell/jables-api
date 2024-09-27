const express = require('express');
const { 
    getSongs,
    createSong,
    uploadAudio
} = require('../controllers/songs');

const Song = require('../models/Song');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({
    mergeParams: true
});

router
    .route('/')
    .get(advancedResults(Song, {
        path: 'entertainer',
        select: 'name'
    }), getSongs)
    .post(createSong);

router
    .route('/:songId')
    .post(uploadAudio);

module.exports = router;