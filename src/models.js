const mongoose = require('mongoose');

// Definindo o schema do carro
const CarroSchema = new mongoose.Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    ano: { type: Number, required: true }
});

// Criando o modelo do carro
const Carro = mongoose.model('Carro', CarroSchema);

module.exports = Carro;