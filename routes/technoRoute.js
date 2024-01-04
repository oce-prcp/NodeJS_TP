const express = require('express');
const router = express.Router();
const technoController = require('../controllers/technoController');

router.get('/technologies', technoController.getAllTechnologies)
router.post('/addtechno', technoController.addTechnologies)
router.put('/technologies/:id', technoController.idTechnologies)
router.delete('/technologies/:id', technoController.deleteTechnologies)


module.exports = router;