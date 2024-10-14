const ErrorResponse = require('../utils/errorResponse');
const Song = require('../models/Song');
const asyncHandler = require('../middleware/async');
const path = require('path');
const fs = require('fs');
const slugify = require('slugify');

// @desc    Get all songs
// @route   GET /api/v1/songs
// @access  Public
exports.getSongs = asyncHandler(async (req, res, next) => {
    // Check if the request has the entertainer ID
    if (req.params.entertainerId) {
        const songs = await Song.find({
            entertainer: req.params.entertainerId
        });

        return res.status(200).json({
            success: true,
            count: songs.length,
            data: songs
        });
    } else {
        res.status(200).json(res.advancedResults);
    }
});


// @desc    Create a song
// @route   POST /api/v1/entertainers/:entertainerId/songs
// @access  Public
exports.createSong = asyncHandler(async (req, res, next) => {
    // Add the entertainer ID to the request body
    req.body.entertainer = req.params.entertainerId;
    req.body.user = req.user.id;

    const entertainer = await Entertainer.findById(req.params.entertainerId);

    // Check if the entertainer exists
    if(!entertainer) {
        return next(
            new ErrorResponse(`No entertainer with ID of ${req.params.entertainerId}`), 
            404
        );
    }

    // Make sure user is entertainer owner
    if(entertainer.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to add a song to entertainer ${entertainer._id}`, 401));
    }

    // Create the song
    const song = await Song.create(req.body);

    res.status(201).json({
        success: true,
        data: song
    });
});


// @desc    Upload audio file for a song
// @route   PUT /api/v1/entertainers/:entertainerId/songs/:songId/upload
// @access  Public
exports.uploadAudio = asyncHandler(async (req, res, next) => {
    const song = await Song.findById(req.params.songId);

    if (!song) {
        return res.status(404).json({
            success: false,
            message: 'Song not found'
        });
    }

    // Make sure user is event owner
    if(song.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to song ${song._id}`, 401));
    }

    // Handle file upload
    if (req.files && req.files.file) {
        const file = req.files.file;

        // Check if the file is an audio file
        if (!file.mimetype.startsWith('audio')) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an audio file'
            });
        }

        // Create custom filename
        const slug = slugify(song.title, { lower: true });
        const entertainerId = song.entertainer; // Retrieve entertainerId from the song object
        file.name = `${entertainerId}_${slug}${path.parse(file.name).ext}`;
        console.log(`Custom filename: ${file.name}`); // Debugging statement

        // Ensure the songs directory exists
        const songsDir = path.join(__dirname, '../public/songs');
        console.log(`Songs directory: ${songsDir}`); // Debugging statement
        if (!fs.existsSync(songsDir)) {
            fs.mkdirSync(songsDir, { recursive: true });
            console.log(`Created directory: ${songsDir}`); // Debugging statement
        }

        // Move the file to the upload directory
        const uploadPath = path.join(songsDir, file.name);
        console.log(`Upload path: ${uploadPath}`); // Debugging statement
        file.mv(uploadPath, async err => {
            if (err) {
                console.error(`Error moving file: ${err}`); // Debugging statement
                return res.status(500).json({
                    success: false,
                    message: 'Problem with file upload'
                });
            }

            console.log(`File moved to: ${uploadPath}`); // Debugging statement

            // Save the file path to the song document
            song.songFile = `/songs/${file.name}`;
            await song.save();
            console.log(`File path saved to song document: ${song.songFile}`); // Debugging statement

            res.status(200).json({
                success: true,
                data: song
            });
        });
    } else {
        console.log('No file uploaded'); // Debugging statement
        res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
    }
});