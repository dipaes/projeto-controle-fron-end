import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../styles.css';

const Register = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/register', { usuario, senha });
      console.log('Usuário registrado:', response.data);
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <div className="container">
      <h1>Controle de Projetos <span className="highlight">MAPFRE</span></h1>
      <div className="register-container">
        <h2>Registrar</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit">Registrar</button>
        </form>
        <p>Já tem uma conta? <Link to="/login">Faça login aqui</Link></p>
      </div>
    </div>
  );
};

export default Register;
