const express = require('express');
const { 
    getSongs,
    createSong,
    uploadAudio
} = require('../controllers/songs');

const Song = require('../models/Song');
const advancedResults = require('../middleware/advancedResults');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router({
    mergeParams: true
});

router
    .route('/')
    .get(advancedResults(Song, {
        path: 'entertainer',
        select: 'name'
    }), getSongs)
    .post(protect, authorize('publisher', 'admin'), createSong);

router
    .route('/:songId')
    .post(protect, authorize('publisher', 'admin'), uploadAudio);

module.exports = router;