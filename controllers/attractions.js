const ErrorResponse = require('../utils/errorResponse');
const goecoder = require('../utils/geocoder');
const Attraction = require('../models/Attraction');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc    Get all attractions
// @route   GET /api/v1/attractions
// @access  Public
exports.getAttractions = asyncHandler(async (req, res, next) => {
        const attractions = await Attraction.find();

        res.status(200).json({ 
            success: true, 
            count: attractions.length, 
            data: attractions 
        });
});

// @desc    Get single attraction
// @route   GET /api/v1/attractions:id
// @access  Public
exports.getAttraction = asyncHandler(async (req, res, next) => {
        const attraction = await Attraction.findById(req.params.id);
        if(!attraction) {
            return next(new ErrorResponse(`Attraction not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({ 
            success: true,
            data: attraction 
        });
});

// @desc    Create new attraction
// @route   POST /api/v1/attractions
// @access  Private
exports.createAttraction = asyncHandler(async (req, res, next) => {
        const attraction = await Attraction.create(req.body);
        res.status(201).json({ 
            success: true, 
            data: attraction 
        });        
});

// @desc    Update attraction
// @route   PUT /api/v1/attractions/:id
// @access  Private
exports.updateAttraction = asyncHandler(async (req, res, next) => {
        const attraction = await Attraction.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    
        if(!attraction) {
            return next(new ErrorResponse(`Attraction not found with id of ${req.params.id}`, 404));
        }
    
        res.status(200).json({ success: true, data: attraction });        
});

// @desc    Delete attraction
// @route   DELETE /api/v1/attractions/:id
// @access  Private
exports.deleteAttraction = asyncHandler(async (req, res, next) => {
        const attraction = await Attraction.findByIdAndDelete(req.params.id);
        if(!attraction) {
            return next(new ErrorResponse(`Attraction not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({ success: true, data: {} });
});

// @desc    Get bootsamps within a radius
// @route   GET /api/v1/attraractions/:zipcode/:distance
// @access  Public
exports.getAttractionsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth radius = 3,963 mi / 6,378.1 kilometers
    const radius = distance / 3963;

    const attractions = await Attraction.find({
        location: { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ]}}
    });

    res.status(200).json({
        success: true,
        count: attractions.length,
        data: attractions
    })
});