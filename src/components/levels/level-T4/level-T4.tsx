import React, { useEffect, useMemo, useState } from "react";
import { parseExpression } from "../../../parsers";
import { Expression } from "../../steps/expression/expression";
import { DraftDivide, DraftMul, DraftSumm } from "../../steps/draft/draft";
import { DraftPopup } from "../../draftPopup/draftPopup";
import Step0 from "./step0";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import '../../level/level.css';
import './level-T4.css';
import { Crib } from "../../crib/crib";

interface ILevelProps {
  // steps: Array<{ expression: string, messageTop?: string, messageBottom?: string }>;
  onCompleteStep: (step: number, totalSteps: number) => void;
  onCompleteLevel: () => void;
  onChangeCorrectStepState: (step: number, state: string) => void;
}

export default function Level({ onCompleteStep, onCompleteLevel, onChangeCorrectStepState }: ILevelProps) {
  const [activeSubStep, setActiveSubStep] = useState(0);
  const steps = [Step0, Step1, Step2, Step3, /*Step4,*/ Step5, Step6];
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
        <Crib />
      {/* <div>
                active step {activeStep - 1} / {steps.length - 1}
            </div> */}
      <div className="full-expression">
        {
          steps.map((Step, stepIndex) => {
            return (              
              <>              
                {stepIndex <= activeStep &&  <Step stepIndex={stepIndex} activeStep={activeStep}
                  onCompleteStep={(index) => {
                    const nextStep = Math.max(index + 1, activeStep);
                    setActiveSubStep(0);
                    
                    setActiveStep(last => Math.max(index + 1, last));
                    onCompleteStep(nextStep, steps.length);
                    if([4, 5].includes(nextStep)) {
                      setIsOpenDraft(true);
                    }
                    if (nextStep == steps.length) {
                      onCompleteLevel();
                    }
                  }}
                  onCompleteSubStep={(index, subStepIndex) => {
                    if(subStepIndex == 2 && index == 3) {
                      setIsOpenDraft(true);
                    }
                    setActiveSubStep(subStepIndex);
                  }}
                  onChangeCorrectStepState={(index, isCorrect) => {
                    onChangeCorrectStepState(activeStep, isCorrect);
                  }} />}                                
              </>              
            )
          })
        }
      </div>
      <button type="button" className="open-draft-button" onClick={() => {      
          setIsOpenDraft(true);         
      }} disabled={!((activeStep > 3) || (activeStep == 3 && activeSubStep >= 2))}>Черновик</button>
      {<DraftPopup isOpen={isOpenDraft} onClose={() => {
        setIsOpenDraft(false)
      }}>
        {((activeStep > 3) || (activeStep == 3 && activeSubStep >= 2)) && <DraftMul inputValues={[29, 7]} />}
        {((activeStep > 3) || (activeStep == 3 && activeSubStep >= 2)) && <DraftMul inputValues={[31, 9]} />}
        {activeStep >= 4 && <DraftSumm inputValues={[203, 279]} />}
        {activeStep >= 5 && <DraftDivide didivend={482} divisor={63} />}
      </DraftPopup>}
    </div>
  )
};