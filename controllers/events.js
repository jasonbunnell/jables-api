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
        query = Event.find().populate({
            path: 'attraction',
            select: 'name location'
        });
    }

    const events = await query;

    res.status(200).json({
        success: true,
        count: events.length,
        data: events
    });
});

// @desc    Get single event
// @route   GET /api/v1/events/:id
// @access  Public
exports.getEvent = asyncHandler(async (req, res, next) => {
const event = await Event.findById(req.params.id).populate({
    path: 'attraction',
    select: 'name category'
});

if(!event) {
    return next(new ErrorResponse(`No event with ID of ${req.params.id}`), 404);
}

    res.status(200).json({
        success: true,
        data: event
    });
});