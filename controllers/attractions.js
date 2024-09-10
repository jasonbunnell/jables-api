const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const goecoder = require('../utils/geocoder');
const Attraction = require('../models/Attraction');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc    Get all attractions
// @route   GET /api/v1/attractions
// @access  Public
exports.getAttractions = asyncHandler(async (req, res, next) => {
        res.status(200).json(res.advancedResults);
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
        // changing from findByIdAndDelete to findById so middleware runs
        const attraction = await Attraction.findByIdAndDelete(req.params.id);
        if(!attraction) {
            return next(new ErrorResponse(`Attraction not found with id of ${req.params.id}`, 404));
        }

        // added after removing findByIdAndDelete
        // attraction.remove();

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

// @desc    Upload photo
// @route   PUT /api/v1/attractions/:id/photo
// @access  Private
exports.attractionPhotoUpload = asyncHandler(async (req, res, next) => {
    const attraction = await Attraction.findById(req.params.id);

    if(!attraction) {
        return next(new ErrorResponse(`Attraction not found with id of ${req.params.id}`, 404));
    }

    // added after removing findByIdAndDelete
    if(!req.files){
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;

    // Checks file type 
    if(!file.mimetype.startsWith('image')){
        return next(new ErrorResponse(`Please upload an image file`, 400));      
    }

    // Checks file size, set in config
    if(file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Image file size max is ${process.env.MAX_FILE_UPLOAD}`, 400));  
    }

    // Create custom file name
    file.name = `photo_${attraction._id}${path.parse(file.name).ext}`;

    //
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if(err) {
            console.error(err);
            return next(
                new ErrorResponse(`Problem with file upload`, 500));
        }

        await Attraction.findByIdAndUpdate(req.params.id, { photo: file.name });

        res.status(200).json({ 
            success: true, 
            data: file.name
        });
    });

});