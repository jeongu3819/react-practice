// src/components/Header.jsx
import React from "react";
import menuData from "../data/menuData";
import "../styles/Header.css";

function Header({ activeMenu, setActiveMenu, resetHeroSection, visitorCount, onOpenSettings }) {

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
            </div>
          ))}
        </nav>

        {/* 설정 버튼 */}
        <button className="settings-button" onClick={onOpenSettings}>
          페이지 설정
        </button>
      </header>
    </>
  );
}

export default Header;
