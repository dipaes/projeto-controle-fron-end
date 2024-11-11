// Custo.js
import React from 'react';

const Custo = ({ custo, index, handleCustoChange, handleRemoveCusto }) => {
  return (
    <div className="section">
      <h3>Custo {index + 1}</h3>
      <div className="form-row">
        <div className="input-group">
          <label>Valor</label>
          <input type="number" value={custo.valorCusto} onChange={(e) => handleCustoChange(index, 'valorCusto', e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Horas Trabalhadas</label>
          <input type="number" value={custo.horasTrabalhadas} onChange={(e) => handleCustoChange(index, 'horasTrabalhadas', e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Centro de Custo</label>
          <input type="text" value={custo.centroCusto} onChange={(e) => handleCustoChange(index, 'centroCusto', e.target.value)} required />
        </div>
      </div>
      <button type="button" onClick={() => handleRemoveCusto(index)}>Remover Custo</button>
    </div>
  );
};

export default Custo;
