import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

   const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });
      setMessage(response.data.message);
    } catch (error) {
      // A correção está aqui:
      if (error.response) {
        // O servidor respondeu com um status de erro (ex: 401)
        setMessage(error.response.data.message);
      } else {
        // O servidor não respondeu (provavelmente está desligado)
        setMessage('Erro: Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
      }
    }
  };

  return (
    <div className="App">
      <h1>Tela de Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Senha:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;