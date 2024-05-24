import React, { useEffect, useState } from "react";
import { ExpressionField, ExpressionSign, ExpressionNumber } from "../expression/expression";
import './draft.css';

interface IDraftSumm {
  inputValues: Array<number>,
  onChangeCorrectState: (isCorrect: string, draftValue: number) => void
}

export function DraftSumm({ inputValues, onChangeCorrectState }: IDraftSumm) {
  const summResult = inputValues.reduce((acc, value) => acc + value, 0).toString().split('');
  const fields = summResult.map(it => 'empty');
  const [correctFields, setCorrectFields] = useState<Array<string>>(fields);
  const [isCorrect, setCorrect] = useState('empty');
  const [fieldValues, setFieldValues] = useState<Array<string>>([]);

  useEffect(() => {
    let newIsCorrect = 'empty';
    if (Object.values(correctFields).find(it => it == 'incorrect' || it == 'empty') == undefined) {
      newIsCorrect = 'correct';
    } else if (Object.values(correctFields).find(it => it == 'incorrect') != undefined) {
      newIsCorrect = 'incorrect';
    }
    console.log(fieldValues, correctFields, newIsCorrect);
    const resultValue = Number([...fieldValues].join(''));
    console.log(resultValue);
    if (isCorrect != newIsCorrect) {
      onChangeCorrectState?.(newIsCorrect, resultValue);
      setCorrect(newIsCorrect);
    }
  }, [correctFields, fieldValues]);
  return (
    <div className="draft-summ">
      {inputValues.map((value, argumentIndex) => (
        <React.Fragment key={argumentIndex}>
          <div className="draft-summ__argument">
            {value.toString().split('').map((it, index) => (
              <ExpressionNumber key={index} value={Number(it)} />
            ))}
          </div>
          {argumentIndex != inputValues.length - 1 && <div className="draft-summ__sign"><ExpressionSign sign={"+"} /></div>}
        </React.Fragment>
      )
      )}
      <div className="draft-summ__slash slash"></div>
      <div className="draft-summ__argument">
        {summResult.map((it, index) => (
          <ExpressionField key={index} name={index.toString()} answer={Number(it)}
            onChangeCorrectState={(isCorrect, value) => {
              setCorrectFields(last => ({ ...last, [index.toString()]: isCorrect }));
              setFieldValues(last => {
                const next = [...last];
                next[index] = value;
                return next;
              });
            }} />
        ))}
      </div>
    </div>
  )
}

interface IDraftEDivideProps {
  didivend: number,
  divisor: number,
  onChangeCorrectState: (isCorrect: string, draftValue: number) => void,
  onChangeCorrectModState: (isCorrect: string, draftValue: number) => void,
}

export function DraftDivide({ didivend, divisor, onChangeCorrectState, onChangeCorrectModState }: IDraftEDivideProps) {
  const divResult = Math.floor(didivend / divisor).toString().split('');
  const modResult = Math.floor(didivend % divisor).toString().split('');
  const fields = divResult.map(it => 'empty');
  const [correctFields, setCorrectFields] = useState<Array<string>>(fields);
  const [isCorrect, setCorrect] = useState('empty');
  const [fieldValues, setFieldValues] = useState<Array<string>>([]);
  const subResults: Array<{ a: number; b: number; pos: number; }> = [];

  let subDidivent = '';
  didivend.toString().split('').forEach((it, i) => {
    subDidivent += it;
    const subResult = Math.floor(Number(subDidivent) / divisor);
    if (subResult != 0) {
      const lastSubDidivent = subDidivent;
      subDidivent = Math.floor(Number(subDidivent) % divisor).toString();
      console.log(lastSubDidivent, subResult * divisor, subDidivent, subResult);
      subResults.push({ a: Number(lastSubDidivent), b: subResult * divisor, pos: i });
    }
  })

  const subResultsFields = subResults.map(it => ({
    a: new Array(it.a.toString().length).fill('empty'),
    b: new Array(it.b.toString().length).fill('empty')
  }))
  subResultsFields[0].a = new Array(didivend.toString().length).fill('correct');
  const fieldsMod = modResult.map(it => 'empty');
  const [correctModFields, setCorrectModFields] = useState<Array<string>>(fieldsMod);
  const [isCorrectMod, setCorrectMod] = useState('empty');
  const [fieldModValues, setFieldModValues] = useState<Array<string>>([]);
  const [correctSubResultsFields, setCorrectSubResultsFields] = useState<Array<{a: Array<string>, b: Array<string>}>>(subResultsFields);
  const [currentStep, setCurrentStep] = useState(0);
  

  useEffect(() => {
    let newIsCorrect = 'empty';
    if (Object.values(correctFields).find(it => it == 'incorrect' || it == 'empty') == undefined) {
      newIsCorrect = 'correct';
    } else if (Object.values(correctFields).find(it => it == 'incorrect') != undefined) {
      newIsCorrect = 'incorrect';
    }

    const resultValue = Number([...fieldValues].join(''));
    console.log(resultValue);
    if (isCorrect != newIsCorrect) {
      onChangeCorrectState?.(newIsCorrect, resultValue);
      setCorrect(newIsCorrect);
    }
  }, [correctFields, fieldValues]);

  useEffect(() => {
    let newIsCorrect = 'empty';
    if (Object.values(correctModFields).find(it => it == 'incorrect' || it == 'empty') == undefined) {
      newIsCorrect = 'correct';
    } else if (Object.values(correctModFields).find(it => it == 'incorrect') != undefined) {
      newIsCorrect = 'incorrect';
    }

    const resultValue = Number([...fieldModValues].join(''));

    if (isCorrectMod != newIsCorrect) {
      onChangeCorrectModState?.(newIsCorrect, resultValue);
      setCorrectMod(newIsCorrect);
    }
  }, [correctModFields, fieldModValues]);

  useEffect(() => {
    if(currentStep == correctSubResultsFields.length) return;
    console.log(correctSubResultsFields, currentStep);
    let newIsCorrect = 'empty';
    if (((correctSubResultsFields[currentStep]).a.find(it => it == 'incorrect' || it == 'empty') == undefined) 
      && ((correctSubResultsFields[currentStep]).b.find(it => it == 'incorrect' || it == 'empty') == undefined)) {
      newIsCorrect = 'correct';
    } else if (((correctSubResultsFields[currentStep]).a.find(it => it == 'incorrect') != undefined) 
      && ((correctSubResultsFields[currentStep]).b.find(it => it == 'incorrect') != undefined)) {
      newIsCorrect = 'incorrect';
    }

    if(newIsCorrect == 'correct' && currentStep < correctSubResultsFields.length) {
      setCurrentStep(last => last + 1);
    }
  }, [correctSubResultsFields, currentStep]);


  return (
    <div className="draft-divide-wrapper">
      <div className="draft-operation draft-divide">
        {/* {[didivend, Math.floor(didivend / divisor) * divisor].map((value, argumentIndex) => (
          <React.Fragment key={argumentIndex}>
            <div className="draft-operation__argument">
              {value.toString().split('').map((it, index) => (
                <ExpressionNumber key={index} value={Number(it)} />
              ))}
            </div>
            {argumentIndex != 1 && <div className="draft-operation__sign"><ExpressionSign sign={"-"} /></div>}
          </React.Fragment>
        )
        )} */}
        {[ {a: didivend, b: subResults[0].b, pos: subResults[0].pos},  ...subResults.slice(1)].slice(0, currentStep + 1).map((subResult, subResultIndex) => {
          return (
            <div className="draft-sub-operation">
              {
                [subResult.a, subResult.b].map((value, argumentIndex) => (
                  <React.Fragment key={argumentIndex}>
                    <div className="draft-operation__argument">
                      {value.toString().split('').map((it, index) => (
                        (argumentIndex == 0 && subResultIndex == 0) ? <ExpressionNumber key={index} value={Number(it)} /> :
                        <ExpressionField key={index} answer={Number(it)} name={(subResultIndex * 2 + argumentIndex).toString()} 
                          onChangeCorrectState={(isCorrect) => {setCorrectSubResultsFields(last => {
                            const next = JSON.parse(JSON.stringify(last));
                            next[subResultIndex][['a', 'b'][argumentIndex]][index] = isCorrect;
                            return next;
                          })}}/>
                      ))}
                      {new Array(((argumentIndex == 0 && subResultIndex == 0) ? 0 : didivend.toString().length - subResult.pos - 1)).fill(0).map((it, index) => (
                        <div className="expression-number" style={{visibility: "hidden"}}></div>
                      ))}
                    </div>

                    {argumentIndex != 1 && <div className="draft-operation__sign"><ExpressionSign sign={"-"} /></div>}
                  </React.Fragment>
                ))
              }
             {subResultIndex != currentStep && <div className="draft-operation__slash slash"></div>}
            </div>
          )
        }
        )}

       {currentStep == subResults.length && <div className="draft-operation__argument">
          {modResult.map((it, index) => (
            <ExpressionField key={index} name={index.toString()} answer={Number(it)}
              onChangeCorrectState={(isCorrect, value) => {
                setCorrectModFields(last => ({ ...last, [index.toString()]: isCorrect }));
                setFieldModValues(last => {
                  const next = [...last];
                  next[index] = value;
                  return next;
                });
              }} />
          ))}
        </div>}
      </div>
      <div className="vertical-slash"></div>
      <div className="draft-operation draft-divisor">
        <div className="draft-operation__argument">
          {divisor.toString().split('').map((it, index) => (
            <ExpressionNumber key={index} value={Number(it)} />
          ))}
        </div>
        <div className="draft-operation__slash slash"></div>
        <div className="draft-operation__argument">
          {divResult.map((it, index) => (
            <ExpressionField key={index} name={index.toString()} answer={Number(it)}
              onChangeCorrectState={(isCorrect, value) => {
                setCorrectFields(last => ({ ...last, [index.toString()]: isCorrect }));
                setFieldValues(last => {
                  const next = [...last];
                  next[index] = value;
                  return next;
                });
              }} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface IDraftMul {
  inputValues: Array<number>,
  onChangeCorrectState: (isCorrect: string, draftValue: number) => void
}

export function DraftMul({ inputValues, onChangeCorrectState }: IDraftMul) {
  const mulResult = inputValues.reduce((acc, value) => acc * value, 1).toString().split('');
  const fields = mulResult.map(it => 'empty');
  const subResults = inputValues[1].toString().split('').reverse().map((it, i) => Number(it) * inputValues[0] * 10 ** i);
  const subResultsFields = subResults.map(it => it.toString().split('').map(item => 'empty'));
  const [correctSubResultsFields, setCorrectSubResultsFields] = useState<Array<Array<string>>>(subResultsFields);
  const [correctFields, setCorrectFields] = useState<Array<string>>(fields);
  const [isCorrect, setCorrect] = useState('empty');
  const [isSubResultsCorrect, setIsSubResultsCorrect] = useState('empty');
  const [fieldValues, setFieldValues] = useState<Array<string>>([]);

  useEffect(() => {
    let newIsCorrect = 'empty';
    if (Object.values(correctFields).find(it => it == 'incorrect' || it == 'empty') == undefined) {
      newIsCorrect = 'correct';
    } else if (Object.values(correctFields).find(it => it == 'incorrect') != undefined) {
      newIsCorrect = 'incorrect';
    }
    console.log(fieldValues, correctFields, newIsCorrect);
    const resultValue = Number([...fieldValues].join(''));
    console.log(resultValue);
    if (isCorrect != newIsCorrect) {
      onChangeCorrectState?.(newIsCorrect, resultValue);
      setCorrect(newIsCorrect);
    }
  }, [correctFields, fieldValues]);

  useEffect(() => {
    let newIsCorrect = 'empty';
    if (Object.values(correctSubResultsFields).find(jt => jt.find(it => it == 'incorrect' || it == 'empty') != undefined) == undefined) {
      newIsCorrect = 'correct';
    } else if (Object.values(correctSubResultsFields).find(jt => jt.find(it => it == 'incorrect') != undefined) != undefined) {
      newIsCorrect = 'incorrect';
    }

    const resultValue = Number([...fieldValues].join(''));
    console.log(resultValue);
    if (isSubResultsCorrect != newIsCorrect) {
      setIsSubResultsCorrect(newIsCorrect);
    }
  }, [correctSubResultsFields]);

  return (
    <div className="draft-summ">
      <div className="draft-summ-arguments">
        {inputValues.map((value, argumentIndex) => (
          <React.Fragment key={argumentIndex}>
            <div className="draft-summ__argument">
              {value.toString().split('').map((it, index) => (
                <ExpressionNumber key={index} value={Number(it)} />
              ))}
            </div>
            {argumentIndex != inputValues.length - 1 && <div className="draft-summ__sign"><ExpressionSign sign={"x"} /></div>}
          </React.Fragment>
        )
        )}
        <div className="draft-summ__slash slash"></div>
      </div>

      {subResults.length > 1 && <div className="draft-summ-arguments">
        {subResults.map((value, argumentIndex) => (
          <React.Fragment key={argumentIndex}>
            <div className="draft-summ__argument">
              {value.toString().split('').map((it, index) => (
                // <ExpressionNumber key={index} value={Number(it)} />
                <ExpressionField key={index} answer={Number(it)} name={index.toString()} onChangeCorrectState={(isCorrect) => {
                  setCorrectSubResultsFields(last => {
                    const nextState = JSON.parse(JSON.stringify(last));
                    nextState[argumentIndex][index] = isCorrect;
                    return nextState;
                  })
                }} />
              ))}
            </div>
            {argumentIndex != subResults.length - 1 && <div className="draft-summ__sign"><ExpressionSign sign={"+"} /></div>}
          </React.Fragment>
        )
        )}
        {isSubResultsCorrect == 'correct' && <div className="draft-summ__slash slash"></div>}
      </div>}

      {(isSubResultsCorrect == 'correct' || subResults.length < 2) && <div className="draft-summ__argument">
        {mulResult.map((it, index) => (
          <ExpressionField key={index} name={index.toString()} answer={Number(it)}
            onChangeCorrectState={(isCorrect, value) => {
              setCorrectFields(last => ({ ...last, [index.toString()]: isCorrect }));
              setFieldValues(last => {
                const next = [...last];
                next[index] = value;
                return next;
              });
            }} />
        ))}
      </div>}
    </div>
  )
}
