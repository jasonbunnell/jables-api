const express = require('express');
const { 
    getEvents,
    getEvent,
    addEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/events');

const router = express.Router({
    mergeParams: true
});

router.route('/').get(getEvents).post(addEvent);
router.route('/:id').get(getEvent).put(updateEvent).delete(deleteEvent);

module.exports = router;