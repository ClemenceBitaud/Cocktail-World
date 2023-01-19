const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {logs} = require("../log");

exports.getUserList = (req, res, next) => {
    logs.debug("getUserList");
    User.find()
        .then((list) => res.status(200).json(list))
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.getUser = (req, res, next) => {
    logs.debug("getUser");
    if (req.params.id === undefined){
        logs.debug('getUser - missing id params');
    }
    User.findById(req.params.id)
        .then((user) => res.status(200).json(user))
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.createUser = (req, res, next) => {
    logs.debug('createUser');

    if (req.body.email === undefined){
        logs.debug('createUser - email undefined');
    }
    if (req.body.password === undefined){
        logs.debug('createUser - password undefined');
    }
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
                .catch(() => res.status(500).json({message: 'API REST ERROR: Pb avec la creation'}))
        })
        .catch(() => res.status(500).json({message: 'API REST ERROR: Pb avec le chiffrement'}))

}

exports.login = (req, res, next) => {
    logs.debug("login");
    if (req.body.email === undefined){
        logs.debug('login - email undefined');
    }
    if (req.body.password === undefined){
        logs.debug('login - password undefined');
    }

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                res.status(404).json({message: 'USER RESULT NULL'})
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            res.status(500).json({message: 'API REST ERROR: COMPARISON FAILED'})
                        } else {
                            const token = jwt.sign({userId: user._id},'RANDOM_TOKEN_SECRET', { expiresIn: '24h'});
                            user.password = '';
                            res.status(200).json({
                                token: token,
                                user: user
                            })
                        }
                    })
                    .catch((err) => res.status(500).json({message: 'API REST ERROR: COMPARISON FAILED'}))
            }
        })
        .catch(() => res.status(404).json({message: 'NOT FOUND'}))

}

exports.updateUser = (req, res, next) => {
    logs.debug("updateUser");
    if (req.params.id === undefined){
        logs.debug('updateUser - missing id params');
    }
    User.findById(req.params.id)
        .then((obj) => {
            req.body.modificationDate = new Date();
            User.updateOne({ _id: obj.id}, req.body)
                .then((result) => res.status(200).json(result))
                .catch((err) => res.status(500).json({message: 'CANNOT UPDATE', error: err}))
        })
        .catch(() => res.status(404).json({message: 'NOT FOUND'}))
}

exports.deleteUser = (req, res, next) => {
    logs.debug("deleteUser");
    if (req.params.id === undefined){
        logs.debug('deleteUser - missing id params');
    }

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

exports.getUserFavorites = (req, res, next) => {

}

exports.addFavorite = (req, res, next) => {

}

exports.deleteFavorite = (req, res, next) => {

}