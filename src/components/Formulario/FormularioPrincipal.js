import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './../../api/axiosConfig';
import './FormularioPrincipal.css'; // Certifique-se de que o caminho está correto

const FormularioPrincipal = () => {
  const navigate = useNavigate();
  const [codigoProjeto, setCodigoProjeto] = useState('');
  const [nomeProj, setNomeProj] = useState('');
  const [descricaoProj, setDescricaoProj] = useState('');
  const [dtIniProj, setDtIniProj] = useState('');
  const [dtFimProj, setDtFimProj] = useState('');
  const [statusProj, setStatusProj] = useState('');
  const [nomeTarefa, setNomeTarefa] = useState('');
  const [descricaoTarefa, setDescricaoTarefa] = useState('');
  const [dtIniTarefa, setDtIniTarefa] = useState('');
  const [dtFimTarefa, setDtFimTarefa] = useState('');
  const [statusTarefa, setStatusTarefa] = useState('');
  const [valorCusto, setValorCusto] = useState('');
  const [horasTrabalhadas, setHorasTrabalhadas] = useState('');
  const [centroCusto, setCentroCusto] = useState('');
  const [fornecedorIds, setFornecedorIds] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  // Fetch fornecedores quando o componente é montado
  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await api.get('/api/fornecedor');
        setFornecedores(response.data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores', error);
      }
    };
    fetchFornecedores();
  }, []);

  // Handle submit do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Criar projeto com fornecedores
      const projetoResponse = await api.post('/api/projetos', {
        codigoProjeto,
        nomeProj,
        descricao: descricaoProj,
        dtIniProj,
        dtFimProj,
        statusProj,
        fornecedores: fornecedorIds.map(id => ({ id })),
      });
      const projetoId = projetoResponse.data.id;

      // Criar tarefa associada ao projeto
      await api.post('/api/tarefas', {
        nomeTarefa,
        descricao: descricaoTarefa,
        dtIniTarefa,
        dtFimTarefa,
        statusTarefa,
        projeto: { id: projetoId },
      });

      // Criar custo associado ao projeto
      await api.post('/api/custos', {
        data: dtIniProj, // Usando a data de início do projeto como exemplo
        valor: valorCusto,
        horasTrabalhadas,
        centroCusto,
        projeto: { id: projetoId },
      });

      console.log('Projeto, tarefa e custo criados com sucesso');

      // Limpar os campos do formulário
      setCodigoProjeto('');
      setNomeProj('');
      setDescricaoProj('');
      setDtIniProj('');
      setDtFimProj('');
      setStatusProj('');
      setNomeTarefa('');
      setDescricaoTarefa('');
      setDtIniTarefa('');
      setDtFimTarefa('');
      setStatusTarefa('');
      setValorCusto('');
      setHorasTrabalhadas('');
      setCentroCusto('');
      setFornecedorIds([]);

      // Redirecionar para a lista de projetos
      navigate('/novo-projeto');
    } catch (error) {
      console.error('Erro ao criar projeto, tarefa ou custo', error);
    }
  };

  // Handle change para seleção de múltiplos fornecedores
  const handleFornecedorChange = (e) => {
    const options = e.target.options;
    const selectedIds = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedIds.push(options[i].value);
      }
    }
    setFornecedorIds(selectedIds);
  };
  return (
    <div className="form-container">
      <h2>Novo Projeto</h2>
      <form onSubmit={handleSubmit}>
        {/* Seção de Informações do Projeto */}
        <div className="section">
          <h3>Dados do Projeto</h3>
          <div className="form-row">
            <div className="input-group">
              <label>Código do Projeto</label>
              <input type="text" value={codigoProjeto} onChange={(e) => setCodigoProjeto(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Nome do Projeto</label>
              <input type="text" value={nomeProj} onChange={(e) => setNomeProj(e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>Descrição</label>
              <textarea value={descricaoProj} onChange={(e) => setDescricaoProj(e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>Data de Início</label>
              <input type="date" value={dtIniProj} onChange={(e) => setDtIniProj(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Data de Fim</label>
              <input type="date" value={dtFimProj} onChange={(e) => setDtFimProj(e.target.value)} required />
            </div>
            <div className="input-group small-input">
              <label>Status</label>
              <select value={statusProj} onChange={(e) => setStatusProj(e.target.value)} required>
                <option value="A Iniciar">A Iniciar</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluido">Concluido</option>
                <option value="Em Atraso">Em Atraso</option>
              </select>
            </div>
          </div>
        </div>

        {/* Seção de Informações da Tarefa */}
        <div className="section">
          <h3>Dados da Tarefa</h3>
          <div className="form-row">
            <div className="input-group">
              <label>Nome da Tarefa</label>
              <input type="text" value={nomeTarefa} onChange={(e) => setNomeTarefa(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Descrição</label>
              <textarea value={descricaoTarefa} onChange={(e) => setDescricaoTarefa(e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label>Data de Início</label>
              <input type="date" value={dtIniTarefa} onChange={(e) => setDtIniTarefa(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Data de Fim</label>
              <input type="date" value={dtFimTarefa} onChange={(e) => setDtFimTarefa(e.target.value)} required />
            </div>
            <div className="input-group small-input">
              <label>Status</label>
              <select value={statusTarefa} onChange={(e) => setStatusTarefa(e.target.value)} required>
                <option value="A Iniciar">A Iniciar</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluido">Concluido</option>
                <option value="Em Atraso">Em Atraso</option>
              </select>
            </div>
          </div>
        </div>

        {/* Seção de Informações do Custo */}
        <div className="section">
          <h3>Dados do Custo</h3>
          <div className="form-row">
            <div className="input-group">
              <label>Valor</label>
              <input type="number" value={valorCusto} onChange={(e) => setValorCusto(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Horas Trabalhadas</label>
              <input type="number" value={horasTrabalhadas} onChange={(e) => setHorasTrabalhadas(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Centro de Custo</label>
              <input type="text" value={centroCusto} onChange={(e) => setCentroCusto(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Fornecedores</label>
              <select value={fornecedorIds} onChange={handleFornecedorChange} required>
                <option value="">Selecione os fornecedores</option>
                {fornecedores.map((fornecedor) => (
                  <option key={fornecedor.id} value={fornecedor.id}>
                    {fornecedor.nomeFornecedor}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Botão de submissão */}
        <div className="button-group">
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default FormularioPrincipal;
