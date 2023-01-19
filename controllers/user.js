const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUserList = (req, res, next) => {

    User.find()
        .then((list) => res.status(200).json(list))
        .catch((err) => {
            res.status(404).json({message: 'NOT FOUND', error: err});
        })
}

exports.getUser = (req, res, next) => {

    User.findById(req.params.id)
        .populate('favorites')
        .exec((err, user) => {
            if (err){res.status(404).json({message: 'NOT FOUND', error: err})}
            res.status(200).json(user)
        })
}

exports.createUser = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            let user = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                favorites: [],
                creationDate: new Date(),
                modificationDate: new Date(),
                active: true
            });

            user.save()
                .then((saved) => res.status(200).json(saved))
                .catch((err) => res.status(500).json({message: 'Pb avec la creation', error: err}))
        })
        .catch((err) => res.status(500).json({message: 'Pb avec le chiffrement', error: err}))

}

exports.login = (req, res, next) => {

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                res.status(404).json({message: 'USER RESULT NULL'})
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            res.status(500).json({message: 'COMPARISON FAILED'})
                        } else {
                            const token = jwt.sign({userId: user._id},'RANDOM_TOKEN_SECRET', { expiresIn: '24h'});
                            user.password = '';
                            res.status(200).json({
                                token: token,
                                user: user
                            })
                        }
                    })
                    .catch((err) => res.status(500).json({message: 'COMPARISON FAILED', error: err}))
            }
        })
        .catch((err) => res.status(404).json({message: 'NOT FOUND', error: err}))

}

exports.updateUser = (req, res, next) => {

    User.findById(req.params.id)
        .then((obj) => {
            req.body.modificationDate = new Date();
            User.updateOne({ _id: obj.id}, req.body)
                .then((result) => res.status(200).json(result))
                .catch((err) => res.status(500).json({message: 'CANNOT UPDATE', error: err}))
        })
        .catch((err) => res.status(404).json({message: 'NOT FOUND', error: err}))
}

exports.deleteUser = (req, res, next) => {

    User.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(500).json({message: 'ALREADY DELETED'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: 'NOT FOUND', error: err})
        })
}

exports.addFavorite = (req, res, next) => {

    User.findById(req.params.id)
        .then((user) => {

            const favorites = user.favorites;
            favorites.push(req.body.drinkId);

            User.updateOne({ _id: user.id}, {favorites: favorites})
                .then((result) => res.status(200).json(result))
                .catch((err) => res.status(500).json({message: 'CANNOT UPDATE', error: err}))
        })
        .catch((err) => {
            res.status(404).json({message: 'NOT FOUND', error: err});
        })
}

exports.deleteFavorite = (req, res, next) => {

    User.findById(req.params.id)
        .populate('favorites')
        .exec((err, user) => {
            if (err){res.status(404).json({message: 'NOT FOUND', error: err})}

            const favorites = user.favorites.filter(cocktail => cocktail.id !== req.params.idDrink);

            User.updateOne({ _id: user.id}, {favorites: favorites})
                .then((result) => res.status(200).json(result))
                .catch((err) => res.status(500).json({message: 'CANNOT UPDATE', error: err}))
        })
}