import React, { useEffect, useMemo, useState } from "react";
import '../../level/level.css';
import { parseExpression } from "../../../parsers";
import { Expression } from "../../steps/expression/expression";
import { DraftDivide, DraftSumm } from "../../steps/draft/draft";
import { DraftPopup } from "../../draftPopup/draftPopup";
import Step0 from "./step0";
import Step1 from "./step1";

interface ILevelProps {
  // steps: Array<{ expression: string, messageTop?: string, messageBottom?: string }>;
  onCompleteStep: (step: number) => void;
  onCompleteLevel: () => void;
  onChangeCorrectStepState: (step: number, state: string) => void;
}

export default function Level({ onCompleteStep, onCompleteLevel, onChangeCorrectStepState }: ILevelProps) {
  const steps = [Step0, Step1];
  //  const steps = [
  //     {
  //       expression: '3 $frac(2, 9) + 4 $frac(3, 7)',
  //       messageTop: 'Переводим в неправильную дробь :',
  //     },
  //     {
  //       expression: '$frac(a@29, 9) + $frac(b@31, 7)',
  //       messageBottom: 'Находим ОЗ \n ОЗ = З*З'
  //     },
  //     {
  //       expression: '$frac(29, 9) + $frac(31, 7)',
  //       messageTop: 'Делаем диагональное умножение \n знаменателя на числитель',
  //     },
  //     {
  //       expression: '$frac(a@203, 63) + $frac(b@279, 63)',
  //       messageTop: 'Складываем'
  //     },
  //     {
  //       expression:  '$frac(a@482, 63)'
  //     },
  //     {
  //       expression:  'a@7 $frac(b@41, 63)',
  //       messageTop: 'Сократить и (или) выделить \n целую часть'
  //     }    
  //   ];

  // const parsedSteps = steps.map(it => parseExpression(it.expression));
  const [activeStep, setActiveStep] = useState(1);
  const [isOpenDraft, setIsOpenDraft] = useState(false);
  return (
    <div className="level">
      {/* <div>
                active step {activeStep - 1} / {steps.length - 1}
            </div> */}
      <div className="full-expression">
        {
          steps.map((Step, stepIndex) => {
            return (
              <>
                <Step stepIndex={stepIndex} activeStep={activeStep}
                  onCompleteStep={(index) => {
                    const nextStep = Math.max(index + 1, activeStep);
                    setActiveStep(last => Math.max(index + 1, last));
                    onCompleteStep(nextStep);
                    if (nextStep == steps.length) {
                      onCompleteLevel();
                    }
                  }}
                  onChangeCorrectStepState={(index, isCorrect) => {
                    onChangeCorrectStepState(activeStep, isCorrect);
                  }} />
                  {stepIndex < activeStep && <div className="equal">=</div>}
              </>
            )

          })

          // parsedSteps.slice(0, activeStep + 1).map((it, index) => {
          //     if (index > parsedSteps.length) {
          //         return <div>completed</div>
          //     }
          //     return <>
          //         <div className="step">
          //             <div className="hint-slot hint-slot--up">
          //                 {steps[index].messageTop && <div className="hint hint-up">
          //                     {steps[index].messageTop}
          //                 </div>}

          //             </div>

          //             <Expression expression={it} onChangeCorrectState={(isCorrect) => {
          //                 onChangeCorrectStepState(activeStep, isCorrect);
          //                 if (isCorrect == 'correct') {
          //                     const nextStep = Math.max(index + 1, activeStep);
          //                     setActiveStep(last => Math.max(index + 1, last));
          //                     onCompleteStep(nextStep);
          //                     if (nextStep == steps.length) {
          //                         onCompleteLevel();
          //                     }
          //                 }

          //             }} isPassive={index == 0} />
          //             <div className="hint-slot hint-slot--down">
          //                 {steps[index].messageBottom && <div className="hint hint-down">
          //                     {steps[index].messageBottom}
          //                 </div>}
          //             </div>

          //         </div>
          //         {index < activeStep && <div className="equal">=</div>}
          //     </>
          // })
        }
      </div>
      <button type="button" className="open-draft-button" onClick={() => {
        setIsOpenDraft(true);
      }}>Черновик</button>
      {isOpenDraft && <DraftPopup onClose={() => {
        setIsOpenDraft(false)
      }}>
        <DraftSumm inputValues={[1545, 25, 930]} />
        <DraftSumm inputValues={[2547, 25, 920]} />
        <DraftDivide didivend={14234} divisor={63} />
      </DraftPopup>}
    </div>
  )
};