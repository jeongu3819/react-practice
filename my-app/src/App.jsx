// src/App.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SpotfireContainer from "./components/SpotfireContainer";
import HeroSection from "./components/HeroSection";
import "./styles/App.css";
import MegaMenu from "./components/MegaMenu"; // ✅ MegaMenu import 추가
import menuData from "./data/menuData"; // ✅ menuData import 추가

function App() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [heroKey, setHeroKey] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0); // ✅ 방문자 수 상태 추가

  useEffect(() => {
    const storedCount = localStorage.getItem("visitorCount");
    const lastVisitDate = localStorage.getItem("lastVisitDate");
    const today = new Date().toISOString().split("T")[0]; // ✅ 현재 날짜 (YYYY-MM-DD 형식)

    if (lastVisitDate !== today) {
      // ✅ 하루에 한 번만 방문자 수 증가
      const newCount = storedCount ? parseInt(storedCount, 10) + 1 : 1;
      localStorage.setItem("visitorCount", newCount);
      localStorage.setItem("lastVisitDate", today); // ✅ 방문 날짜 갱신
      setVisitorCount(newCount);
    } else {
      setVisitorCount(storedCount ? parseInt(storedCount, 10) : 1); // ✅ 기존 값 유지
    }
  }, []);

  const resetHeroSection = () => {
    setActiveMenu(null);
    setHeroKey((prevKey) => prevKey + 1);
  };

  // ✅ 현재 활성화된 메뉴의 subItems 가져오기 (수정된 부분)
  const currentMenu = menuData.find((menu) => menu.id === activeMenu) || {};
  const subItems = currentMenu.subItems || []; // `undefined` 방지

  return (
    <div className="app-container">
      <Header
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        resetHeroSection={resetHeroSection}
        visitorCount={visitorCount} // ✅ 방문자 수 전달
      />
      {/* 2) 메가메뉴 (activeMenu가 있을 때만 렌더링) */}
      {activeMenu && <MegaMenu subItems={subItems} />}

      {/* 3) Hero/Spotfire 영역 전환 */}
      <div className={activeMenu ? "hidden" : "visible"}>
        <HeroSection />
      </div>
      <div className={activeMenu ? "visible" : "hidden"}>
        {activeMenu && <SpotfireContainer />}
      </div>
    </div>
  );
}

export default App;
