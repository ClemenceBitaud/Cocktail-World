const Ingredient = require('../models/ingredient');

exports.getIngredients = (req, res, next) => {

    Ingredient.find()
        .then((list) => res.status(200).json(list))
        .catch((err) => {
            res.status(404).json({message: 'NOT FOUND', error: err});
        })
}

exports.getIngredient = (req, res, next) => {

    Ingredient.findById(req.params.id)
        .then((obj) => res.status(200).json(obj))
        .catch((err) => {
            res.status(404).json({message: 'NOT FOUND', error: err});
        })
}

exports.createIngredient = (req, res, next) => {

    let ingredient = new Ingredient({
        name: req.body.name,
        quantity: req.body.quantity,
        unit: req.body.unit,
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true
    });

    ingredient.save()
        .then((saved) => res.status(200).json(saved))
        .catch((err) => res.status(500).json({message: 'Pb avec la création', error: err}));

}

exports.updateIngredient = (req, res, next) => {

    Ingredient.findById(req.params.id)
        .then((ing) => {
            req.body.modificationDate = new Date();
            Ingredient.updateOne({ _id: ing.id}, req.body)
                .then((result) => res.status(200).json(result))
                .catch((err) => {
                    res.status(500).json({message: 'CANNOT UPDATE', error: err})
                })
        })
        .catch((err) => {
            res.status(404).json({message: 'NOT FOUND', error: err})
        })

}

exports.deleteIngredient = (req, res, next) => {

    Ingredient.findByIdAndDelete(req.params.id)
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