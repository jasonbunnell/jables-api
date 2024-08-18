const ErrorResponse = require('../utils/errorResponse');
const Event = require('../models/Event');
const Attraction = require('../models/Attraction');
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

// @desc    Add event
// @route   POST /api/v1/attractions/:attractionId/events
// @access  Private
exports.addEvent = asyncHandler(async (req, res, next) => {
    req.body.attraction = req.params.attractionId;

    const attraction = await Attraction.findById(req.params.attractionId);
    
    if(!attraction) {
        return next(
            new ErrorResponse(`No attraction with ID of ${req.params.attracionId}`), 
            404
        );
    }

    const event = await Event.create(req.body);
    
        res.status(200).json({
            success: true,
            data: event
        });
    });

// @desc    Update event
// @route   PUT /api/v1/events/:id
// @access  Private
exports.updateEvent = asyncHandler(async (req, res, next) => {
    let event = await Event.findById(req.params.id);
    
    if(!event) {
        return next(
            new ErrorResponse(`No event with ID of ${req.params.id}`), 
            404
        );
    }
    
    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

        res.status(200).json({
            success: true,
            data: event
        });
    });    