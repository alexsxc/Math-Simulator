import React, { useEffect, useMemo, useState } from "react";
import './expression.css';
import './expressionPassive.css';
import { parseExpression } from '../../../parsers';

function ExpressionField({ name, answer, onChangeCorrectState }: { name: string, answer: number, onChangeCorrectState: (isCorrect: boolean) => void }) {
  const [value, setValue] = useState('');
  const [isCorrect, setCorrect] = useState(false);

  // const isCorrect: boolean = useMemo(() => { 
  useEffect(() => {
    const newIsCorrect = answer === Number(value);
    if (isCorrect != newIsCorrect) {
      onChangeCorrectState(newIsCorrect);
      setCorrect(newIsCorrect);
    }
  }, [value, answer]);


  return (
    <input type="text" onChange={(evt) => setValue(evt.target.value)} className={`expression-field  ${isCorrect ? "expression-field--correct" : ""}`} />
  )
};

function ExpressionSign({ sign }: { sign: string }) {
  return (
    <div className="expression-sign">{sign}</div>
  )
};

function ExpressionNumber({ value }: { value: number }) {
  return (
    <div className="expression-number">{value}</div>
  )
};

function ExpressionFraction({ numerator, denominator, onChangeCorrectState }: { numerator: Array<{ type: string, value: any }>, denominator: Array<{ type: string, value: any }>, onChangeCorrectState?: (isCorrect: boolean) => void }) {
  const [correctFields, setCorrectFields] = useState<Record<string, boolean>>({ numerator: false, denominator: false });
  const [isCorrect, setCorrect] = useState(false);

  useEffect(() => {
    const newIsCorrect = Object.values(correctFields).find(it => it == false) == undefined;
    console.log(correctFields);
    if (isCorrect != newIsCorrect) {
      onChangeCorrectState?.(newIsCorrect);
      setCorrect(newIsCorrect);
    }
  }, [correctFields]);
  return (
    <div className="fraction">
      <div className="numerator"><Expression expression={numerator} onChangeCorrectState={(isCorrect) => setCorrectFields(last => ({ ...last, numerator: isCorrect }))} /></div>
      <div className="slash"></div>
      <div className="denominator"><Expression expression={denominator} onChangeCorrectState={(isCorrect) => setCorrectFields(last => ({ ...last, denominator: isCorrect }))} /></div>
    </div>
  )
}

export function Expression({ expression, onChangeCorrectState, isPassive }: { expression: Array<{ type: string, value: any }>, onChangeCorrectState?: (isCorrect: boolean) => void, isPassive?: boolean}) {
  // const expression = '((a * b + c) / 5) * ((d * e + f) / 6)';
  // const expression = 'a * b + c + 5 + d * e + f';
  // const parsedExpression = parseExpression(expression);
  const fields: Record<string, boolean> = {};
  const iterateExpression = (expression: Array<{ type: string, value: any }>) => {
    expression.forEach((it, index) => {
      if (it.type == 'field') {
        fields[it.value.name] = false;
      } else if (it.type != 'number' && it.type != 'sign') {
        fields[index.toString()] = false;
      }
    })
  }
  iterateExpression(expression);

  const [correctFields, setCorrectFields] = useState<Record<string, boolean>>(fields);
  const [isCorrect, setCorrect] = useState(false);

  // const isCorrect: boolean = useMemo(() => { 
  useEffect(() => {
    const newIsCorrect = Object.values(correctFields).find(it => it == false) == undefined;
    console.log(correctFields);
    if (isCorrect != newIsCorrect) {
      onChangeCorrectState?.(newIsCorrect);
      setCorrect(newIsCorrect);
    }
  }, [correctFields]);

  const hints = [
    {
      text: 'умножаем',
      fields: ['a', 'e']
    }
  ]
  return (
    <div className={`expression-wrapper ${isPassive ? 'expression-passive':''}`}>
      {expression.map((it, index) => {
        if (it.type == 'number') {
          return <ExpressionNumber value={Number(it.value)} />
        } else if (it.type == 'sign') {
          return <ExpressionSign sign={it.value} />
        } else if (it.type == 'field') {
          return <ExpressionField name={it.value.name} answer={it.value.answer} onChangeCorrectState={(isCorrect) => setCorrectFields(last => ({ ...last, [it.value.name]: isCorrect }))} />
        } else if (it.type == 'frac') {
          return <ExpressionFraction numerator={it.value[0]} denominator={it.value[1]} onChangeCorrectState={(isCorrect) => setCorrectFields(last => ({ ...last, [index.toString()]: isCorrect }))} />
        } else {
          throw new Error('Invalid expression!')
        }
      })}
    </div>
  )
}
