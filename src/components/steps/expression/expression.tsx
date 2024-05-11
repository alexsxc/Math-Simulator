import React from "react";
import './expression.css';
import {parseExpression} from '../../../parsers';

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
      <div className="denominator"><Expression expression={denominator}/></div>
    </div>
  )
}

export function Expression({expression}:{expression: string}) {
  // const expression = '((a * b + c) / 5) * ((d * e + f) / 6)';
  // const expression = 'a * b + c + 5 + d * e + f';
  const parsedExpression = parseExpression(expression);
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
    <div className="expression-wrapper">
      {parsedExpression.map(it => {
        if(it.type == 'number' ) {
          return <ExpressionNumber value={Number(it.value)}/>
        } else if (it.type == 'sign') {
          return <ExpressionSign sign={it.value}/>
        } else if (it.type == 'field') {
          return <ExpressionField name={it.value} answer={answers[it.value as keyof typeof answers]}/>
        } else if (it.type == 'frac') {
          return <ExpressionFraction numerator={it.value[0]} denominator={it.value[1]}/>
        } else {
          throw new Error('Invalid expression!')
        }
      })}
    </div>
  )
}
