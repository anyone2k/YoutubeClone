// Internal Imports
const Video = require('../models/Video');
const asyncHandler = require('../middleware/async');

// @desc  Add video
// @route   POST /videos/add
// @access  Registered user only

exports.addVideo = asyncHandler( async (req, res, next) => {

        const { title, description, link } = req.body || {};
        
            const video = new Video({
                title: title,
                description: description,
                url: link,
                userId: req.id
                // Retirez 'user' si vous ne voulez pas enregistrer qui a ajouté la vidéo
            });

            const savedVideo = await video.save();
            
            if(savedVideo){
                res.status(201).json({ 'success' : true, 'msg' : 'Video saved Successfully' });
            }else{
                res.status(400).json({ 'success' : false, 'msg' : 'Video was not saved' });
            }
           



        


    // } catch (error) {
    //     res.status(400).json({ error: error.message });
    // }
});

// @desc  GET all videos
// @route   GET /videos/showall
// @access  Registered user only

exports.getAllVideos = asyncHandler( async (req, res, next) => {

        const videos = await Video.find();
        return res.status(200).json(videos);
    // } catch (error) {
    //     return res.status(500).json({ error: error.message });
    // }
});



