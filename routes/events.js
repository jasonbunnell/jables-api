const express = require('express');
const { 
    getEvents
} = require('../controllers/events');

const router = express.Router({
    mergeParams: true
});

router.route('/').get(getEvents);

module.exports = router;