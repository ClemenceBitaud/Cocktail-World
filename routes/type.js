const express = require('express');
const router = express.Router(); // router intégré au framework
const auth = require('../middlewares/auth');

const typeCtrl = require('../controllers/type');
const logger = require("../middlewares/logger");

router.get('/', [auth, logger], typeCtrl.getTypes);
router.get('/:id', [auth, logger], typeCtrl.getType);
router.post('/', [auth, logger], typeCtrl.createType);
router.put('/:id', [auth, logger], typeCtrl.updateType);
router.delete('/:id', [auth, logger], typeCtrl.deleteType);

module.exports = router;