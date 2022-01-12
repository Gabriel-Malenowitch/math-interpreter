/* eslint-disable linebreak-style */
const express = require('express');
const Calc = require('./src/Objects/Calc.js');

const app = express();


// Ao chegar qualquer URL =>
app.get('*', (req, res)=>{
  const regExRemoveFirst = /.(.*)/;
  const expression = req.url.replace(regExRemoveFirst, '$1');

  // Inicialização de um novo cálculo
  const calc = new Calc();

  // Setando expressão
  calc.set(expression);

  // Resolvendo o exercício
  calc.solve();

  // Pegando a expressão resolvida
  const solved = calc.getSolved();

  // Retornando a resposta
  res.type('txt').send(solved);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log(`Servidor rodando na porta ${PORT}`);
});
