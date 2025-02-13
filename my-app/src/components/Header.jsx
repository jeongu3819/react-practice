// src/components/Header.jsx
import React, { useState } from "react";
import menuData from "../data/menuData";
import SettingsDrawer from "./SettingsDrawer";
import MegaMenu from "./MegaMenu"; // ✅ MegaMenu 컴포넌트 (드롭다운/메가메뉴)
import "../styles/Header.css";

function Header({ activeMenu, setActiveMenu, resetHeroSection, visitorCount }) {
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  const handleLogoClick = () => {
    setActiveMenu(null);
    resetHeroSection();
  };

  // 메뉴 클릭 시 해당 메뉴 ID를 activeMenu로 저장
  const handleMenuClick = (menuId) => {
    // 이미 열려있는 메뉴를 다시 클릭하면 닫기
    if (activeMenu === menuId) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuId);
    }
  };

  return (
    <>
      <header className="header-container">
        <div
          className="logo-area"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <span className="logo-text">FDC Portal</span>
        </div>

        {/* 상단 네비게이션 메뉴 */}
        <nav className="nav-menu">
          {menuData.map((menu) => (
            <div
              key={menu.id}
              className={`nav-item ${activeMenu === menu.id ? "active" : ""}`}
              onClick={() => handleMenuClick(menu.id)}
            >
              {menu.label}
              {/* 현재 활성 메뉴(클릭된 메뉴)와 같을 때만 MegaMenu 표시 */}
              {activeMenu === menu.id && <MegaMenu subItems={menu.subItems} />}
            </div>
          ))}
        </nav>

        {/* 설정 버튼 */}
        <button
          className="settings-button"
          onClick={() => setShowSettingsDrawer(true)}
        >
          페이지 설정
        </button>
      </header>

      {/* 설정 Drawer (오른쪽 사이드) */}
      <SettingsDrawer
        isOpen={showSettingsDrawer}
        onClose={() => setShowSettingsDrawer(false)}
        visitorCount={visitorCount}
      />
    </>
  );
}

export default Header;
