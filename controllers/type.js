const Type = require("../models/type");

exports.getTypes = (req, res, next) => {
    console.log("getTypes method");

    Type.find()
        .then((list) => res.status(200).json(list))
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.getType = (req, res, next) => {
    console.log("getType method");

    Type.findById(req.params.id)
        .then((obj) => res.status(200).json(obj))
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.createType = (req, res, next) => {
    console.log("createType method");

    console.log(req.body);
    let type = new Type({
        name: req.body.name,
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true
    })

    // let type = new Type({
    //     name: "Cocktail",
    //     creationDate: new Date(),
    //     modificationDate: new Date(),
    //     active: true
    // })

    type.save()
        .then((saved) => res.status(200).json(saved))
        .catch(() => res.status(500).json({message: 'Pb avec la création'}));
}

exports.updateType = (req, res, next) => {
    console.log("updateType method");

    Type.findById(req.params.id)
        .then((type) => {
            req.body.modificationDate = new Date();
            Type.updateOne({ _id: type.id}, req.body)
                .then((result) => res.status(200).json(result))
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({message: 'CANNOT UPDATE', error: err})
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'})
        })
}

exports.deleteType = (req, res, next) => {
    console.log("deleteType method");

    Type.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (result){
                res.status(200).json(result)
            }else{
                res.status(500).json({message: 'ALREADY DELETED'})
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({message: 'NOT FOUND', error: err})
        })
}