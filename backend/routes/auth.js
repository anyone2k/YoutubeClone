// External imports
const express = require('express');
// Internal imports
const {
    login, 
    signUp,
    logoutUser,
    deleteAccount
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');
    
router
    .route('/login')
    .post(login);

router
    .route('/register')
    .post(signUp);

router
    .route('/logout')
    .post(logoutUser);

router
    .route('/deleteAccount')
    .delete(protect, deleteAccount);


module.exports = router;