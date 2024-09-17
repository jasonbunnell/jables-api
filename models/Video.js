const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a video title']
    },
    link: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}); 

module.exports = mongoose.model('Video', VideoSchema);