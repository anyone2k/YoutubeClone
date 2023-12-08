// External imports
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Internal Imports
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const SECRET_KEY = process.env.SECRET_KEY;

// @desc  create login  
// @route   post /auth/login
// @access  public
exports.login = asyncHandler( async (req, res, next) => {

        const {email, password} = req.body || {};
        
        const user = await User.findOne({ 'email': email });
        
        if (user) {
            const validPassword = bcrypt.compare(password, user.password);
            if (!validPassword) {
            return res
                    .status(401)
                    .send({'success' : false, 'msg' : 'Email or Password incorrect.'});
            }else{
                const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '30d' });
          
                return res
                        .status(200)
                        .send({ 'success' : true, 'Token' : token });
            }
        }else{
            return res
                    .status(401)
                    .send({'success' : false, 'msg' : 'Email or Password incorrect.'});
        }
    // } catch (err) {
    //         res
    //           .status(400)
    //           .send({ 'success' : false, 'msg' : 'Missing or invalide parameters' });
    // }
});

// @desc  create register  
// @route   post /auth/register
// @access  public


exports.signUp = asyncHandler( async (req, res, next) => {

        const {  name ,email, password } = req.body;

        const user = await User.findOne({'email': email});

        if(!user){
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({ 'name': name, 
                                    'email': email, 
                                    'password': hashedPassword
                                });

                await user.save();

            return res.status(201).send({ 'success' : true, message: 'Utilisateur créé avec succès' });
        }else{
            return res.status(409).send({'success' : false, 'msg' : 'User exists already in the database.'});
        }
    // } catch (err) {
    //     return res
    //             .status(400)
    //             .send({'success' : false, 'msg' : 'Problem with entered parameters.'});
    // }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
exports.logoutUser = (req, res) => {
    // res.cookie('jwt', '', {
    //   httpOnly: true,
    //   expires: new Date(0),
    // });
    res.status(200).json({ message: 'Logged out successfully' });
  };
  

// @desc  delete account 
// @route   post /auth/deleteAccount
// @access  user Bound

exports.deleteAccount = asyncHandler( async (req, res, next) => {
  
        // Récupération et vérification de l'utilisateur
         const user = await User.findById(req.id);
         // Vérification du mot de passe
         const validPassword = bcrypt.compare(req.body.password, user.password);
         if (!validPassword) {
             return res.status(400).json({ 'success' : false, 'msg' : 'Mot de passe incorrect.' });
         }

         // Suppression de l'utilisateur
         await User.findByIdAndDelete(req.id);
         console.log("Utilisateur supprimé avec succès.");

        res.status(200).json({ 'success' : true, 'msg' : 'Compte supprimé avec succès.' });
    // } catch (error) {
    //     console.log("Erreur lors de la suppression du compte:", error);
    //     res.status(500).json({ error: 'Erreur lors de la suppression du compte.' });
    // }

});

