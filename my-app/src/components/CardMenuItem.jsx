// src/components/CardMenuItem.jsx
import React from "react";
import "../styles/CardMenuItem.css";

function CardMenuItem({ title, text, link, onCardClick }) {
  const handleClick = () => {
    if (onCardClick) {
      // 상위(부모)에서 클릭 로직을 처리하도록 콜백을 호출
      onCardClick();
    } else if (link) {
      // 혹시 상위에서 별도 처리가 없다면 내부에서 열어주기
      window.open(link, "_blank");
    }
  };

  return (
    <div className="card-menu-item" onClick={handleClick}>
      <div className="card-title">{title}</div>
      <div className="card-text">{text}</div>
    </div>
  );
}

export default CardMenuItem;
