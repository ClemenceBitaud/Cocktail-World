const Category = require('../models/category');

exports.getCategories = (req, res, next) => {
    console.log("getCategories method");

    Category.find()
        .then((list) => res.status(200).json(list))
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.getCategory = (req, res, next) => {
    console.log("getCategory method");

    Category.findById(req.params.id)
        .then((obj) => res.status(200).json(obj))
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.createCategory = (req, res, next) => {
    console.log("createCategory method");

    let category = new Category({
        name: req.body.name,
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true
    })

    category.save()
        .then((saved) => res.status(200).json(saved))
        .catch(() => res.status(500).json({message: 'Pb avec la création'}));

}

exports.updateCategory = (req, res, next) => {
    console.log("updateCategory method");

    Category.findById(req.params.id)
        .then((cat) => {
            req.body.modificationDate = new Date();
            Category.updateOne({ _id: cat.id}, req.body)
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

exports.deleteCategory = (req, res, next) => {
    console.log("deleteCategory method");

    Category.findByIdAndDelete(req.params.id)
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