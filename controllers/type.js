const Type = require("../models/type");

exports.getTypes = (req, res, next) => {

    Type.find()
        .then((list) => res.status(200).json(list))
        .catch((err) => {
            res.status(404).json({message: 'NOT FOUND', error: err});
        })
}

exports.getType = (req, res, next) => {

    Type.findById(req.params.id)
        .then((obj) => res.status(200).json(obj))
        .catch((err) => {
            res.status(404).json({message: 'NOT FOUND', error: err});
        })
}

exports.createType = (req, res, next) => {

    let type = new Type({
        name: req.body.name,
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true
    })

    type.save()
        .then((saved) => res.status(200).json(saved))
        .catch((err) => res.status(500).json({message: 'Pb avec la création', error: err}));
}

exports.updateType = (req, res, next) => {

    Type.findById(req.params.id)
        .then((type) => {
            req.body.modificationDate = new Date();
            Type.updateOne({ _id: type.id}, req.body)
                .then((result) => res.status(200).json(result))
                .catch((err) => {
                    res.status(500).json({message: 'CANNOT UPDATE', error: err})
                })
        })
        .catch((err) => {
            res.status(404).json({message: 'NOT FOUND', error: err})
        })
}

exports.deleteType = (req, res, next) => {

    Type.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (result){
                res.status(200).json(result)
            }else{
                res.status(500).json({message: 'ALREADY DELETED'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: 'NOT FOUND', error: err})
        })
}