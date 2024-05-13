import React, { ReactNode } from "react";
import './draftPopup.css';

interface IDraftPopupProps {
  children?: ReactNode[] | ReactNode,
  onClose: () => void 
}

export function DraftPopup({children, onClose}: IDraftPopupProps) {
  return (
    <>
    <div className="overlay"></div>
    <div className="draft-popup">
      <div className="draft-popup__wrapper">
        {...Array.isArray(children) ? children : [children]}
      </div>
      <button type="button" className="draft-popup-close" onClick={onClose}>X</button>
    </div>
    </>
  )
}