const ErrorResponse = require('../utils/errorResponse');
const Event = require('../models/Event');
const Attraction = require('../models/Attraction');
const asyncHandler = require('../middleware/async');

// @desc    Get all events
// @route   GET /api/v1/events
// #route   GET /api/v1/attractions/:attractionId/events
// @access  Public
exports.getEvents = asyncHandler(async (req, res, next) => {
    if(req.params.attractionId) {
        const events = await Event.find({ attraction: req.params.attractionId });

        return res.status(200).json({
            success: true,
            count: events.length,
            data: events
        })
    } else {
        res.status(200).json(res.advancedResults);
    }
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
    req.body.user = req.user.id;

    const attraction = await Attraction.findById(req.params.attractionId);
    
    if(!attraction) {
        return next(
            new ErrorResponse(`No attraction with ID of ${req.params.attracionId}`), 
            404
        );
    }

    // Make sure user is entertainer owner
    if(attraction.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to add an event to this attraction ${attraction._id}`, 401));
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

    // Make sure user is event owner
    if(event.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update event ${event._id}`, 401));
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
    
// @desc    Delete event
// @route   DELETE /api/v1/events/:id
// @access  Private
exports.deleteEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.id);
    
    if(!event) {
        return next(
            new ErrorResponse(`No event with ID of ${req.params.id}`), 
            404
        );
    }

    // Make sure user is event owner
    if(event.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete event ${event._id}`, 401));
    }
    
    await Event.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: {}
        });
    });   