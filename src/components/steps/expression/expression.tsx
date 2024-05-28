import React, { useEffect, useMemo, useState } from "react";
import './expression.css';
import './expressionPassive.css';

interface IExpressionFieldProps {
  name: string,
  answer: number,
  onChangeCorrectState: (isCorrect: string, value: string) => void,
  initialValue?: number,
  placeholder?: string
}

export function ExpressionField({ name, answer, onChangeCorrectState, initialValue, placeholder }: IExpressionFieldProps) {
  const [value, setValue] = useState('');
  const [isCorrect, setCorrect] = useState('empty');

  useEffect(() => {
    setValue(initialValue == undefined ? '' : initialValue.toString());
  }, [initialValue]);

  useEffect(() => {
    let newIsCorrect = 'empty';
    if (value !== '' && answer === Number(value)) {
      newIsCorrect = 'correct';
    } else if (value !== '') {

    }
    if (isCorrect != newIsCorrect) {
      onChangeCorrectState(newIsCorrect, value);
      setCorrect(newIsCorrect);
    }
  }, [value, answer]);

  return (
    <div className={`expression-field input-wrapper ${{ 'empty': '', 'correct': "expression-field--correct", 'incorrect': "expression-field--incorrect" }[isCorrect]}`}>
      <input type="text" className={`expression-field  expression-field__transparent`}
        value={value} placeholder={placeholder || ''}
        onChange={(evt) => setValue(evt.target.value)}
        onBlur={() => {
          if (value !== '' && answer != Number(value) && isCorrect != 'incorrect') {
            onChangeCorrectState('incorrect', value);
            setCorrect('incorrect');
          }
        }} />
      <div className="input-placeholder">{(placeholder || '').split('_').join(' ')}</div>
    </div>
  )
};

export function ExpressionFieldDiagonal({ name, answer, onChangeCorrectState }: IExpressionFieldProps) {
  const [value, setValue] = useState('');
  const [isCorrect, setCorrect] = useState('empty');
  const uuid = useMemo(() => {
    return '_' + Date.now() + name + Math.random();
  }, []);

  useEffect(() => {
    let newIsCorrect = 'empty';
    if (value != '' && answer === Number(value)) {
      newIsCorrect = 'correct';
    } else if (value != '') {

    }
    if (isCorrect != newIsCorrect) {
      onChangeCorrectState(newIsCorrect, value);
      setCorrect(newIsCorrect);
    }
  }, [value, answer]);

  return (
    <div className="expression-wrapper-diagonal">
      <label htmlFor={uuid} className={`expression-label-diagonal expression-field  ${{ 'empty': '', 'correct': "expression-field--correct", 'incorrect': "expression-field--incorrect" }[isCorrect]}`}>
        <input id={uuid} className="expression-field-diagonal" type="text" onChange={(evt) => setValue(evt.target.value)}
          onBlur={() => {
            if (value !== '' && answer != Number(value) && isCorrect != 'incorrect') {
              onChangeCorrectState('incorrect', value);
              setCorrect('incorrect');
            }
          }} />
      </label>
    </div>
  )
}

interface IExpressionSignProps {
  sign: string
}

export function ExpressionSign({ sign }: IExpressionSignProps) {
  return (
    <div className="expression-sign">{sign}</div>
  )
};

interface IExpressionNumberProps {
  value: number
}

export function ExpressionNumber({ value }: IExpressionNumberProps) {
  return (
    <div className="expression-number">{Number.isNaN(value) ? "" : value}</div>
  )
};

interface IExpressionFractionProps {
  numerator: Array<{ type: string, value: any }>,
  denominator: Array<{ type: string, value: any }>,
  onChangeCorrectState?: (isCorrect: string) => void
}

function ExpressionFraction({ numerator, denominator, onChangeCorrectState }: IExpressionFractionProps) {
  const [correctFields, setCorrectFields] = useState<Record<string, string>>({ numerator: 'empty', denominator: 'empty' });
  const [isCorrect, setCorrect] = useState('empty');

  useEffect(() => {
    let newIsCorrect = 'empty';
    if (Object.values(correctFields).find(it => it == 'incorrect' || it == 'empty') == undefined) {
      newIsCorrect = 'correct';
    } else if (Object.values(correctFields).find(it => it == 'incorrect') != undefined) {
      newIsCorrect = 'incorrect';
    }

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

interface IExpressionBracketsProps {
  numerator: Array<{ type: string, value: any }>,
  onChangeCorrectState?: (isCorrect: string) => void
}

function ExpressionBrackets({ numerator, onChangeCorrectState }: IExpressionBracketsProps) {
  const [correctFields, setCorrectFields] = useState<Record<string, string>>({ numerator: 'empty' });
  const [isCorrect, setCorrect] = useState('empty');

  useEffect(() => {
    let newIsCorrect = 'empty';
    if (Object.values(correctFields).find(it => it == 'incorrect' || it == 'empty') == undefined) {
      newIsCorrect = 'correct';
    } else if (Object.values(correctFields).find(it => it == 'incorrect') != undefined) {
      newIsCorrect = 'incorrect';
    }

    if (isCorrect != newIsCorrect) {
      onChangeCorrectState?.(newIsCorrect);
      setCorrect(newIsCorrect);
    }
  }, [correctFields]);
  return (
    <div className="brackets">
      <div className="bracket bracket--open"></div>
      <Expression expression={numerator} onChangeCorrectState={(isCorrect) => setCorrectFields(last => ({ ...last, numerator: isCorrect }))} />
      <div className="bracket bracket--close"></div>
    </div>
  )
}

interface IExpressionProps {
  expression: Array<{ type: string, value: any }>,
  onChangeCorrectState?: (isCorrect: string) => void,
  isPassive?: boolean
}

export function Expression({ expression, onChangeCorrectState, isPassive }: IExpressionProps) {
  const fields: Record<string, string> = {};
  const iterateExpression = (expression: Array<{ type: string, value: any }>) => {
    expression.forEach((it, index) => {
      if (it.type == 'field') {
        fields[it.value.name] = 'empty';
      } else if (it.type != 'number' && it.type != 'sign') {
        fields[index.toString()] = 'empty';
      }
    })
  }
  iterateExpression(expression);

  const [correctFields, setCorrectFields] = useState<Record<string, string>>(fields);
  const [isCorrect, setCorrect] = useState('empty');

  useEffect(() => {
    let newIsCorrect = 'empty';
    if (Object.values(correctFields).find(it => it == 'incorrect' || it == 'empty') == undefined) {
      newIsCorrect = 'correct';
    } else if (Object.values(correctFields).find(it => it == 'incorrect') != undefined) {
      newIsCorrect = 'incorrect';
    }

    if (isCorrect != newIsCorrect) {
      onChangeCorrectState?.(newIsCorrect);
      setCorrect(newIsCorrect);
    }
  }, [correctFields]);

  return (
    <div className={`expression-wrapper ${isPassive ? 'expression-passive' : ''}`}>
      {expression.map((it, index) => {
        if (it.type == 'number') {
          return <ExpressionNumber key={index} value={Number(it.value)} />
        } else if (it.type == 'sign') {
          return <ExpressionSign key={index} sign={it.value} />
        } else if (it.type == 'field') {
          return <ExpressionField key={index} name={it.value.name} answer={it.value.answer} placeholder={it.value.placeholder} initialValue={it.value.initialValue} onChangeCorrectState={(isCorrect) => setCorrectFields(last => ({ ...last, [it.value.name]: isCorrect }))} />
        } else if (it.type == 'frac') {
          return <ExpressionFraction key={index} numerator={it.value[0]} denominator={it.value[1]} onChangeCorrectState={(isCorrect) => setCorrectFields(last => ({ ...last, [index.toString()]: isCorrect }))} />
        } else if (it.type == 'bracket') {
          return <ExpressionBrackets key={index} numerator={it.value[0]} onChangeCorrectState={(isCorrect) => setCorrectFields(last => ({ ...last, [index.toString()]: isCorrect }))} />
        } else {
          throw new Error('Invalid expression!')
        }
      })}
    </div>
  )
}
