import React from "react";
import { ExpressionField, ExpressionSign, ExpressionNumber } from "../expression/expression";
import './draft.css';

interface IDraftSumm {
  inputValues: Array<number>
}

export function DraftSumm({ inputValues }: IDraftSumm) {
  return (
    <div className="draft-summ">
      {inputValues.map((value, argumentIndex) => (
        <>
          <div className="draft-summ__argument">
            {value.toString().split('').map(it => (
              <ExpressionNumber value={Number(it)} />
            ))}
          </div>
          {argumentIndex != inputValues.length - 1 && <div className="draft-summ__sign"><ExpressionSign sign={"+"} /></div>}
        </>
      )
      )}
      <div className="draft-summ__slash slash"></div>
      <div className="draft-summ__argument">
        {inputValues.reduce((acc, value) => acc + value, 0).toString().split('').map((it, index) => (
          <ExpressionField name={index.toString()} answer={Number(it)} onChangeCorrectState={() => { }} />
        ))}
      </div>
    </div>
  )
}