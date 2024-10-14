const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add an event title']
    },
    subtitle: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        // Array of strings
        type: [String],
        required: [true, 'Please add a category'],
        enum: [
            'Music',
            'Theater',
            'Games',
            'Sports',
            'Nerdy',
            'Family',
            'Lecture',
            'Musical',
            'Comedy',
            'Food',
            'Drink',
            'Art',
            'Festival',
            'test'
        ]
    },
    awardBadge: {
        type: [String],
        enum: [
            'Promoted',
            'Popular',
            'New',
            'Free',
            'Family'
        ]
    },
    subcategory: {
        // Array of strings
        type: [String],
        enum: [
            'musical',
            'football',
            'baseball'
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
        type: String
    },
    organizer: {
        type: String
    },
    attraction: {
        type: mongoose.Schema.ObjectId,
        ref: 'Attraction',
        required: [true, 'Please add an Attraction as location']
    },
    entertainer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Entertainer'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    bookmarks: {
        type: Number,
        default: 0
    },
    promoted: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Number
    }
});

// Static method to get average number of bookmarks
EventSchema.statics.getAverageBookmark = async function(attractionId){
  const obj = await this.aggregate([
    {
        $match: { attraction: attractionId }
    },
    {
        $group: {
            _id: '$attraction',
            avgBookmarks: { $avg: '$bookmarks' }
        }
    }
  ]);

  try {
    await this.model('Attraction').findByIdAndUpdate(attractionId, {
        avgBookmarks: Math.ceil(obj[0].avgBookmarks / 10) * 10
    })
  } catch (err) {
    console.error(err);
  }
}

// Call getAvgBookmarks after save
EventSchema.post('save', function() {
    this.constructor.getAverageBookmark(this.attraction);
});

// Call getAvgBookmarks before remove
EventSchema.pre('remove', function() {
    this.constructor.getAverageBookmark(this.attraction);
});


module.exports = mongoose.model('Event', EventSchema);