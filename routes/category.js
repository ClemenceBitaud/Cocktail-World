const express = require('express');
const router = express.Router(); // router intégré au framework
const auth = require('../middlewares/auth');

const categoryCtrl = require('../controllers/category');

router.get('/', [auth], categoryCtrl.getCategories);
router.get('/:id', [auth], categoryCtrl.getCategory);
router.post('/', [auth], categoryCtrl.createCategory);
router.put('/:id',[auth], categoryCtrl.updateCategory);
router.delete('/:id', [auth], categoryCtrl.deleteCategory);

module.exports = router;