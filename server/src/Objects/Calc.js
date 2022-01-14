/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */

class Calc {
  solvedExpression = NaN;
  expression;

  // regExDissolveIitens = /\(([0-9]|(\-|\+|\\|\*))*\)/g;
  regExDissolveIitens = /\([^\)\(]+\)/g;
  // eslint-disable-next-line max-len
  regExFindItensToSort = /(((\-|\+)?[0-9]+(\.[0-9]+)?((\*|\/)\-?[0-9]+(\.[0-9]+)?)+))|((\+|\-)?[0-9]+(\.[0-9]+)?)/g;
  regExSeparateItem = /(\/|\*)|((\-|\+)?[0-9]+(\.[0-9]+)?)/g;

  regExIsANumber = /(\-|\+)?[0-9]+(\.[0-9]+)?/;
  regExIncludeOperators = /(\/|\*)/;

  getResult() {
    return this.expression;
  }
  getToFixedResult() {
    return Number(this.expression).toFixed(5);
  }
  set(newExpression) {
    this.expression = newExpression;
  }

  solve() {
    let ended = false;
    let cont = 0;
    do {
      if (String(this.expression).includes('(')) {
        this.expression = this.solveInside(this.expression);
      } else {
        this.expression = this.solveItens(this.expression);
        ended = true;
      }

      if (cont >= 15) {
        ended = true;
      }

      cont++;
    } while (!ended);
  }

  // Ordena os itens em um novo array
  sortItens(expression) {
    if (!String(expression).includes('(')) {
    // Declaração de variáveis
      const before = []; const after = [];
      const newExpression = '+'+expression;

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
  separateItem(expression) {
    if (!String(expression).includes('(')) {
      const finalOrdenedList = this.sortItens(expression);
      const separatedItem = [];

      finalOrdenedList.forEach((item)=>{
        item.match(this.regExSeparateItem).forEach((e)=>{
          separatedItem.push(e);
        });
      });

      return separatedItem;
    } else {
      return this.expression;
    }
  }

  // Resolve os itens através de um laço
  solveItens(expression) {
    if (!String(expression).includes('(')) {
      const results = [];
      let result = 0;
      let finalResult = 0;
      const separatedItem = this.separateItem(expression);

      // Passando por cada item da lista de itens separados
      separatedItem.forEach((item, key)=>{
        const lastItem = separatedItem[key-1];
        const nextItem = separatedItem[key+1];
        const nextNextItem = separatedItem[key+2];

        // Aqui é testado se o item atual é diferente de "*" ou "/"
        if (this.regExIncludeOperators.test(item)) {
          // Aqui multiplicamos ou dividimos conforme o result anterior
          switch (item) {
            case '*':
              if (result!=0) {
                result = result * nextItem;
              } else {
                result = lastItem * nextItem;
              }
              break;
            case '/':
              if (result!=0) {
                result = result / nextItem;
              } else {
                result = lastItem / nextItem;
              }
              break;
          }
        }

        // Aqui é testado se o item atual é diferente de "*" ou "/"
        // Aqui também é testado se o item anterior é um número
        // eslint-disable-next-line max-len
        if (this.regExIsANumber.test(lastItem) && !this.regExIncludeOperators.test(item)) {
          // Como a operação complicada acabou, adicionamos o result
          // na lista de resultados
          if (result != 0) {
            if (Number.isInteger(result)) {
              results.push(String(result));
            } else {
              results.push(String(result.toFixed(3)));
            }
          }
          // Resetando o result
          result = 0;
        }

        // Adicionando o primeiro item caso o próximo seja um número
        // Ou seja, caso não esteja em uma operação incluindo "*" ou "/"
        if (lastItem == undefined && this.regExIsANumber.test(nextItem)) {
          results.push(separatedItem[0]);
        }

        // eslint-disable-next-line max-len
        if (nextNextItem == undefined && this.regExIncludeOperators.test(item)) {
          if (Number.isInteger(result)) {
            results.push(String(result));
          } else {
            results.push(String(result.toFixed(3)));
          }
        }

        // eslint-disable-next-line max-len
        if (this.regExIsANumber.test(lastItem) && this.regExIsANumber.test(item)) {
          if (nextItem != undefined) {
            if (this.regExIsANumber.test(nextItem)) {
              results.push(item);
            }
          } else {
            results.push(item);
          }
        }
      });

      results.forEach((n)=>{
        finalResult+=Number(n);
      });

      return finalResult;
    } else {
      return this.expression;
    }
  }

  // Resolve os itens dentro dos parenteses e recoloca eles na string
  solveInside(expression) {
    if (String(expression).includes('(')) {
    // Pegando os itens centrais (Os que ficam no
    // núcleo da expressão)
      let oldResults = expression.match(this.regExDissolveIitens);

      oldResults = oldResults.map((result)=>result.replace(/\((.+)\)/, '$1'));

      // Retorna os itens resolvidos
      const newResults = oldResults.map((item)=>this.solveItens(item));

      oldResults.forEach((item, key)=>{
        const result = newResults[key];
        expression = expression.replace(`(${item})`, result);
      });

      return expression;
    } else {
      return this.solveItens(this.expression);
    }
  }
}

module.exports = Calc;
