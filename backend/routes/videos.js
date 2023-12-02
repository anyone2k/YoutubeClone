// External imports
const express = require('express');
// Internal imports

const {
    addVideo,
    getAllVideos
} = require('../controllers/videos');

const { protect } = require('../middleware/auth');

const router = express.Router();

router
    .route('/add')
    .post(protect, addVideo);

router
    .route('/showall')
    .get(protect, getAllVideos);

module.exports = router;