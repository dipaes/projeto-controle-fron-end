import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import FormularioFornecedor from './components/Fornecedor/FormularioFornecedor';
import Dashboard from './components/Dashboard';
import AuthContext from './context/AuthContext';
import './styles.css';

const App = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={auth ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/novo-fornecedor" element={auth ? <FormularioFornecedor /> : <Navigate to="/login" />} />
          <Route path="/editar-fornecedor/:id" element={auth ? <FormularioFornecedor /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        
      </div>
    </Router>
  );
};
export default App;
