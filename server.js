const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Adicione o body-parser
const path = require('path');
const moment = require('moment');
const Produto = require('./public/models/Produto'); // Importando o modelo de Produto

const app = express();
const port = 3000;

// Middleware para analisar application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Adicione este middleware para analisar application/json
// Middleware para servir arquivos estáticos
app.use(express.static('public', { 'extensions': ['html', 'htm', 'js'] }));

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para servir o arquivo register-login.html
app.get('/register-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register-login.html'));
});

// Rota para servir o arquivo carrinho.html
app.get('/carrinho', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'carrinho.html'));
});

// Rota para servir o arquivo category.html
app.get('/category', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'category.html'));
});

// Rota para servir o arquivo product.html
app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

// Rota para servir o arquivo user.html
app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user.html'));
});

// Conectando ao MongoDB
const connect = mongoose.connect('mongodb://localhost:27017/pharmacy');

// Checar se o banco está conectado ou não
connect.then(() => {
    console.log('Banco conectado com sucesso');
}).catch(() => {
    console.log('Banco não está conectado');
});

// Criar um schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    dataNascimento: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    endereco: {
        cep: {
            type: String,
            required: true
        },
        cidade: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        },
        rua: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: true
        },
        complemento: {
            type: String
        },
        bairro: {
            type: String,
            required: true
        }
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('users', LoginSchema);
module.exports = { User };

// Register User
app.post('/register', async (req, res) => {
    const data = {
        name: req.body.username,
        email: req.body.email,
        cpf: req.body.cpf ? req.body.cpf.replace(/\D/g, '') : '',  // Remover formatação do CPF
        dataNascimento: req.body.dataNascimento ? moment(req.body.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : '',
        telefone: req.body.telefone,
        endereco: {
            cep: req.body['endereco.cep'],
            cidade: req.body['endereco.cidade'],
            estado: req.body['endereco.estado'],
            rua: req.body['endereco.rua'],
            numero: req.body['endereco.numero'],
            complemento: req.body['endereco.complemento'],
            bairro: req.body['endereco.bairro']
        },
        password: req.body.password
    };

    // Checar se o usuário já existe pelo CPF
    const existeusuario = await User.findOne({ cpf: data.cpf });
    const existeemail = await User.findOne({ email: data.email });

    if (existeusuario || existeemail) {
        res.send('Usuário já existe. Por favor tente novamente.');
    } else {
        // Criptografar a senha usando bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

        try {
            const newUser = new User(data);
            await newUser.save();
            res.send('Usuário registrado com sucesso!');
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            res.send('Erro ao registrar usuário: ' + error.message);
        }
    }
});

// Login User
app.post('/login', async (req, res) => {
    try {
        const check = await User.findOne({ cpf: req.body.cpf ? req.body.cpf.replace(/\D/g, '') : '' });
        if (!check) {
            return res.send('Usuário não encontrado');
        }

        // Compare a senha criptografada do banco de dados com o texto simples
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            // Envie o arquivo index.html como resposta
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        } else {
            res.send('Senha incorreta'); // Envie a resposta de senha incorreta
        }
    } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        res.send('Detalhes Errados: ' + error.message); // Envie a resposta de detalhes errados com mensagem de erro
    }
});



// Adicionar Produto
app.post('/produtos', async (req, res) => {
    const data = {
        imagem: req.body.imagem,
        descricao: req.body.descricao,
        sobre: req.body.sobre,
        marca: req.body.marca,
        preco: req.body.preco,
        categoria: req.body.categoria,
        subcategorias: req.body.subcategorias.split(',').map(subcat => subcat.trim()), // Tratamento das subcategorias
    };

    try {
        const novoProduto = new Produto(data);
        await novoProduto.save();
        res.status(201).send({ message: 'Produto adicionado com sucesso!' });
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        res.status(500).send({ message: 'Erro ao adicionar produto: ' + error.message });
    }
});

// Buscar Produtos
app.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para buscar produtos filtrados por categoria
app.get('/produtos', async (req, res) => {
    try {
        const { categoria } = req.query;
        let query = {};

        if (categoria) {
            query.categoria = categoria;
        }

        const produtos = await Produto.find(query);
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
