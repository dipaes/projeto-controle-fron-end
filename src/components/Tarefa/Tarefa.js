// Tarefa.js
import React from 'react';

const Tarefa = ({ tarefa, index, handleTarefaChange, handleRemoveTarefa }) => {
  return (
    <div className="section">
      <h3>Tarefa {index + 1}</h3>
      <div className="form-row">
        <div className="input-group">
          <label>Nome da Tarefa</label>
          <input type="text" value={tarefa.nomeTarefa} onChange={(e) => handleTarefaChange(index, 'nomeTarefa', e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Descrição</label>
          <textarea value={tarefa.descricaoTarefa} onChange={(e) => handleTarefaChange(index, 'descricaoTarefa', e.target.value)} required />
        </div>
      </div>
      <div className="form-row">
        <div className="input-group">
          <label>Data de Início</label>
          <input type="date" value={tarefa.dtIniTarefa} onChange={(e) => handleTarefaChange(index, 'dtIniTarefa', e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Data de Fim</label>
          <input type="date" value={tarefa.dtFimTarefa} onChange={(e) => handleTarefaChange(index, 'dtFimTarefa', e.target.value)} required />
        </div>
        <div className="input-group small-input">
          <label>Status</label>
          <select value={tarefa.statusTarefa} onChange={(e) => handleTarefaChange(index, 'statusTarefa', e.target.value)} required>
            <option value="A iniciar">A iniciar</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluido">Concluido</option>
          </select>
        </div>
      </div>
      <button type="button" onClick={() => handleRemoveTarefa(index)}>Remover Tarefa</button>
    </div>
  );
};

export default Tarefa;
