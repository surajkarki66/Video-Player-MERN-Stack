const express = require('express');
const router = express.Router();

const VideoDetails = require('../models/VideoDetails');

router.get('/', (req, res) => {
    VideoDetails
    .find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;