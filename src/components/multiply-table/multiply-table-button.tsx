import React from "react";
import './multiply-table.css';

interface IMultiplyTableButtonProps {
  onClose: () => void 
}

export function MultiplyTableButton() {
  return (
    <div className="multiply-table-button">
    <div className="multiply-table-button__wrapper">
      <button className="multiply-table-button__button" type="button" >
        <span className="multiply-table-button__text">Таблица умножения</span></button>
    </div>
  </div>
  )
}