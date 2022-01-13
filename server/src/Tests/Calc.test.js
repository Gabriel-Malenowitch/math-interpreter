/* eslint-disable linebreak-style */
const Calc = require('../Objects/Calc');


const expressions = [
  '2+2-3',
  '1234-423/13',
  '5432*123-12',
  '-123+9*123',
  '321-(123/345+4324)+4312',
  '321-(123/345+4324)+(43/12)',
  '321-((123/9*99)-(2/3)45+4324)+4312',
  '123+1321*(32+12-(34*3+21)+89*123)+(321-45)',
];


expressions.forEach((item, key)=>{
  it(`Alinhando itens ${key}`, ()=>{
    /*
    Aqui o objetivo é alinhar o peso das operações,
    começando com * ou /, e terminando com - ou +
    este "ou" depende da ordem em que a operação estava
    */


    const answers = [
      ['+2', '+2', '-3'],
      ['-423/13', '+1234'],
      ['+5432*123', '-12'],
      ['+9*123', '-123'],
      '321-(123/345+4324)+4312',
      '321-(123/345+4324)+(43/12)',
      '321-((123/9*99)-(2/3)45+4324)+4312',
      '123+1321*(32+12-(34*3+21)+89*123)+(321-45)',
    ];

    const calc = new Calc();

    calc.set(item);
    const result = calc.sortItens();
    expect(result).toEqual(answers[key]);
  });
});

expressions.forEach((item, key)=>{
  it(`Separando itens alinhados ${key}`, ()=>{
    /*
      Aqui o objetivo é dissolver mais ainda os itens, para que seja possível
      passar um foreach neles e resolver um por um
    */


    const answers = [
      ['+2', '+2', '-3'],
      ['-423', '/', '13', '+1234'],
      ['+5432', '*', '123', '-12'],
      ['+9', '*', '123', '-123'],
      '321-(123/345+4324)+4312',
      '321-(123/345+4324)+(43/12)',
      '321-((123/9*99)-(2/3)45+4324)+4312',
      '123+1321*(32+12-(34*3+21)+89*123)+(321-45)',
    ];

    const calc = new Calc();

    calc.set(item);
    const result = calc.separateItem();
    expect(result).toEqual(answers[key]);
  });
});


expressions.forEach((item, key)=>{
  it(`Resolvendo itens separados e alinhados ${key}`, ()=>{
    /*
      Aqui o objetivo é dissolver mais ainda os itens, para que seja possível
      passar um foreach neles e resolver um por um
    */

    const answers = [
      ['+2', '+2', '-3'],
      ['-32.538', '+1234'],
      ['668136', '-12'],
      ['1107', '-123'],
      '321-(123/345+4324)+4312',
      '321-(123/345+4324)+(43/12)',
      '321-((123/9*99)-(2/3)45+4324)+4312',
      '123+1321*(32+12-(34*3+21)+89*123)+(321-45)',
    ];

    const calc = new Calc();

    calc.set(item);
    const result = calc.solveItens();
    expect(result).toEqual(answers[key]);
  });
});

// expressions.forEach((item, key)=>{
//   it(`Resolvendo os itens iniciais ${key}`, ()=>{
//     /*
//     Aqui o objetivo é resolver pequenos itens
//     que se encontram no núcleo da expressão.
//     (o que envolve organizar e resolver)
//     A seguir vou mostrar exemplos, os itens dos
//     quais estou falando vão estar envoltos em chaves.

//     = 123+213-43(24*123[[[(12+31-123)]]])+9834/123
//     = 1321-5234+123*[[[(14213-09)]]]/12323
//     = 2340*[[[(5-3*2)]]]+56-59-(900+123/[[[(419-123)]]])
//     */


//     const answers = [

//     ];

//     const calc = new Calc();


//     calc.set(item);
//     const result = calc.solveLittleItens();
//     expect(result).toBe(answers[key]);
//   });
// });
