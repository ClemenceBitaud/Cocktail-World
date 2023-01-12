const Recipe = require("../models/recipe");
const {Schema} = require("mongoose");

exports.getRecipes = (req, res, next) => {
    console.log("getRecipes method");

    Recipe.find()
        .then((list) => res.status(200).json(list))
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.getRecipe = (req, res, next) => {
    console.log("getRecipe method");

    Recipe.findById(req.params.id)
        .then((obj) => res.status(200).json(obj))
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.createRecipe = (req, res, next) => {
    console.log("createRecipe method");

    let recipe = new Recipe({
        name: req.body.name,
        steps: req.body.stepsId,
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true
    })

    drink
        .populate('steps')
        .exec((err, step) => {
            if (err){console.log(err)}
            console.log(step.steps);
        });

    recipe.save()
        .then((saved) => res.status(200).json(saved))
        .catch(() => res.status(500).json({message: 'Pb avec la création'}));
}

exports.updateRecipe = (req, res, next) => {
    console.log("updateRecipe method");

    Recipe.findById(req.params.id)
        .then((recipe) => {
            req.body.modificationDate = new Date();
            Recipe.updateOne({ _id: recipe.id}, req.body)
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

exports.deleteRecipe = (req, res, next) => {
    console.log("deleteRecipe method");

    Recipe.findByIdAndDelete(req.params.id)
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