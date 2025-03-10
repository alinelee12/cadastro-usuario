const express = require('express');
const cors = require('cors');
const registrationsRoutes = require('./routes/registrations');

const app = express();
const port = 3002;

app.use(cors());

app.use(express.json());

app.use('/registration', registrationsRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});