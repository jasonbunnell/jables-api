const ErrorResponse = require('../utils/errorResponse');
const Event = require('../models/Event');
const asyncHandler = require('../middleware/async');

// @desc    Get all events
// @route   GET /api/v1/events
// #route   GET /api/v1/attractions/:attractionId/events
// @access  Public
exports.getEvents = asyncHandler(async (req, res, next) => {
    let query;

    if(req.params.attractionId) {
        query = Event.find({ attraction: req.params.attractionId });
    } else {
        query = Event.find();
    }

    const events = await query;

    res.status(200).json({
        success: true,
        count: events.length,
        data: events
    });
})
