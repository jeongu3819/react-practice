// src/components/SpotfireContainer.jsx
import React, { useState } from "react";
import "../styles/SpotfireContainer.css";

// 메뉴별 Spotfire 링크를 객체로 매핑
const spotfireLinks = {
  etch: "https://spotfire-server/etch-dashboard",
  cln: "https://spotfire-server/cln-dashboard",
  cmp: "https://spotfire-server/cmp-dashboard",
  // 필요하다면 나머지도 추가
};

function SpotfireContainer({ activeMenu }) {
  // 전체 화면 확대 기능 (기존 코드 유지)
  const [expandedSpotfire, setExpandedSpotfire] = useState(null);

  const handleExpand = () => {
    setExpandedSpotfire(true);
  };

  const handleClose = () => {
    setExpandedSpotfire(false);
  };

  // activeMenu에 맞는 Spotfire URL 찾기
  // 만약 매핑되지 않은 메뉴면 default URL 또는 빈 문자열
  const spotfireUrl = spotfireLinks[activeMenu] || "https://spotfire-server/default";

  return (
    <div className="spotfire-container">
      <h2 className="spotfire-title">{activeMenu} - Spotfire Viewer</h2>

      {/* 간단히 하나의 Spotfire Iframe만 렌더링 */}
      <div className="spotfire-box" onClick={handleExpand}>
        <div className="spotfire-label">SP</div>
        <iframe
          src={spotfireUrl}
          title={`Spotfire - ${activeMenu}`}
          className="spotfire-frame"
        />
      </div>

      {/* 전체 화면 표시 */}
      {expandedSpotfire && (
        <div className="fullscreen-overlay" onClick={handleClose}>
          <div className="fullscreen-content">
            <button className="close-button" onClick={handleClose}>✖</button>
            <iframe
              src={spotfireUrl}
              title={`Spotfire - ${activeMenu}`}
              className="fullscreen-iframe"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SpotfireContainer;
