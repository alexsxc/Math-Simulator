import React from "react";
import { Link } from "react-router-dom";

export function NavigatePage() {
  return (
    <>
     <Link to="/level/0">Т4 Арифметические действия с обыкновенными дробями. Сложение</Link>
     <Link to="/level/1">Т5 Арифметические действия с обыкновенными дробями. Умножение</Link>
     <Link to="/level/2">Т8 Арифметические действия с десятичными дробями. Умножение. Деление</Link>
    </>
  )
}