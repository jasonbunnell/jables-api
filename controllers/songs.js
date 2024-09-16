const ErrorResponse = require('../utils/errorResponse');
const Song = require('../models/Song');
const Entertainer = require('../models/Entertainer');
const asyncHandler = require('../middleware/async');

// @desc    Get all songs
// @route   GET /api/v1/songs
// #route   GET /api/v1/entertainer/:entertainerId/songs
// @access  Public
exports.getSongs = asyncHandler(async (req, res, next) => {
    // res.status(200).json(res.advancedResults(Song));
});