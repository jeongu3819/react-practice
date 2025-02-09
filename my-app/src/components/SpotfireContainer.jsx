// src/components/SpotfireContainer.jsx
import React, { useState, useEffect } from "react";
import "../styles/SpotfireContainer.css";

function SpotfireContainer({ activeMenu }) {
  const [expandedSpotfire, setExpandedSpotfire] = useState(null);

  const handleExpand = (spotfire) => {
    setExpandedSpotfire(spotfire);
  };

  const handleClose = () => {
    setExpandedSpotfire(null); // 전체 화면 닫기
  };

  // ✅ ESC 키를 누르면 전체 화면 모드를 닫음
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setExpandedSpotfire(null); // ESC 키 입력 시 닫기
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown); // 컴포넌트 언마운트 시 이벤트 제거
    };
  }, []);

  return (
    <div className="spotfire-container">
      <h2 className="spotfire-title">{activeMenu} - Spotfire Viewer</h2>

      <div className="spotfire-grid">
        {/* Spotfire 1 */}
        <div
          className="spotfire-box"
          onClick={() => handleExpand("spotfire1")}
        >
          <h3>Spotfire 1</h3>
          <iframe
            src="https://your-spotfire-url-1.com"
            title="Spotfire 1"
            className="spotfire-frame"
          />
        </div>

        {/* Spotfire 2 */}
        <div
          className="spotfire-box"
          onClick={() => handleExpand("spotfire2")}
        >
          <h3>Spotfire 2</h3>
          <iframe
            src="https://your-spotfire-url-2.com"
            title="Spotfire 2"
            className="spotfire-frame"
          />
        </div>
      </div>

      {/* 전체 화면 모달 */}
      {expandedSpotfire && (
        <div className="fullscreen-overlay" onClick={handleClose}>
          <div className="fullscreen-content">
            <button className="close-button" onClick={handleClose}>✖</button>
            <iframe
              src={expandedSpotfire === "spotfire1" ? "https://your-spotfire-url-1.com" : "https://your-spotfire-url-2.com"}
              title={expandedSpotfire}
              className="fullscreen-iframe"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SpotfireContainer;
