const express = require('express');
const router = express.Router();
const comController = require('../controllers/comoController');

router.get('/technologies/:technologieId/commentaires', comController.techoComment)
router.post('/commentaires', comController.addComment)
router.get('/utilisateurs/:utilisateurId/commentaires', comController.idComment)
router.get('/commentaires/date/:dateLimite', comController.dateComment)
router.put('/techonologies/modif', comController.modifComment)

module.exports = router;