const express = require('express');
const { 
    getEvents,
    getEvent
} = require('../controllers/events');

const router = express.Router({
    mergeParams: true
});

router.route('/').get(getEvents);
router.route('/:id').get(getEvent);

module.exports = router;