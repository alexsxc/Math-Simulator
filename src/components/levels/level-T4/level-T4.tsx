import React, { useEffect, useState } from "react";
import { DraftDivide, DraftMul, DraftSumm } from "../../steps/draft/draft";
import { DraftPopup } from "../../draftPopup/draftPopup";
import Step0 from "./step0";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step5 from "./step5";
import Step6 from "./step6";
import '../level.css';
import './level-T4.css';
import { Crib } from "../../crib/crib";
import { MultiplyTableButton } from "../../multiply-table/multiply-table-button";
import { MultiplyTable } from "../../multiply-table/multiply-table";

interface ILevelProps {
  onCompleteStep: (step: number, totalSteps: number) => void;
  onCompleteLevel: () => void;
  onChangeCorrectStepState: (step: number, state: string) => void;
}

export default function Level({ onCompleteStep, onCompleteLevel, onChangeCorrectStepState }: ILevelProps) {
  const [activeSubStep, setActiveSubStep] = useState(0);
  const steps = [Step0, Step1, Step2, Step3, Step5, Step6];
  const [activeStep, setActiveStep] = useState(1);
  const [isOpenDraft, setIsOpenDraft] = useState(false);
  const [isOpenedDraft, setIsOpenedDraft] = useState(false);
  const [draftState, setDraftState] = useState<any>({});
  const [isOpenMultiplyTable, setIsOpenMultiplyTable] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    if(isOpenDraft) {
      timerId = setTimeout(() => {
        setIsOpenedDraft(true);
      }, 3000);
    } else {
      clearTimeout(timerId);
      setIsOpenedDraft(false);
    }
    return () => {
      clearTimeout(timerId);
    }
  }, [isOpenDraft]);

  return (
    <div className="level">
      <div className="level__buttons">
      <Crib />
      <MultiplyTableButton onClose={() => {
        isOpenMultiplyTable ? setIsOpenMultiplyTable(false) : setIsOpenMultiplyTable(true);
      }}/>
      </div>    
      <div className="full-expression-wrapper">
        <div className="full-expression">
          {
            steps.map((Step, stepIndex) => {
              return (
                stepIndex <= activeStep && <Step key={stepIndex} draftState={draftState} stepIndex={stepIndex} activeStep={activeStep}
                  onCompleteStep={(index) => {
                    const nextStep = Math.max(index + 1, activeStep);
                    setActiveSubStep(0);

                    setActiveStep(last => Math.max(index + 1, last));
                    onCompleteStep(nextStep, steps.length);
                    setIsOpenDraft(false);
                    setTimeout(() => {
                      if ([4, 5].includes(nextStep)) {
                        setIsOpenDraft(true);
                      }
                      if (nextStep == steps.length) {
                        onCompleteLevel();
                        setIsComplete(true);
                      }
                    }, 1000);                    
                  }}
                  onCompleteSubStep={(index, subStepIndex) => {
                    if (subStepIndex == 2 && index == 3) {
                      setIsOpenDraft(true);
                    }
                    setActiveSubStep(subStepIndex);
                  }}
                  onChangeCorrectStepState={(index, isCorrect) => {
                    onChangeCorrectStepState(activeStep, isCorrect);
                  }} />
              )
            })
          }
        </div>
      </div>
      <button type="button" className="open-draft-button" onClick={() => {
        setIsOpenDraft(true);
        setIsOpenedDraft(true);
      }} disabled={!((activeStep > 3) || (activeStep == 3 && activeSubStep >= 2))}>Черновик</button>
      {<DraftPopup isOpen={isOpenedDraft} onClose={() => {
        setIsOpenDraft(false);
      }}>
        {((activeStep > 3) || (activeStep == 3 && activeSubStep >= 2)) && <DraftMul inputValues={[29, 7]} 
        onChangeCorrectState={(isCorrect, draftValue) => { 
         console.log(isCorrect);
         (isCorrect == 'correct') && setDraftState((last: any )=> ({...last, step3_1: draftValue}))
        }}/>}
        {((activeStep > 3) || (activeStep == 3 && activeSubStep >= 2)) && <DraftMul inputValues={[31, 9]} 
        onChangeCorrectState={(isCorrect, draftValue) => { 
          (isCorrect == 'correct') && setDraftState((last: any ) => ({...last, step3_2: draftValue}))
        }}/>}
        {activeStep >= 4 && <DraftSumm inputValues={[203, 279]} 
         onChangeCorrectState={(isCorrect, draftValue) => { 
          console.log(isCorrect);
          (isCorrect == 'correct') && setDraftState((last: any )=> ({...last, step5: draftValue}))
         }}/>}
        {activeStep >= 5 && <DraftDivide didivend={482} divisor={63} 
         onChangeCorrectState={(isCorrect, draftValue) => { 
          console.log(isCorrect);
          (isCorrect == 'correct') && setDraftState((last: any )=> ({...last, step6_1: draftValue}))
         }}
         onChangeCorrectModState={(isCorrect, draftValue) => { 
          console.log(isCorrect);
          (isCorrect == 'correct') && setDraftState((last: any )=> ({...last, step6_2: draftValue}))
         }}/>}
      </DraftPopup>}
      <MultiplyTable isOpen={isOpenMultiplyTable} />
    </div>
  )
};