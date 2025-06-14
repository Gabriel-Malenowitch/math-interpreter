/* eslint-disable linebreak-style */
const Calc = require('../Objects/Calc');


const expressions = [
  '2+2-3',
  '1234-423/13',
  '5432*123-12',
  '-123+9*123',
  '321-(123/345+4324)+4312',
  '321-(123/345+4324)+(43/12)',
  '321-((123/9*99)-(2/3)+45+4324)+4312',
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
      '321-((123/9*99)-(2/3)+45+4324)+4312',
      '123+1321*(32+12-(34*3+21)+89*123)+(321-45)',
    ];

    const calc = new Calc();

    calc.set(item);
    const result = calc.sortItens(item);
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
      '321-((123/9*99)-(2/3)+45+4324)+4312',
      '123+1321*(32+12-(34*3+21)+89*123)+(321-45)',
    ];

    const calc = new Calc();

    calc.set(item);
    const result = calc.separateItem(item);
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
      1,
      1201.462,
      668124,
      984,
      '321-(123/345+4324)+4312',
      '321-(123/345+4324)+(43/12)',
      '321-((123/9*99)-(2/3)+45+4324)+4312',
      '123+1321*(32+12-(34*3+21)+89*123)+(321-45)',
    ];

    const calc = new Calc();

    calc.set(item);
    const result = calc.solveItens(item);
    expect(result).toEqual(answers[key]);
  });
});

expressions.forEach((item, key)=>{
  it(`Resolvendo os itens dentro dos parenteses ${key}`, ()=>{
    /*
    Aqui o objetivo é resolver pequenos itens
    que se encontram no núcleo da expressão.
    (o que envolve organizar e resolver)
    A seguir vou mostrar exemplos, os itens dos
    quais estou falando vão estar envoltos em chaves.

    = 123+213-43(24*123[[[(12+31-123)]]])+9834/123
    = 1321-5234+123*[[[(14213-09)]]]/12323
    = 2340*[[[(5-3*2)]]]+56-59-(900+123/[[[(419-123)]]])
    */


    const answers = [
      1,
      1201.462,
      668124,
      984,
      '321-4324.357+4312',
      '321-4324.357+3.583',
      '321-(1353-0.667+45+4324)+4312',
      '123+1321*(32+12-123+89*123)+276',
    ];

    const calc = new Calc();

    calc.set(item);
    const result = calc.solveInside(item);
    expect(result).toEqual(answers[key]);
  });
});


expressions.forEach((item, key)=>{
  it(`Resolução final dos exercícios ${key}`, ()=>{
    /*
      Resolução final dos exercícios
    */


    const answers = [
      1,
      1201.462,
      668124,
      984,
      308.64300000000003,
      -3999.774,
      -1088.3330000000005,
      14357027,
    ];

    const calc = new Calc();

    calc.set(item);

    calc.solve();

    const result = calc.getResult();

    expect(result).toEqual(answers[key]);
  });
});
