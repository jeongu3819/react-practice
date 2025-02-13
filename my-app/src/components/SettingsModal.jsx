// src/components/SettingsModal.jsx
import React from "react";
import "../styles/SettingsModal.css";

function SettingsModal({ visitorCount, onClose }) {
  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal">
        <h2>사이트 통계</h2>
        <p>📊 방문자 수: {visitorCount}</p>

        {/* ✅ 닫기 버튼 */}
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;
