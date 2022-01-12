/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */

class Calc {
  solvedExpression = NaN;
  expression;

  regExDissolveIitens = /\(([0-9]|(\-|\+|\\|\*))*\)/g;
  regExFindItensToSort = /((\-|\+)?[0-9]+((\*|\/)-?[0-9]+)+)|(\+?[0-9]+)/g;

  get() {
    return this.expression;
  }
  set(newExpression) {
    this.expression = newExpression;
  }
  getSolved() {
    return this.solvedExpression;
  }

  solve() {
    this.solvedExpression = solveLittleItens(); // OrganizeItens implicito
    // this.solvedExpression = dissolveItens(); // OrganizeItens implicito
    // this.solvedExpression = solveAllItens(); // OrganizeItens implicito
  }

  sortItens() {
    // Declaração de variáveis
    const before = []; const after = [];
    const newExpression = '+'+this.expression;

    // Expressão regular que transforma uma string sem
    // parenteses em uma lista de itens separados pelos
    // operadores que devem ir primeiro
    const separatedItens = newExpression.match(this.regExFindItensToSort);

    // Adição dos itens com o operador "*" ou "/" na
    // lista before, e os outros na after
    separatedItens.forEach((e)=>{
      const regExThereAreOperators = /.*(\*|\/)/;
      const thereAreOperators = regExThereAreOperators.test(e);

      if (thereAreOperators) {
        before.push(e);
      } else {
        after.push(e);
      }
    });

    const finalOrdenedList = [...before, ...after];

    return finalOrdenedList;
  }
}

module.exports = Calc;
