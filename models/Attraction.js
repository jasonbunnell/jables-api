const mongoose = require('mongoose');

const AttractionSchema = new mongoose.Schema({
    aName: {
        type: String,
        required: [true, 'Please add an Attraction name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    website: {
        type: String,
        match: [
            // eslint-disable-next-line no-useless-escape
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number cannot be longer than 20 characters']
    },
    email: {
        type: String,
        match: [
            // eslint-disable-next-line no-useless-escape
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please use a valid email address'
        ]
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point'],
            required: false
        },
        coordinates: {
            type: [Number],
            required: false,
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    category: {
        // Array of strings
        type: [String],
        required: true,
        enum: [
            'winery',
            'brewery',
            'cidery',
            'distillery',
            'restaurant',
            'museum',
            'casino',
            'theater',
            'music venue',
            'farm',
            'park',
            'golf course'
        ]
    },
    lake:{
        // Array of strings
        type: String,
        required: true,
        enum: [
            'Seneca',
            'Cayuga',
            'Keuka',
            'Canandaigua',
            'Conesus',
            'Otisco',
            'Skaneateles',
            'Owasco',
            'Hemlock',
            'Honeoye',
            'Canadice',
            'Silver',
            'none'
        ]
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Attraction', AttractionSchema);