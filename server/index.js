const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'Servidor rodando!' });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  
  if (email === 'admin@teste.com' && password === '123456') {
    return res.json({ success: true, message: 'Login bem-sucedido!' });
  } else {
    return res.status(401).json({ success: false, message: 'Email ou senha inválidos.' });
  }
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});

