require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes');

// Criando a aplicação Express
const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('Erro: MONGODB_URI não está definido no arquivo .env');
    process.exit(1);
}

// Middleware para permitir JSON nas requisições
app.use(express.json());

// Definindo um endpoint de prontidão
app.get('/health', (req, res) => res.status(200).send('OK'));

// Função para iniciar o servidor
async function startServer() {
    try {
        console.log('Conectando ao MongoDB...');
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB.');

        // Usando as rotas definidas em routes.js
        app.use('/api', routes);

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error.message);
        process.exit(1); // Encerra o processo em caso de falha
    }
}

// Inicializar o servidor
startServer();