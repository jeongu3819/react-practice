// src/components/SettingsDrawer.jsx
import React from "react";
import "../styles/SettingsDrawer.css";

function SettingsDrawer({ isOpen, onClose, visitorCount }) {
  return (
    <div className={`drawer-overlay ${isOpen ? "open" : ""}`}>
      {/* 실제 패널 (drawer) */}
      <div className="drawer-panel">
        <div className="drawer-header">
          <h3>페이지 설정</h3>
          <button className="drawer-close-btn" onClick={onClose}>
            X
          </button>
        </div>

        <div className="drawer-content">
          <div className="drawer-section">
            <h4>방문자 수</h4>
            <p>총 방문자: {visitorCount}</p>
          </div>

          {/* 추후 원하는 항목을 여기에 추가 가능 */}
        </div>
      </div>
    </div>
  );
}

export default SettingsDrawer;
