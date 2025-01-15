const express = require('express');
const Carro = require('./models');
const router = express.Router();

// Cadastro de carros
router.post('/carros', async (req, res) => {
    try {
        const { marca, modelo, ano } = req.body;

        // Verificação se todos os campos foram preenchidos
        if(!marca || !modelo || !ano) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const duplicado = await Carro.findOne({modelo: modelo})

        if(duplicado) {
            return res.status(409).json({erro: 'O modelo do carro já foi cadastrado.'})
        }

        const carro = new Carro({ marca, modelo, ano });
        await carro.save();

        res.status(201).json(carro);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar o carro' });
    }
});

// Listagem de carros
router.get('/carros', async (req, res) => {
    try {
        const carros = await Carro.find();
        res.json(carros);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar os carros' });
    }
});

// Consulta de carro por ID
router.get('/carros/:id', async (req, res) => {
    try {
        const carro = await Carro.findById(req.params.id);

        if(!carro) {
            return res.status(404).json({ error: 'Carro não encontrado' });
        }

        res.json(carro);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o carro' });
    }
});

// Remoção de carro
router.delete('/carros/:id', async (req, res) => {
    try {
        const carro = await Carro.findByIdAndDelete(req.params.id);

        if(!carro) {
            return res.status(404).json({ error: 'Carro não encontrado' });
        }

        res.status(200).json({ message: 'Carro removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o carro' });
    }
});

module.exports = router;