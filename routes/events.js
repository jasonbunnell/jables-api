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

const { protect } = require('../middleware/auth');

const router = express.Router({
    mergeParams: true
});

router.route('/').get(advancedResults(Event, {
    path: 'attraction',
    select: 'name location'
}), getEvents).post(protect, addEvent);
router.route('/:id').get(getEvent).put(protect, updateEvent).delete(protect, deleteEvent);

module.exports = router;