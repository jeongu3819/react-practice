// src/components/Header.jsx
import React from "react";
import menuData from "../data/menuData";
import MegaMenu from "./MegaMenu";
import "../styles/Header.css";

function Header({ activeMenu, setActiveMenu }) {
  const handleLogoClick = () => {
    setActiveMenu(null); // ✅ 클릭 시 초기 화면(HeroSection)으로 변경
  };

  return (
    <>
      <header className="header-container">
        {/* 로고 클릭 시 초기 화면으로 이동 */}
        <div className="logo-area" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <span className="logo-text">FDC Portal</span>
        </div>

        <nav className="nav-menu">
          {menuData.map((menu) => (
            <div
              key={menu.id}
              className={`nav-item ${activeMenu === menu.id ? "active" : ""}`}
              onClick={() => setActiveMenu(menu.id)}
            >
              {menu.label}
            </div>
          ))}
        </nav>
      </header>

      {/* ✅ MegaMenu를 헤더 아래에서 단일하게 유지 */}
      {activeMenu && (
        <div className="mega-menu-wrapper">
          <MegaMenu subItems={menuData.find((menu) => menu.id === activeMenu)?.subItems || []} />
        </div>
      )}
    </>
  );
}

export default Header;
