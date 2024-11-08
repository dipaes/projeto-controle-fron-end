import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './../../api/axiosConfig';
import AuthContext from '../../context/AuthContext';
import './Login.css'; // Importe o arquivo CSS específico

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/authenticate', { usuario, senha });
      const token = response.data.token;
      localStorage.setItem('token', token); // Armazene o token no localStorage
      setAuth(token);
      console.log('Token armazenado:', token);
      navigate('/dashboard'); // Redireciona para o dashboard após o login
    } catch (error) {
      console.error('Erro ao autenticar:', error);
    }
  };
  

  return (
    <div className="container">
      <h1>Controle de Projetos <span className="highlight">MAPFRE</span></h1>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Entrar</button>
        </form>
        <p>Não tem uma conta? <Link to="/register">Registre-se aqui</Link></p>
      </div>
    </div>
  );
};

export default Login;
