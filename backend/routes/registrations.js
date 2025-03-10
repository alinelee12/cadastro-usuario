const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const registrationController = require('../controllers/registrationController');

router.post('/', registrationController.registerUser);

router.get('/', async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../db.json');
        const data = await fs.readFile(filePath, 'utf8');
        const users = JSON.parse(data);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter registros', error: error.message });
    }
});

module.exports = router;