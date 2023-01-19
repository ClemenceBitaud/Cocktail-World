const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware qui véfirie que l'utilisateur est bien authentifier pour pouvoir utiliser l'api
module.exports = (req, res, next) => { // next() sert à passer le relai au middleware suivant
    try {
        const email = req.headers.email;
        const token = req.headers.authorization;
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        User.findById(decodeToken.userId)
            .then((user) => {
                if (email === user.email) {
                    next();
                } else {
                    res.status(403).json({message: 'UNAUTHORIZED : WRONG EMAIL'});
                }
            })
            .catch(() => res.status(403).json({message: 'UNAUTHORIZED : USER NOT EXIST'}))
    } catch {
        res.status(403).json({message: 'UNAUTHORIZED'})
    }
};