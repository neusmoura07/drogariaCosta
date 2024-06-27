const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    imagem: { type: String, required: true },
    sobre: { type: String, required: true},
    descricao: { type: String, required: true },
    marca: { type: String, required: true },
    preco: { type: Number, required: true },
    categoria: { type: String, required: true },
    subcategorias: { type: [String], required: true },
});

const Produto = mongoose.models.Produto || mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;