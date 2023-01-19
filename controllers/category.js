const Category = require('../models/category');

exports.getCategories = (req, res, next) => {

    Category.find()
        .then((list) => res.status(200).json(list))
        .catch((err) => {
            res.status(404).json({message: 'NOT FOUND', error: err});
        })
}

exports.getCategory = (req, res, next) => {

    Category.findById(req.params.id)
        .then((obj) => res.status(200).json(obj))
        .catch((err) => {
            res.status(404).json({message: 'NOT FOUND', error: err});
        })
}

exports.createCategory = (req, res, next) => {

    let category = new Category({
        name: req.body.name,
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true
    })

    category.save()
        .then((saved) => res.status(200).json(saved))
        .catch((err) => res.status(500).json({message: 'Pb avec la création', error: err}));

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
            res.status(404).json({message: 'NOT FOUND', error: err})
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
            res.status(400).json({message: 'NOT FOUND', error: err})
        })
}