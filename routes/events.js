const express = require('express');
const { 
    getEvents,
    getEvent,
    addEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/events');

const Event = require('../models/Event');

const advancedResults = require('../middleware/advancedResults');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router({
    mergeParams: true
});

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