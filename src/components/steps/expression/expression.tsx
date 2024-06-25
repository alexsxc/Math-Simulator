import React, { useEffect, useMemo, useState } from "react";
import './expression.css';
import './expressionPassive.css';
import InitialCommaPicture from './Group12.svg';
import CorrectCommaPicture from './group11.svg';
import MultiplyPicture from './multiply.svg'; 

interface IExpressionFieldProps {
  name: string,
  answer: number,
  onChangeCorrectState: (isCorrect: string, value: string) => void,
  initialValue?: number,
  placeholder?: string
}

interface IExpressionCommaProps {
  index: number;
  onCommaClick: (index: number) => void;
  isCorrectCommaClicked: boolean;
  isCorrectComma: boolean;
}

export function ExpressionComma({ index, onCommaClick, isCorrectCommaClicked, isCorrectComma }: IExpressionCommaProps) {
  return (
    <img
      src={isCorrectCommaClicked && isCorrectComma ? CorrectCommaPicture : InitialCommaPicture}
      alt=","
      className="expression-comma"
      onClick={() => onCommaClick(index)}
    />
  );
}


interface IExpressionMultiplyProps {
  index: number;
}

export function ExpressionMultiply({ index }: IExpressionMultiplyProps) {
  return (
    <img
      src={MultiplyPicture}
      alt="*"
      className="expression-multiply"
    />
  );
}

export function parseExpression(expression: string) {
  const elements = expression.split(' ').map((item) => {
    if (!isNaN(Number(item))) {
      return { type: 'number', value: item };
    } else if (['+', '-', '*', '/'].includes(item)) {
      return { type: 'sign', value: item };
    } else if (item === ',') {
      return { type: 'comma', value: item };
    } else {
      // handle more cases as needed
      throw new Error(`Unexpected token: ${item}`);
    }
  });
  return elements;
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
      newIsCorrect = 'incorrect';
    }
    if (isCorrect !== newIsCorrect) {
      onChangeCorrectState(newIsCorrect, value);
      setCorrect(newIsCorrect);
    }
  }, [value, answer]);

  return (
    <div className={`expression-field input-wrapper ${isCorrect === 'correct' ? "expression-field--correct" : isCorrect === 'incorrect' ? "expression-field--incorrect" : ""}`}>
      <input type="text" className="expression-field expression-field__transparent"
        value={value} placeholder={placeholder || ''}
        onChange={(evt) => setValue(evt.target.value)}
        onBlur={() => {
          if (value !== '' && answer !== Number(value) && isCorrect !== 'incorrect') {
            onChangeCorrectState('incorrect', value);
            setCorrect('incorrect');
          }
        }} />
      <div className="input-placeholder">{(placeholder || '').split('_').join(' ')}</div>
    </div>
  );
}

export function ExpressionFieldDiagonal({ name, answer, onChangeCorrectState }: IExpressionFieldProps) {
  const [value, setValue] = useState('');
  const [isCorrect, setCorrect] = useState('empty');
  const uuid = useMemo(() => {
    return '_' + Date.now() + name + Math.random();
  }, []);

  useEffect(() => {
    let newIsCorrect = 'empty';
    if (value !== '' && answer === Number(value)) {
      newIsCorrect = 'correct';
    } else if (value !== '') {
      newIsCorrect = 'incorrect';
    }
    if (isCorrect !== newIsCorrect) {
      onChangeCorrectState(newIsCorrect, value);
      setCorrect(newIsCorrect);
    }
  }, [value, answer]);

  return (
    <div className="expression-wrapper-diagonal">
      <label htmlFor={uuid} className={`expression-label-diagonal expression-field ${isCorrect === 'correct' ? "expression-field--correct" : isCorrect === 'incorrect' ? "expression-field--incorrect" : ""}`}>
        <input id={uuid} className="expression-field-diagonal" type="text" onChange={(evt) => setValue(evt.target.value)}
          onBlur={() => {
            if (value !== '' && answer !== Number(value) && isCorrect !== 'incorrect') {
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
    if (Object.values(correctFields).find(it => it === 'incorrect' || it === 'empty') === undefined) {
      newIsCorrect = 'correct';
    } else if (Object.values(correctFields).find(it => it === 'incorrect') !== undefined) {
      newIsCorrect = 'incorrect';
    }

    if (isCorrect !== newIsCorrect) {
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

interface IExpressionProps {
  expression: Array<{ type: string, value: any, isCorrect?: boolean }>,
  onChangeCorrectState?: (isCorrect: string) => void,
  isPassive?: boolean,
  onCommaClick?: (index: number) => void,
  correctCommaClicked?: boolean
}

export function Expression({ expression, onChangeCorrectState, isPassive, onCommaClick, correctCommaClicked }: IExpressionProps) {
  const iterateExpression = (expression: Array<{ type: string, value: any, isCorrect?: boolean }>) => {
    return expression.map((element, index) => {
      switch (element.type) {
        case 'number':
          return <ExpressionNumber key={index} value={element.value} />;
        case 'sign':
          if (element.value === '*') {
            return <ExpressionMultiply key={index} index={index} />;
          }
          return <ExpressionSign key={index} sign={element.value} />;
        case 'comma':
          if (!isPassive && onCommaClick) {
            return (
              <ExpressionComma
                key={index}
                index={element.value}
                onCommaClick={onCommaClick}
                isCorrectCommaClicked={correctCommaClicked || false}
                isCorrectComma={element.isCorrect || false}
              />
            );
          } else {
            return <ExpressionSign key={index} sign={element.value} />;
          }
        case 'field':
          return <ExpressionField key={index} name={element.value.name} answer={element.value.answer} initialValue={element.value.initialValue} placeholder={element.value.placeholder} onChangeCorrectState={(isCorrect, value) => onChangeCorrectState?.(isCorrect)} />;
        case 'fraction':
          return <ExpressionFraction key={index} numerator={element.value.numerator} denominator={element.value.denominator} onChangeCorrectState={(isCorrect) => onChangeCorrectState?.(isCorrect)} />;
        default:
          return null;
      }
    });
  };

  return (
    <div className={`expression-wrapper ${isPassive ? "expression--passive" : ""}`}>
      {iterateExpression(expression)}
    </div>
  );
}
