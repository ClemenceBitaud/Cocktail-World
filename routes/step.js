const express = require('express');
const router = express.Router(); // router intégré au framework

const stepCtrl = require('../controllers/step');

router.get('/', stepCtrl.getSteps);
router.get('/:id', stepCtrl.getStep);
router.post('/', stepCtrl.createStep);
router.put('/:id', stepCtrl.updateStep);
router.delete('/:id', stepCtrl.deleteStep);

module.exports = router;