const express = require('express');
const router = express.Router(); // router intégré au framework

// import des controllers
// ils contiennent les méthodes vers lesquelles doivent pointer les requêtes
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const logger = require("../middlewares/logger");

// routes CRUD disponibles
router.get('/', [auth, logger], userCtrl.getUserList);
router.get('/:id', [auth, logger], userCtrl.getUser);
router.post('/signup', [logger], userCtrl.createUser);
router.post('/login', [logger], userCtrl.login);
router.put('/:id', [auth, logger], userCtrl.updateUser);
router.delete('/:id', [auth, logger], userCtrl.deleteUser);
router.post('/:id/favorite', [auth, logger], userCtrl.addFavorite);
router.delete('/:id/favorite/:idDrink', [auth, logger], userCtrl.deleteFavorite);

module.exports = router;