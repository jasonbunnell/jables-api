const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Entertainer = require('../models/Entertainer');

// @desc    Get all entertainers
// @route   POST /api/v1/entertainers
// @access  Public
exports.getEntertainers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc    Get single entertainer
// @route   POST /api/v1/entertainers/:id
// @access  Public
exports.getEntertainer = asyncHandler(async (req, res, next) => {
    const enterainer = await Entertainer.findById(req.params.id);
    if(!enterainer) {
        return next(new ErrorResponse(`Entertainer not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ 
        success: true,
        data: enterainer 
    });
});

// @desc    Create new entertainer
// @route   POST /api/v1/entertainers
// @access  Private
exports.createEntertainer = asyncHandler(async (req, res, next) => {
    const entertainer = await Entertainer.create(req.body);
    res.status(201).json({ 
        success: true, 
        data: entertainer 
    });   
});

// @desc    Update entertainer
// @route   PUT /api/v1/entertainers/:id
// @access  Private
exports.updateEntertainer = asyncHandler(async (req, res, next) => {
    const entertainer = await Entertainer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!entertainer) {
        return next(new ErrorResponse(`Entertainer not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: entertainer });  
});

// @desc    Upload photo for entertainer
// @route   PUT /api/v1/entertainers/:id/photo
// @access  Private
exports.entertainerPhotoUpload = asyncHandler(async (req, res, next) => {
    const entertainer = await Entertainer.findById(req.params.id);

    // Check if entertainer exists
    if(!entertainer) {
        return next(
            new ErrorResponse(`Entertainer not found with id of ${req.params.id}`, 404)
        );
    }

    // Check if file was uploaded
    if(!req.files) {
        return next(
            new ErrorResponse(`Please upload a file`, 400)
        );
    }

    const file = req.files.file;

    // Make sure the image is a photo
    if(!file.mimetype.startsWith('image')) {
        return next(
            new ErrorResponse(`Please upload an image file`, 400)
        );
    }

    // Check file size
    if(file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
            new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400)
        );
    }

    // Create custom filename
    file.name = `photo_${entertainer._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if(err) {
            console.error(err);
            return next(
                new ErrorResponse(`Problem with file upload`, 500)
            );
        }

        await Entertainer.findByIdAndUpdate(req.params.id, { photo: file.name });

        res.status(200).json({ 
            success: true, 
            data: file.name 
        });
    });

});

// @desc    Delete entertainer
// @route   DELETE /api/v1/entertainers/:id
// @access  Private
exports.deleteEntertainer = asyncHandler(async (req, res, next) => {
    const entertainer = await User.findById(req.params.id);

    if (!entertainer) {
        return next(
            new ErrorResponse(`Entertainer not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure user is entertainer owner
    if (entertainer.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User ${req.params.id} is not authorized to delete this entertainer`, 401)
        );
    }

    await entertainer.deleteOne();

    res.status(200).json({ success: true, data: {} });
});