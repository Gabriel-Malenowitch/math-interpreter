/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */

class Calc {
  solvedExpression = NaN;
  expression;

  regExDissolveIitens = /\(([0-9]|(\-|\+|\\|\*))*\)/g;
  regExFindItensToSort = /((\-|\+)?[0-9]+((\*|\/)-?[0-9]+)+)|((\+|\-)?[0-9]+)/g;
  regExSeparateItem = /(\/|\*)|((\-|\+)?[0-9]+)/g;
  regExIsANumber = /(\-|\+)?[0-9]+/;
  regExIncludeOperators = /(\/|\*)/;

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
  separateItem() {
    if (!this.expression.includes('(')) {
      const finalOrdenedList = this.sortItens(this.expression);
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
  solveItens() {
    if (!this.expression.includes('(')) {
      const results = [];
      let result = 0;
      const separatedItem = this.separateItem();

      // Passando por cada item da lista de itens separados
      separatedItem.forEach((item, key)=>{
        const lastItem = separatedItem[key-1];
        const nextItem = separatedItem[key+1];

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

      return results;
    } else {
      return this.expression;
    }
  }
}

module.exports = Calc;
