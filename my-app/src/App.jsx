// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SpotfireContainer from "./components/SpotfireContainer";
import ThreeCanvas from "./components/ThreeCanvas"; // ThreeCanvas 추가
import "./styles/App.css";

function App() {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className="app-container">
      <Header activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* HeroSection이 보일 때 ThreeCanvas도 함께 표시 */}
      <div className={activeMenu ? "hidden" : "visible"} style={{ position: "relative" }}>
        <ThreeCanvas /> {/* ✅ ThreeCanvas 추가 */}
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
