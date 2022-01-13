/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */

class Calc {
  solvedExpression = NaN;
  expression;

  regExDissolveIitens = /\(([0-9]|(\-|\+|\\|\*))*\)/g;
  regExFindItensToSort = /((\-|\+)?[0-9]+((\*|\/)-?[0-9]+)+)|((\+|\-)?[0-9]+)/g;
  regExSeparateItem = /(\/|\*)|((\-|\+)?[0-9]+)/g;

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

  // Ordena os itens em um novo array
  sortItens() {
    if (!this.expression.includes('(')) {
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
        if (e.includes('*') || e.includes('/')) {
          before.push(e);
        } else {
          after.push(e);
        }
      });

      const finalOrdenedList = [...before, ...after];

      return finalOrdenedList;
    } else {
      return this.expression;
    }
  }

  // Dissolve mais ainda os itens em um novo array
  separateItem(finalOrdenedList) {
    const separatedItem = [];

    finalOrdenedList.forEach((item)=>{
      item.match(regExSeparateItem).forEach((e)=>{
        separatedItem.push(e);
      });
    });

    return separatedItem;
  }
}

module.exports = Calc;
