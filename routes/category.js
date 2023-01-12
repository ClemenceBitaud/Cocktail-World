const express = require('express');
const router = express.Router(); // router intégré au framework

const categoryCtrl = require('../controllers/category');

router.get('/', categoryCtrl.getCategories);
router.get('/:id', categoryCtrl.getCategory);
router.post('/', categoryCtrl.createCategory);
router.put('/:id', categoryCtrl.updateCategory);
router.delete('/:id', categoryCtrl.deleteCategory);

module.exports = router;