const fs = require('fs').promises;
const path = require('path');
const Registration = require('../models/Registration');

exports.registerUser = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../db.json');
        const data = await fs.readFile(filePath, 'utf8');
        const users = JSON.parse(data);
        console.log(req.body);
        const newUser = Registration.create(
            req.body.name,
            req.body.email,
            req.body.personType,
            req.body.cpf,
            req.body.birthday,
            req.body.cnpj,
            req.body.foundingDate,
            req.body.phone,
            req.body.password
        );

        const validationErrors = Registration.validate(newUser);
        if (validationErrors) {
            return res.status(400).json({ message: 'Dados inválidos', errors: validationErrors });
        }

        if (req.body.personType == 'Pessoa física') {
            newUser.cnpj = '';
            newUser.foundingDate = '';
        } else {
            newUser.cpf = '';
            newUser.birthday = '';
        }

        newUser.id = users.length + 1;
        users.push(newUser);
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error: error.message });
    }
};