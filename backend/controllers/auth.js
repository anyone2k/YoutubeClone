// External imports
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Internal Imports
const User = require('../models/User');
const SECRET_KEY = process.env.SECRET_KEY;

// @desc  create login  
// @route   post /auth/login
// @access  public
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ error: 'Utilisateur non trouvé' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send({ error: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '30d' });
        res.send({ token });
    } catch (err) {
        res.status(400).send({ error: 'Échec de la connexion' });
    }
};

// @desc  create register  
// @route   post /auth/register
// @access  public


exports.signUp = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ name: req.body.name, email: req.body.email, password: hashedPassword });
        await user.save();
        res.status(201).send({ message: 'Utilisateur créé avec succès' });
    } catch (err) {
        res.status(400).send({
            error: "Échec de la création de l'utilisateur"
        });
    }
};

// @desc  delete account 
// @route   post /auth/deleteAccount
// @access  user Bound

exports.deleteAccount = async (req, res) => {
    try {
        const authorizationHeader = req.header('Authorization');

        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        const token = authorizationHeader.replace('Bearer ', '');

        // Gestion d'erreurs JWT
        let decoded;
        try {
            decoded = jwt.verify(token, SECRET_KEY);
        } catch (err) {
            console.log("Erreur lors de la vérification du token:", err);
            return res.status(401).json({ error: 'Token invalide' });
        }
        const userId = decoded.id;
        console.log("ID de l'utilisateur décodé:", userId);

        // Récupération et vérification de l'utilisateur
        const user = await User.findById(userId);
        console.log("Utilisateur trouvé:", user);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Vérification du mot de passe
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Mot de passe incorrect.' });
        }

        // Suppression de l'utilisateur
        await User.findByIdAndDelete(userId);
        console.log("Utilisateur supprimé avec succès.");

        res.status(200).json({ message: 'Compte supprimé avec succès.' });
    } catch (error) {
        console.log("Erreur lors de la suppression du compte:", error);
        res.status(500).json({ error: 'Erreur lors de la suppression du compte.' });
    }

};

