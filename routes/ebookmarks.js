const express = require('express');
const { 
    getEventBookmarks
} = require('../controllers/ebookmarks');

const EventBookmark = require('../models/EventBookmark');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
    .route('/')
    .get(
        advancedResults(EventBookmark, {
            path: 'event',
            select: 'name'
        }),
        getEventBookmarks
    );

module.exports = router;