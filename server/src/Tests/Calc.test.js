/* eslint-disable linebreak-style */
const Calc = require('../Objects/Calc');


const expressions = [
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
