const express = require('express');
const { 
    getVideos,
    addVideo,
    getLastVideo
} = require('../controllers/videos');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/').get(getVideos).post(protect, authorize('admin'), addVideo);

router.route('/last').get(getLastVideo);

module.exports = router;