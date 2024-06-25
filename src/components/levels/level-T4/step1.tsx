import React, { useState } from "react";
import { Expression } from "../../steps/expression/expression";
import { parseExpression } from "../../../parsers";
import { IStepProps } from "./IStepProps";

export default function Step({ stepIndex, activeStep, onCompleteStep, onChangeCorrectStepState }: IStepProps) {
  const stepData = {
    expression: '2 $comma(,) 7 * 0 $comma(,) 8 5',
    messageTop: 'Убираем запятые',
    messageBottom: 'Нажми, запятая пропадет'
  };
  const [subStep, setSubStep] = useState(0);
  const [commas, setCommas] = useState<{ [key: number]: boolean }>({
    1: true,
    5: true,
  });

  const handleCommaClick = (index: number) => {
    setCommas((prevCommas) => {
      const newCommas = { ...prevCommas, [index]: false };
      if (Object.values(newCommas).every((value) => value === false)) {
        onCompleteStep(stepIndex);
      }
      return newCommas;
    });
  };

  const parsedExpression = parseExpression(stepData.expression).map((element, index) => {
    if (element.type === "comma") {
      return { ...element, value: index };
    }
    return element;
  });

  return (
    <>
      {activeStep <= stepIndex && (
        <>
          <div className="step step-1">
            <div className="hint-slot hint-slot--up hint-slot--step0">
            {stepData.messageTop && <div className={`hint hint-up ${(activeStep > stepIndex || subStep > 0) ? "hint--inactive" : ""}`}>
          {stepData.messageTop}
        </div>}

        {stepData.messageTop && <div className="hint-lines">
          <div className="hint-line hint-line--top-left"></div>
          <div className="hint-line hint-line--top-right"></div>
        </div>}
            </div>
            
            <Expression
              expression={parsedExpression.filter(
                (element) => element.type !== "comma" || commas[element.value]
              )}
              onChangeCorrectState={(isCorrect) => {
                onChangeCorrectStepState(stepIndex, isCorrect);
                if (isCorrect === "correct" && activeStep === stepIndex) {
                  onCompleteStep(stepIndex);
                }
              }}
              isPassive={false}
              onCommaClick={(index: number) => handleCommaClick(index)}
            />
            <div className="hint-slot hint-slot--down">
              
            {stepData.messageBottom && <div className={`hint hint-down ${(activeStep +2 <= stepIndex  ) ? "hint--inactive" : ""}`}>
            {stepData.messageBottom}
        </div>}
            </div>
          </div>
          {stepIndex < activeStep && <div className="equal">=</div>}
        </>
      )}
    </>
  );
}
