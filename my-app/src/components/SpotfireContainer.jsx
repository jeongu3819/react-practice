// src/components/SpotfireContainer.jsx
import React, { useState } from "react";
import "../styles/SpotfireContainer.css";

function SpotfireContainer({ activeMenu }) {
  const [expandedSpotfire, setExpandedSpotfire] = useState(null);

  const handleExpand = (spotfire) => {
    setExpandedSpotfire(spotfire);
  };

  const handleClose = () => {
    setExpandedSpotfire(null);
  };

  return (
    <div className="spotfire-container">
      <h2 className="spotfire-title">{activeMenu} - Spotfire Viewer</h2>

      <div className="spotfire-grid">
        {/* Spotfire 1 */}
        <div className="spotfire-box" onClick={() => handleExpand("spotfire1")}>
          {/* ✅ Spotfire 박스 오른쪽 상단에 텍스트 추가 */}
          <div className="spotfire-label">SP1</div>
          <h3>Spotfire 1</h3>
          <iframe
            src="https://your-spotfire-url-1.com"
            title="Spotfire 1"
            className="spotfire-frame"
          />
        </div>

        {/* Spotfire 2 */}
        <div className="spotfire-box" onClick={() => handleExpand("spotfire2")}>
          {/* ✅ Spotfire 박스 오른쪽 상단에 텍스트 추가 */}
          <div className="spotfire-label">SP2</div>
          <h3>Spotfire 2</h3>
          <iframe
            src="https://your-spotfire-url-2.com"
            title="Spotfire 2"
            className="spotfire-frame"
          />
        </div>
      </div>

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
