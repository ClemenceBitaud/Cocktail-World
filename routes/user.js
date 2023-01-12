const express = require('express');
const router = express.Router(); // router intégré au framework

// import des controllers
// ils contiennent les méthodes vers lesquelles doivent pointer les requêtes
const userCtrl = require('../controllers/user');

// routes CRUD disponibles
router.get('/', userCtrl.getUserList);
router.get('/:id', userCtrl.getUser);
router.post('/signup', userCtrl.createUser);
router.post('/login', userCtrl.login);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);
router.get('/:id/favorites', userCtrl.getUserFavorites);
router.post('/:id/favorite', userCtrl.addFavorite);
router.delete('/:id/favorite', userCtrl.deleteFavorite);

module.exports = router;