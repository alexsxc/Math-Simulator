export interface IStepProps {
  stepIndex: number;
  activeStep: number;
  onCompleteStep: (step: number) => void;
  onChangeCorrectStepState: (step: number, state: string) => void;
}
