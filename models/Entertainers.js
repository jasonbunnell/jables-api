const mongoose = require('mongoose');

const EntertainerSchema = new mongoose.Schema({
    eName: {
        type: String,
        trim: true,
        required: [true, 'Please add an entertainer name']
    },
    description: {
        type: String
    }

})