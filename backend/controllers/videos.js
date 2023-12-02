// Internal Imports
const Video = require('../models/Video');

// @desc  Add video
// @route   GET /videos
// @access  Registered user only

exports.addVideo = async (req, res) => {
    try {
        const video = new Video({
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            user: req.body.name
            // Retirez 'user' si vous ne voulez pas enregistrer qui a ajouté la vidéo
        });

        const savedVideo = await video.save();
        res.status(201).json(savedVideo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// @desc  add friends
// @route   POST /friends/:userid
// @access  Registered user only

exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



