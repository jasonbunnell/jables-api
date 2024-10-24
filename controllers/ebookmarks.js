const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const EventBookmark = require('../models/EventBookmark');
const Event = require('../models/Event');

// @desc    Get event bookmarks
// @route   GET /api/v1/bookmarks
// #route   GET /api/v1/events/:eventId/bookmarks
// @access  Public
exports.getEventBookmarks = asyncHandler(async (req, res, next) => {
    if(req.params.eventId) {
        const ebookmarks = await EventBookmark.find({ event: req.params.eventId });

        return res.status(200).json({
            success: true,
            count: ebookmarks.length,
            data: ebookmarks
        })
    } else {
        res.status(200).json(res.advancedResults);
    }
});