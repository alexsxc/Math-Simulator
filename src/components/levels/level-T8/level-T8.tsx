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
import './level-T8.css';
import { Crib } from "../../crib/crib";
import { MultiplyTableButton } from "../../multiply-table/multiply-table-button";
import { MultiplyTable } from "../../multiply-table/multiply-table";
import { DivideComment } from "../../divide-comment/divide-comment";

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
  const [showDivideComment, setShowDivideComment] = useState(false);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    if (isOpenDraft) {
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

  const handleCompleteStep = (index: number) => {
    const nextStep = Math.max(index + 1, activeStep);
    setActiveSubStep(0);
    setActiveStep(last => Math.max(index + 1, last));
    onCompleteStep(nextStep, steps.length);

    console.log(`Step ${index} completed`);

    // Automatically open draft for step 1 completion
    if (index === 1) {
      setIsOpenDraft(true);
      setIsOpenedDraft(true);
      console.log('Draft opened automatically after step 1');
    }

    setTimeout(() => {
      if ([4, 5].includes(nextStep)) {
        setIsOpenDraft(true);
        setIsOpenedDraft(true);
        console.log('Draft opened automatically for steps 4 and 5');
      }
      if (nextStep === steps.length) {
        onCompleteLevel();
        setIsComplete(true);
      }
    }, 1000);
  };

  return (
    <div className="level">
      <div className="level__buttons">
        <MultiplyTableButton />
      </div>
      <div className="full-expression-wrapper">
        <div className="full-expression">
          {
            steps.map((Step, stepIndex) => {
              return (
                stepIndex <= activeStep && <Step key={stepIndex} draftState={draftState} stepIndex={stepIndex} activeStep={activeStep}
                  onCompleteStep={handleCompleteStep}
                  onCompleteSubStep={(index, subStepIndex) => {
                    if (subStepIndex === 2 && index === 3) {
                      setIsOpenDraft(true);
                      setIsOpenedDraft(true);
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
      }} disabled={!((activeStep >= 2) || (activeStep === 3 && activeSubStep >= 2))}>Черновик</button>
      <DraftPopup isOpen={isOpenedDraft} onClose={() => {
        setIsOpenDraft(false);
        setIsOpenedDraft(false);
      }}>
        {((activeStep >= 2) || (activeStep === 3 && activeSubStep >= 2)) && activeStep < 5 && <DraftMul inputValues={[27, 85]}
          onChangeCorrectState={(isCorrect, draftValue) => {
            (isCorrect === 'correct') && setDraftState((last: any) => ({ ...last, step2_2: draftValue }))
          }} />}
        {((activeStep > 3) || (activeStep === 3 && activeSubStep >= 2)) && activeStep < 5 && <DraftMul inputValues={[31, 9]}
          onChangeCorrectState={(isCorrect, draftValue) => {
            (isCorrect === 'correct') && setDraftState((last: any) => ({ ...last, step3_2: draftValue }))
          }} />}
        {activeStep >= 4 && activeStep < 5 && <DraftSumm inputValues={[203, 279]}
          onChangeCorrectState={(isCorrect, draftValue) => {
            (isCorrect === 'correct') && setDraftState((last: any) => ({ ...last, step5: draftValue }))
          }} />}
        {activeStep >= 5 && <DraftDivide didivend={482} divisor={63}
          onChangeCorrectState={(isCorrect, draftValue) => {
            (isCorrect === 'correct') && setDraftState((last: any) => ({ ...last, step6_1: draftValue }))
          }}
          onChangeCorrectModState={(isCorrect, draftValue) => {
            (isCorrect === 'correct') && setDraftState((last: any) => ({ ...last, step6_2: draftValue }));
            (isCorrect === 'correct') && setShowDivideComment(true);
          }} />}
        {showDivideComment && <DivideComment mod={41} diviser={7} />}
      </DraftPopup>
      <MultiplyTable isOpen={isOpenMultiplyTable} />
    </div>
  )
};
