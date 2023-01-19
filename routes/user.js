const express = require('express');
const router = express.Router(); // router intégré au framework

// import des controllers
// ils contiennent les méthodes vers lesquelles doivent pointer les requêtes
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');

// routes CRUD disponibles
router.get('/', [auth], userCtrl.getUserList);
router.get('/:id', [auth], userCtrl.getUser);
router.post('/signup', userCtrl.createUser);
router.post('/login', userCtrl.login);
router.put('/:id', [auth], userCtrl.updateUser);
router.delete('/:id', [auth], userCtrl.deleteUser);
router.get('/:id/favorites', [auth], userCtrl.getUserFavorites);
router.post('/:id/favorite', [auth], userCtrl.addFavorite);
router.delete('/:id/favorite', [auth], userCtrl.deleteFavorite);

module.exports = router;