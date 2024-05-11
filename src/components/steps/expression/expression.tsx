import React from "react";
import './expression.css';

function ExpressionField({name, answer}:{name: string, answer: number}) {
  return(
    <input type="text" className="expression-field"/>
  )
};

function ExpressionSign({sign}:{sign: string}){
  return (
    <div className="expression-sign">{sign}</div>
  )
};

function ExpressionNumber({value}:{value: number}){
  return (
    <div className="expression-number">{value}</div>
  )
};

function ExpressionFraction({numerator, denominator}:{numerator: string, denominator: string}) {
  return (
    <div className="fraction">
      <div className="numerator"><Expression expression={numerator}/></div>
      <div className="slash"></div>
      <div className="denominator"></div>
    </div>
  )
}

export function Expression({expression}:{expression: string}) {
  // const expression = '((a * b + c) / 5) * ((d * e + f) / 6)';
  // const expression = 'a * b + c + 5 + d * e + f';
  const answers = {
    a: 6,
    b: 5,
    c: 3,
    d: 7,
    e: 6,
    f: 1
  };
  const hints = [
    {
      text: 'умножаем',
      fields: ['a', 'e']
    }
  ] 
  return (
    <div>
      {expression.split(' ').map(it => {
        if(/^-?[0-9]*$/.test(it) ) {
          return <ExpressionNumber value={Number(it)}/>
        } else if (/^[-+*/]$/.test(it)) {
          return <ExpressionSign sign={it}/>
        } else if (/^[a-zA-Z]*$/.test(it)) {
          return <ExpressionField name={it} answer={answers[it as keyof typeof answers]}/>
        } else {
          throw new Error('Invalid expression!')
        }
      })}
    </div>
  )
}
