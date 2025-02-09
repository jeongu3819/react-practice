// src/components/Header.jsx
import React from "react";
import menuData from "../data/menuData";
import MegaMenu from "./MegaMenu";
import "../styles/Header.css";

function Header({ activeMenu, setActiveMenu }) {
  const handleMenuClick = (menuId) => {
    if (activeMenu === menuId) {
      setActiveMenu(null); // 다시 클릭하면 닫기
    } else {
      setActiveMenu(menuId); // 새로운 메뉴 선택
    }
  };

  return (
    <>
      <header className="header-container">
        <div className="logo-area">
          <span className="logo-text">MySite</span>
        </div>

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
      </header>

      {/* MegaMenu는 activeMenu가 존재할 때만 보이도록 */}
      {activeMenu && (
        <div className="mega-menu-wrapper">
          <MegaMenu subItems={menuData.find((menu) => menu.id === activeMenu)?.subItems || []} />
        </div>
      )}
    </>
  );
}

export default Header;
