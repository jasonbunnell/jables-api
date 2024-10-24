const express = require('express');
const { 
    getEvents,
    getEvent,
    addEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/events');

const Event = require('../models/Event');

// Incude other resource routers
const eventBookmarkRouter = require('./ebookmarks');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:eventId/bookmarks', eventBookmarkRouter);

router.route('/').get(advancedResults(Event, {
    path: 'attraction',
    select: 'name location'
}), getEvents).post(protect, authorize('publisher', 'admin'), addEvent);

router
    .route('/:id')
    .get(getEvent)
    .put(protect, authorize('publisher', 'admin'), updateEvent)
    .delete(protect, authorize('publisher', 'admin'), deleteEvent);

module.exports = router;