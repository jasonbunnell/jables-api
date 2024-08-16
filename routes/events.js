const express = require('express');
const { 
    getEvents,
    getEvent,
    addEvent
} = require('../controllers/events');

const router = express.Router({
    mergeParams: true
});

router.route('/').get(getEvents).post(addEvent);
router.route('/:id').get(getEvent);

module.exports = router;