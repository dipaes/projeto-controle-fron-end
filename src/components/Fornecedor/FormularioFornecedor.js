import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from './../../api/axiosConfig';
import './FormularioFornecedor.css'; // Certifique-se de que o caminho está correto

const FormularioFornecedor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nomeFornecedor, setNomeFornecedor] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch fornecedores quando o componente é montado
  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await api.get('/api/fornecedor');
        console.log('Resposta da API:', response.data); // Log da resposta da API
        setFornecedores(response.data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores', error);
      }
    };
    fetchFornecedores();
  }, []);

  // Fetch fornecedor específico se o ID estiver presente
  useEffect(() => {
    if (id) {
      const fetchFornecedor = async () => {
        try {
          const response = await api.get(`/api/fornecedor/${id}`);
          const fornecedor = response.data;
          setNomeFornecedor(fornecedor.nomeFornecedor);
          setEmail(fornecedor.email);
          setCargo(fornecedor.cargo);
          setNomeEmpresa(fornecedor.nomeEmpresa);
        } catch (error) {
          console.error('Erro ao buscar fornecedor', error);
        }
      };
      fetchFornecedor();
    }
  }, [id]);

  // Handle submit do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fornecedorData = { nomeFornecedor, email, cargo, nomeEmpresa };
    try {
      let response;
      if (id) {
        // Atualizar fornecedor existente
        response = await api.put(`/api/fornecedor/${id}`, fornecedorData);
        // Atualizar o estado dos fornecedores
        setFornecedores(fornecedores.map(f => (f.id === parseInt(id) ? response.data : f)));
      } else {
        // Adicionar novo fornecedor
        response = await api.post('/api/fornecedor', fornecedorData);
        // Adicionar o novo fornecedor ao estado
        setFornecedores([...fornecedores, response.data]);
      }
      console.log('Resposta da API:', response.data); // Log da resposta da API

      // Limpar os campos do formulário
      setNomeFornecedor('');
      setEmail('');
      setCargo('');
      setNomeEmpresa('');

      // Redirecionar para a lista de fornecedores
      navigate('/novo-fornecedor');
    } catch (error) {
      console.error('Erro ao salvar fornecedor', error);
    }
  };

  // Handle delete do fornecedor
  const handleDelete = async () => {
    try {
      await api.delete(`/api/fornecedor/${id}`);
      // Remover o fornecedor do estado
      setFornecedores(fornecedores.filter(f => f.id !== parseInt(id)));
      // Limpar os campos do formulário
      setNomeFornecedor('');
      setEmail('');
      setCargo('');
      setNomeEmpresa('');
      // Redirecionar para a lista de fornecedores
      navigate('/novo-fornecedor');
    } catch (error) {
      console.error('Erro ao deletar fornecedor', error);
    }
  };

  // Handle edit do fornecedor
  const handleEdit = (fornecedor) => {
    setNomeFornecedor(fornecedor.nomeFornecedor);
    setEmail(fornecedor.email);
    setCargo(fornecedor.cargo);
    setNomeEmpresa(fornecedor.nomeEmpresa);
    navigate(`/editar-fornecedor/${fornecedor.id}`);
  };

  // Filtrar fornecedores com base no termo de busca
  const filteredFornecedores = fornecedores.filter(fornecedor =>
    fornecedor.nomeFornecedor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="form-container">
      <h2>{id ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label>Nome do Fornecedor</label>
            <input type="text" value={nomeFornecedor} onChange={(e) => setNomeFornecedor(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label>Cargo</label>
            <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Empresa</label>
            <input type="text" value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)} required />
          </div>
        </div>
        <div className="button-group">
          <button type="submit">{id ? 'Atualizar' : 'Salvar'}</button>
          {id && <button type="button" onClick={handleDelete}>Deletar</button>}
        </div>
      </form>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar fornecedor por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <span role="img" aria-label="search">🔍</span>
        </button>
      </div>

      <div className="table-container">
        <h2>Lista de Fornecedores</h2>
        <table>
          <thead>
            <tr>
              <th>Nome do Fornecedor</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Nome da Empresa</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredFornecedores.map((fornecedor) => (
              <tr key={fornecedor.id}>
                <td>{fornecedor.nomeFornecedor}</td>
                <td>{fornecedor.email}</td>
                <td>{fornecedor.cargo}</td>
                <td>{fornecedor.nomeEmpresa}</td>
                <td>
                  <button onClick={() => handleEdit(fornecedor)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormularioFornecedor;
