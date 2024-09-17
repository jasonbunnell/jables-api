const express = require('express');
const { 
    getVideos,
    addVideo,
    getLastVideo
} = require('../controllers/videos');

const router = express.Router();

router.route('/').get(getVideos).post(addVideo);

router.route('/last').get(getLastVideo);

module.exports = router;