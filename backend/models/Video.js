// External imports
const mongoose = require('mongoose');




const VideoSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: {
        type: String
    },
    url: { 
        type: String, 
        required: true 
    }, // URL de la vidéo
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    } // Référence à l'utilisateur qui a posté la vidéo
});




module.exports = mongoose.model('Video', VideoSchema);