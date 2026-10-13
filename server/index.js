// Força o uso do Google DNS para resolver o problema de conexão
require('dns').setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://LOGIN:Deusefiel2026@clusterlogin.pxccjx9.mongodb.net/?appName=ClusterLogin')
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
  
// Rota de cadastro
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.json({ success: true, message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Erro ao criar usuário.', error });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ success: true, message: 'Login realizado com sucesso!' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
    }
  } catch (error) {
    console.error('ERRO DETALHADO:', error); // <-- Adicione essa linha
    res.status(400).json({ success: false, message: 'Erro ao criar usuário.', error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});