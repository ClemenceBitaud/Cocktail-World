const express = require('express');
const router = express.Router(); // router intégré au framework
const auth = require('../middlewares/auth');

const typeCtrl = require('../controllers/type');

router.get('/', [auth], typeCtrl.getTypes);
router.get('/:id', [auth], typeCtrl.getType);
router.post('/', [auth], typeCtrl.createType);
router.put('/:id', [auth], typeCtrl.updateType);
router.delete('/:id', [auth], typeCtrl.deleteType);

module.exports = router;