import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: '32px', // Aumentei o espaçamento
    backgroundColor: '#e3f2fd', // Cor de fundo azul suave
    borderRadius: '16px', // Bordas arredondadas
  },
  infoBox: {
    padding: '24px', // Espaçamento manual
    textAlign: 'center',
    color: '#333', // Ajuste de cor
    backgroundColor: '#ffebee', // Fundo vermelho suave
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', // Sombra para efeito moderno
    borderRadius: '16px', // Bordas mais arredondadas
    marginBottom: '32px', // Espaçamento entre os itens
  },
  button: {
    margin: '16px 8px', // Espaçamento manual
    borderRadius: '8px', // Bordas arredondadas
  },
  header: {
    marginBottom: '64px', // Aumentei o espaçamento inferior
    textAlign: 'center', // Centralizar o texto
    backgroundColor: '#e3f2fd', // Cor de fundo para o título
    padding: '16px 0', // Espaçamento interno
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px', // Espaçamento entre os botões
    marginTop: '42px', // Espaçamento superior
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centralizar os boxes
    marginTop: '80px', // Espaçamento para compensar o título fixo
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleCadastroFornecedor = () => {
    navigate('/novo-fornecedor');
  };

  const handleNovoProjeto = () => {
    navigate('/formulario-principal');
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.header}>
        PROJETOS DASHBOARD!
      </Typography>
      <Box className={classes.content}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box className={classes.infoBox}>
              <Typography variant="h6">Projetos Ativos</Typography>
              <Typography variant="h4">5</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box className={classes.infoBox}>
              <Typography variant="h6">Tarefas Pendentes</Typography>
              <Typography variant="h4">12</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box className={classes.infoBox}>
              <Typography variant="h6">Total de Custos</Typography>
              <Typography variant="h4">R$ 50,000</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box className={classes.infoBox}>
              <Typography variant="h6">Fornecedores</Typography>
              <Typography variant="h4">8</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleNovoProjeto}
          >
            Novo Projeto
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleCadastroFornecedor}
          >
            Novo Fornecedor
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
