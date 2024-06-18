const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add an event title']
    },
    altTitle: {
        type: String
    },
    description: {
        type: String,
        required: [true, 'Please add an event description']
    },
    category: {
        // Array of strings
        type: [String],
        required: true,
        enum: [
            'music',
            'theater',
            'games',
            'sports',
            'nerdy',
            'family',
            'lecture',
            'comedy'
        ]
    },
    startTime: {
        type: Date,
        required: [true, "Please add a start date"]
    },
    endTime: {
        type: Date
    },
    bookmarked: {
        type: [String]
    },
    images: {
        type: String,
        default: 'no-photo.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    source: {
        type: String,
        enum: [
            'direct',
            'plugin',
            'TicketMaster'
        ],
        default: 'direct'
    },
    promoter: {

    }
})