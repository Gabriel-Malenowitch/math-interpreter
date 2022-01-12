/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */

class Calc {
  solvedExpression = NaN;
  expression;

  regExDissolveIitens = /\(([0-9]|(\-|\+|\\|\*))*\)/g;
  regExSortItens = //

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
    
  }
}

module.exports = Calc;
