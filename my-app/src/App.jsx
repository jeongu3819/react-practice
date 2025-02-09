// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SpotfireContainer from "./components/SpotfireContainer";
import "./styles/App.css";

function App() {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className="app-container">
      <Header activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* HeroSection: 메뉴가 선택되지 않았을 때만 보이도록 설정 */}
      <div className={activeMenu ? "hidden" : "visible"}>
        <HeroSection />
      </div>

      {/* SpotfireContainer: 메뉴가 선택되었을 때만 보이도록 설정 */}
      <div className={activeMenu ? "visible" : "hidden"}>
        {activeMenu && <SpotfireContainer activeMenu={activeMenu} />}
      </div>
    </div>
  );
}

export default App;
