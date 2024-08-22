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

const router = express.Router({
    mergeParams: true
});

router.route('/').get(advancedResults(Event, {
    path: 'attraction',
    select: 'name location'
}), getEvents).post(addEvent);
router.route('/:id').get(getEvent).put(updateEvent).delete(deleteEvent);

module.exports = router;