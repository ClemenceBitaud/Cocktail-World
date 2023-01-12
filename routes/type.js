const express = require('express');
const router = express.Router(); // router intégré au framework

const typeCtrl = require('../controllers/type');

router.get('/', typeCtrl.getTypes);
router.get('/:id', typeCtrl.getType);
router.post('/', typeCtrl.createType);
router.put('/:id', typeCtrl.updateType);
router.delete('/:id', typeCtrl.deleteType);

module.exports = router;