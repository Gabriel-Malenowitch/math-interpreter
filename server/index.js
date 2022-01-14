/* eslint-disable linebreak-style */
const express = require('express');
const Calc = require('./src/Objects/Calc.js');

const app = express();

// Ao chegar qualquer URL =>
app.get('*', (req, res)=>{
  const regExRemoveFirst = /.(.*)/;
  const regExIsReallyJustANumber = /(^(\+|\-)?[0-9]+$)/;

  const expression = req.url.replace(regExRemoveFirst, '$1');
  console.log(expression);
  if (String(expression) != '') {
    // Inicialização de um novo cálculo
    const calc = new Calc();

    // Setando expressão
    calc.set(expression);

    if (regExIsReallyJustANumber.test(expression)) {
      res.type('txt').send(String('Olá : ) -> ' + expression));
    } else {
      if (/[a-z]/.test(expression)) {
        // eslint-disable-next-line max-len
        res.type('txt').send('Olá : ) -> Não é um número ou uma expressão válida');
      } else {
        // Resolvendo o exercício
        calc.solve();

        // Pegando a expressão resolvida
        const result = calc.getToFixedResult();

        //   Retornando a resposta
        res.type('txt').send(result);
      }
    }
  } else {
    res.type('txt').send('Olá : ) -> digite a expressão ali na url');
  }
  console.log(`||${expression + Number(expression)}||`);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log(`Servidor rodando na porta ${PORT}`);
});
