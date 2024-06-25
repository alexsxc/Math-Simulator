import React, { useEffect, useState } from "react";
import { Expression } from "../../steps/expression/expression";
import { parseExpression } from "../../../parsers";
import { IStepProps } from "./IStepProps";

export default function Step({ stepIndex, activeStep, draftState, onCompleteStep, onChangeCorrectStepState, onCompleteSubStep }: IStepProps) {
  const stepData1 = {
    expression: '27 * 85',
    messageTop: 'Умножаем',
    messageBottom: 'Умножаем'
  };
  const stepData2 = {
    expression: 'a@2295@',
  };
  const stepData3 = {
    expression: 'b@3@',
    messageBottom: `Сколько знаков после запятой ?`
  };
  const stepData4 = {
    expression: '2 $comma(,) 2 $comma(,) 9 $comma(,) 5',
  };

  const [correctFields, setCorrectFields] = useState<Record<string, string>>({ diagonal1: 'empty', diagonal2: 'empty', subStep1: 'empty', subStep2: 'empty', subStep3: 'empty' });
  const [isCorrect, setCorrect] = useState('empty');
  const [subStep, setSubStep] = useState(1);

  useEffect(() => {
    let newIsCorrect = 'empty';
    if (Object.values(correctFields).find(it => it === 'incorrect' || it === 'empty') === undefined) {
      newIsCorrect = 'correct';
    } else if (Object.values(correctFields).find(it => it === 'incorrect') !== undefined) {
      newIsCorrect = 'incorrect';
    }
    if (correctFields.subStep1 === 'correct') {
      const nextSubStep = Math.max(subStep, 2);
      if (nextSubStep !== subStep) {
        setSubStep(nextSubStep);
        onCompleteSubStep(stepIndex, nextSubStep);
      }
    }
    if (correctFields.subStep2 === 'correct') {
      const nextSubStep = Math.max(subStep, 3);
      if (nextSubStep !== subStep) {
        setSubStep(nextSubStep);
        onCompleteSubStep(stepIndex, nextSubStep);
      }
    }

    if (isCorrect !== newIsCorrect) {
      onChangeCorrectStepState?.(stepIndex, newIsCorrect);
      setCorrect(newIsCorrect);
      if (newIsCorrect === 'correct' && activeStep === stepIndex) {
        onCompleteStep(stepIndex);
      }
    }
  }, [correctFields]);

  const [correctCommaClicked, setCorrectCommaClicked] = useState(false);

  const handleCommaClick = (index: number) => {
    const correctIndex = 1; // Assume the correct comma index is 1 (the first comma)
    if (index === correctIndex) {
      setCorrectCommaClicked(true);
      onCompleteStep(stepIndex);
    }
  };

  const parsedExpression = parseExpression(stepData4.expression).map((element, index) => {
    if (element.type === "comma") {
      return { ...element, value: index, isCorrect: index === 1 };
    }
    return element;
  });

  return (
    <>
      <div className="step">
        <div className="hint-slot hint-slot--up hint-slot--step3-top">
          {stepData1.messageTop && <div className={`hint hint-up ${(activeStep > stepIndex || subStep > 1) ? "hint--inactive" : ""}`}>
            {stepData1.messageTop}
          </div>}
          {stepData1.messageTop && <div className="hint-lines">
            <div className="hint-line hint-line--top-left"></div>
            <div className="hint-line hint-line--top-right"></div>
          </div>}
        </div>

        <div className="step3-expression-wrapper one">
          <Expression expression={parseExpression(stepData1.expression)} onChangeCorrectState={(isCorrect) => { }} isPassive={false} />
        </div>
        <div className="hint-slot hint-slot--down hint-slot--step3-bottom">
        </div>
      </div>
      <div className="equal">=</div>

      {subStep >= 1 && 
        
        <div className="step">
          <div className="hint-slot hint-slot--up">
          </div>

          <div className="step3-expression-wrapper">
            <Expression 
              expression={parseExpression(stepData2.expression)
              } 
              onChangeCorrectState={(isCorrect) => {
                setCorrectFields(last => ({ ...last, subStep1: isCorrect }));
              }}
              isPassive={false}
            />
          </div>
          
          <div className="hint-slot hint-slot--down">
          </div>
        </div>
      }

      {subStep >= 2 && 
        <div className="hint-slot hint-slot--down heq">
          <div className="hint-slot hint-slot--up">
          </div>
          <div className="hint hint-down">сколько знаков<br /><b className="bigbig">после запятой ?</b></div>
          <div className="step3-expression-wrapper">
            <Expression 
              expression={parseExpression(stepData3.expression)} 
              onChangeCorrectState={(isCorrect) => {
                setCorrectFields(last => ({ ...last, subStep2: isCorrect }));
              }} 
              isPassive={false} 
            />
          </div>
          
          <div className="hint-slot hint-slot--down">
          </div>
        </div>
        
      }
      {subStep >= 3 && 
      <>
      <div className="equal">=</div>
        <div className="step">
          <div className="hint-slot hint-slot--up">
            <div className="hint hint-up ">Запятой отделяем 3 знака<br /><b className="bigbig">нажми на правильную</b></div>
          </div>

          <div className="step3-expression-wrapper hey">
            <Expression
              expression={parsedExpression.filter(
                (element) => element.type !== "comma" || !correctCommaClicked || element.value === 1
              )}
              onChangeCorrectState={(isCorrect) => {
                onChangeCorrectStepState(stepIndex, isCorrect);
                if (isCorrect === "correct" && activeStep === stepIndex) {
                  onCompleteStep(stepIndex);
                }
              }}
              isPassive={false}
              onCommaClick={(index: number) => handleCommaClick(index)}
              correctCommaClicked={correctCommaClicked}
            />
          </div>
          
          <div className="hint-slot hint-slot--down">
          </div>
        </div>
        </>
      }
    </>
  );
}
