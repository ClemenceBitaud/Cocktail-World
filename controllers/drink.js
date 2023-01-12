const Drink = require("../models/drink");
const {Schema} = require("mongoose");

exports.getDrinks = (req, res, next) => {
    console.log("getDrinks method");

    Drink.find()
        .then((list) => res.status(200).json(list))
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.getDrink = (req, res, next) => {
    console.log("getDrink method");

    Drink.findById(req.params.id)
        .then((obj) => res.status(200).json(obj))
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.createDrink = (req, res, next) => {
    console.log("createDrink method");

    let drink = new Drink({
        name: req.body.name,
        type: req.body.typeId,
        categories: req.body.categoriesId,
        ingredients: req.body.ingredientsId,
        recipe: req.body.recipeId,
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true
    });

    drink
        .populate('type')
        .exec((err, drink) => {
        if (err){console.log(err)}
        console.log(drink.type.name);
    });

    drink
        .populate('categories')
        .exec((err, drink) => {
            if (err){console.log(err)}
            console.log(drink.categories);
        });

    drink
        .populate('ingredients')
        .exec((err, drink) => {
            if (err){console.log(err)}
            console.log(drink.ingredients);
        });

    drink
        .populate('recipe')
        .exec((err, drink) => {
            if (err){console.log(err)}
            console.log(drink.recipe.name);
        });

    drink.save()
        .then((saved) => res.status(200).json(saved))
        .catch(() => res.status(500).json({message: 'Pb avec la création'}));
}

exports.updateDrink = (req, res, next) => {
    console.log("updateDrink method");

    Drink.findById(req.params.id)
        .then((drink) => {
            req.body.modificationDate = new Date();
            Drink.updateOne({ _id: drink.id}, req.body)
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

exports.deleteDrink = (req, res, next) => {
    console.log("deleteDrink method");

    Drink.findByIdAndDelete(req.params.id)
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