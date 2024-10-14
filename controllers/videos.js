const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Video = require('../models/Video');

// @desc    Get all videos
// @route   GET /api/v1/videos
// @access  Public
exports.getVideos = asyncHandler(async (req, res, next) => {
    const videos = await Video.find();
    res.status(200).json(videos);
});

// @desc    Add video
// @route   PUT /api/v1/videos
// @access  Private
exports.addVideo = asyncHandler(async (req, res, next) => {
    const video = await Video.create(req.body);
    
    // Make sure user is admin
    if(req.user.role !== 'admin') {
        return next(
            new ErrorResponse(`User ${req.user.id} is not authorized to add a video`, 401)
        );
    }

    res.status(200).json({
        success: true,
        data: video
    });
});

// @desc    Get last video
// @route   GET /api/v1/videos/last
// @access  Public
exports.getLastVideo = asyncHandler(async (req, res, next) => {
    const video = await Video.findOne().sort({ createdAt: -1 });
    res.status(200).json(video);
});