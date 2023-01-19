const Drink = require("../models/drink");

exports.getDrinks = (req, res, next) => {

    Drink.find()
        .populate('type')
        .populate('categories')
        .populate('ingredients')
        .exec((err, list) => {
            if (err){res.status(404).json({message: 'NOT FOUND', error: err})}
            res.status(200).json(list);
        })
}

exports.getDrink = (req, res, next) => {

    Drink.findById(req.params.id)
        .populate('type')
        .populate('categories')
        .populate('ingredients')
        .exec((err, d) => {
            if (err){res.status(404).json({message: 'NOT FOUND', error: err})}
            res.status(200).json(d);
        })
}

exports.createDrink = (req, res, next) => {

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
        .catch((err) => res.status(500).json({message: 'Pb avec la création', error: err}));
}

exports.updateDrink = (req, res, next) => {

    Drink.findById(req.params.id)
        .then((drink) => {
            req.body.modificationDate = new Date();
            Drink.updateOne({ _id: drink.id}, req.body)
                .then((result) => res.status(200).json(result))
                .catch((err) => {
                    res.status(500).json({message: 'CANNOT UPDATE', error: err})
                })
        })
        .catch((err) => {
            res.status(404).json({message: 'NOT FOUND', error: err})
        })
}

exports.deleteDrink = (req, res, next) => {

    Drink.findByIdAndDelete(req.params.id)
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

exports.searchDrink = (req, res, next) => {

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
            if (err){res.status(404).json({message: 'NOT FOUND', error: err});}
            res.status(200).json(drinks);
        })

}

exports.searchByType = (req, res, next) => {

    Drink.find({type : req.params.id})
        .populate('type')
        .populate('categories')
        .populate('ingredients')
        .exec((err, list) => {
            if (err){res.status(404).json({message: 'NOT FOUND', error: err});}
            res.status(200).json(list);
        })
}

exports.searchByCategory = (req, res, next) => {

    Drink.find({categories : req.params.id})
        .populate('type')
        .populate('categories')
        .populate('ingredients')
        .exec((err, list) => {
            if (err){res.status(404).json({message: 'NOT FOUND', error: err});}
            res.status(200).json(list);
        })
}

exports.randomDrink = (req, res, next) => {

    Drink.find()
        .populate('type')
        .populate('categories')
        .populate('ingredients')
        .exec((err, list) => {
            if (err){res.status(404).json({message: 'NOT FOUND', error: err});}

            const length = list.length;
            const randomIndex = Math.round(Math.random()*length);

            res.status(200).json(list[randomIndex]);
        })
}