const express = require('express');
const { 
    getVideos,
    addVideo,
    getLastVideo
} = require('../controllers/videos');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getVideos).post(protect, addVideo);

router.route('/last').get(getLastVideo);

module.exports = router;