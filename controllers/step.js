const Step = require("../models/step");

exports.getSteps = (req, res, next) => {
    console.log("getSteps method");

    Step.find()
        .then((list) => res.status(200).json(list))
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.getStep = (req, res, next) => {
    console.log("getStep method");

    Step.findById(req.params.id)
        .then((obj) => res.status(200).json(obj))
        .catch((err) => {
            console.log(err);
            res.status(404).json({message: 'NOT FOUND'});
        })
}

exports.createStep = (req, res, next) => {
    console.log("createStep method");

    let step = new Step({
        name: req.body.name,
        text: req.body.text,
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true
    })

    step.save()
        .then((saved) => res.status(200).json(saved))
        .catch(() => res.status(500).json({message: 'Pb avec la création'}));
}

exports.updateStep = (req, res, next) => {
    console.log("updateStep method");

    Step.findById(req.params.id)
        .then((step) => {
            req.body.modificationDate = new Date();
            Step.updateOne({ _id: step.id}, req.body)
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

exports.deleteStep = (req, res, next) => {
    console.log("deleteStep method");

    Step.findByIdAndDelete(req.params.id)
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