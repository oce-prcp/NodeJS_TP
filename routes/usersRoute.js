const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/utilisateurs', middleware.authentificator, usersController.getAllUsers)
router.post('/addusers', usersController.addUsers)
router.put('/utilisateurs/:id', usersController.idUsers)
router.delete('/utilisateurs/:id', usersController.deleteUsers)

router.post('/register', usersController.register);
router.post('/login', usersController.login);

module.exports = router;