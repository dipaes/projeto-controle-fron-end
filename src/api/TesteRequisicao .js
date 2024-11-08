import React, { useEffect } from 'react';
import api from './axiosConfig';

const TesteRequisicao = () => {
  useEffect(() => {
    api.get('/api/fornecedor')
      .then(response => {
        console.log('Resposta da API:', response.data);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  }, []);

  return (
    <div>
      <h2>Teste de Requisição</h2>
    </div>
  );
};

export default TesteRequisicao;
