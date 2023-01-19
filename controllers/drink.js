const Drink = require("../models/drink");
const {Schema} = require("mongoose");
const {logs} = require("../log");

exports.getDrinks = (req, res, next) => {
    console.log("getDrinks method");

    Drink.find()
        .populate('type')
        .populate('categories')
        .populate('ingredients')
        .exec((err, list) => {
            if (err){res.status(404).json({message: 'NOT FOUND'});}
            res.status(200).json(list);
        })
}

exports.getDrink = (req, res, next) => {
    console.log("getDrink method");

    Drink.findById(req.params.id)
        .populate('type')
        .populate('categories')
        .populate('ingredients')
        .exec((err, d) => {
            if (err){console.log(err)}
            res.status(200).json(d);
        })
}

exports.createDrink = (req, res, next) => {
    console.log("createDrink method");

    let drink = new Drink({
        name: req.body.name,
        type: req.body.typeId,
        categories: req.body.categoriesId,
        ingredients: req.body.ingredientsId,
        recipe: req.body.recipe,
        image: "",
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true
    });

    drink.save()
        .then((saved) => {
            res.status(200).json(saved);
        })
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

exports.searchDrink = (req, res, next) => {
    console.log("searchDrink method");

    const search = req.params.search.toLowerCase().replace(/\s/g,'');

    Drink.find()
        .populate('type')
        .populate('categories')
        .populate('ingredients')
        .exec((err, list) => {

            const drinks = [];

            list.forEach(cocktail => {
                const name = cocktail.name.toLowerCase().replace(/\s/g,'');

                if (name === search){
                    drinks.push(cocktail);
                }

                cocktail.ingredients.forEach(ingredient => {
                    const ingredientName = ingredient.name.toLowerCase().replace(/\s/g,'');

                    if (ingredientName === search){
                        drinks.push(cocktail);
                    }
                })
            })
            if (err){res.status(404).json({message: 'NOT FOUND'});}
            res.status(200).json(drinks);
        })

}

exports.searchByType = (req, res, next) => {
    logs.debug("searchByType");

    Drink.find({type : req.params.id})
        .populate('type')
        .populate('categories')
        .populate('ingredients')
        .exec((err, list) => {
            if (err){res.status(404).json({message: 'NOT FOUND'});}
            res.status(200).json(list);
        })
}

exports.searchByCategory = (req, res, next) => {
    logs.debug("searchByCategory");

    Drink.find({categories : req.params.id})
        .populate('type')
        .populate('categories')
        .populate('ingredients')
        .exec((err, list) => {
            if (err){res.status(404).json({message: 'NOT FOUND'});}
            res.status(200).json(list);
        })
}