require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes');

// Criando a aplicação Express
const app = express();

const uri = process.env.MONGODB_URI;

// Conectando ao MongoDB
mongoose.connect(uri)
.then(() => {
    console.log('Conectado ao MongoDB');
}).catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
});

// Middleware para permitir JSON nas requisições
app.use(express.json());

// Usando as rotas definidas em routes.js
app.use('/api', routes);

// Iniciando o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});