const express = require('express');
const router = express.Router(); // router intégré au framework
const auth = require('../middlewares/auth');
const logger = require("../middlewares/logger");
const categoryCtrl = require('../controllers/category');


router.get('/', [auth, logger], categoryCtrl.getCategories);
router.get('/:id', [auth, logger], categoryCtrl.getCategory);
router.post('/', [auth, logger], categoryCtrl.createCategory);
router.put('/:id',[auth, logger], categoryCtrl.updateCategory);
router.delete('/:id', [auth, logger], categoryCtrl.deleteCategory);

module.exports = router;