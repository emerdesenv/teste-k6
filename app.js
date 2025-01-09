require('dotenv').config();

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json()); // Para processar JSON no corpo das requisições

// Substitua com sua string de conexão
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

(async () => {
    try {
        await client.connect();
        console.log('Conectado ao MongoDB Atlas');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
    }
})();

const db = client.db('<dbname>'); // Substitua pelo nome do seu banco
const collection = db.collection('testCollection'); // Substitua pelo nome da coleção

// Endpoint para inserir dados
app.post('/insert', async (req, res) => {
    try {
        const result = await collection.insertOne(req.body);
        res.status(201).json({ insertedId: result.insertedId });
    } catch (err) {
        console.error('Erro ao inserir registro:', err);
        res.status(500).json({ error: 'Erro ao inserir registro' });
    }
});

// Endpoint para atualizar um usuário por ID
app.put('/update/:id', async (req, res) => {
    const userId = req.params.id; // ID vindo da URL
    const updateData = req.body; // Dados para atualização vindos do corpo da requisição

    try {
        const result = await collection.updateOne(
            { _id: new MongoClient.ObjectId(userId) }, // Filtro para encontrar o documento pelo ID
            { $set: updateData } // Dados a serem atualizados
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).json({ error: 'Erro interno ao atualizar usuário' });
    }
});

// Endpoint para deletar um usuário com base no ID
app.delete('/delete/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
        const result = await collection.deleteOne({ _id: new MongoClient.ObjectId(userId) });

        if(result.deletedCount === 0) {
        return res.status(404).json({ error: 'Teste não encontrado' });
        }

        res.status(200).json({ message: 'Teste deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar o teste:', err);
        res.status(500).json({ error: 'Erro ao deletar o Teste' });
    }
});

// Endpoint para buscar todos os registros
app.get('/find', async (req, res) => {
    try {
        const registros = await collection.find({}).toArray();
        res.status(200).json(registros);
    } catch (err) {
        console.error('Erro ao buscar registros:', err);
        res.status(500).json({ error: 'Erro ao buscar registros' });
    }
});

// Inicie o servidor
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});