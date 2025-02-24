// src/App.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SpotfireContainer from "./components/SpotfireContainer"; // 메뉴별 Spotfire
import CardMenuItem from "./components/CardMenuItem"; // 우리가 수정한 컴포넌트
import menuData from "./data/menuData";
import SettingsDrawer from "./components/SettingsDrawer";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StatisticsPage from "./components/StatisticsPage"; // 통계 페이지 추가

function MainPage({ activeMenu, setActiveMenu, logs, addLog, showSettingsDrawer, setShowSettingsDrawer }) {
  // 선택된 메뉴 정보
  const selectedMenu = menuData.find((menu) => menu.id === activeMenu);

  const handleCardClick = (menuId, subItem) => {
    addLog({
      type: "CLICK",
      menuId,
      subItemTitle: subItem.title,
    });
    if (subItem.link) {
      window.open(subItem.link, "_blank");
    }
  };

  return (
    <div className="app-container">
      <Header
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        resetHeroSection={() => setActiveMenu(null)}
        visitorCount={999}
        onOpenSettings={() => setShowSettingsDrawer(true)}
      />

      {!activeMenu && <HeroSection />}

      {activeMenu && (
        <div className="card-container">
          {selectedMenu?.subItems.map((item) => (
            <CardMenuItem
              key={item.id}
              title={item.title}
              text={item.text}
              link={item.link}
              onCardClick={() => handleCardClick(activeMenu, item)}
            />
          ))}

          <SpotfireContainer activeMenu={activeMenu} />
        </div>
      )}

      <SettingsDrawer
        isOpen={showSettingsDrawer}
        onClose={() => setShowSettingsDrawer(false)}
        logs={logs}
      />
    </div>
  );
}

function App() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [logs, setLogs] = useState([]);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  // 예: 로컬 스토리지에서 logs를 불러오고, 방문자 기록을 남긴다
  useEffect(() => {
    // 불러오기
    const storedLogs = localStorage.getItem("fdcLogs");
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
    // 방문 로그 (원하시면 하루 1회만 증가 로직으로 대체)
    addLog({ type: "VISIT" });
  }, []);

  // logs 바뀔 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("fdcLogs", JSON.stringify(logs));
  }, [logs]);

  // 로그 추가 함수
  const addLog = (logData) => {
    setLogs((prev) => [
      ...prev,
      {
        ...logData,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // 메뉴 클릭 시
  /*const handleMenuClick = (menuId) => {
    setActiveMenu((prev) => (prev === menuId ? null : menuId));
  };*/

  // CardMenuItem 클릭 시 (링크 열기 + 로그 기록)
  const handleCardClick = (menuId, subItem) => {
    // 로그
    addLog({
      type: "CLICK",
      menuId,
      subItemTitle: subItem.title, // Subitem의 title도 저장
    });
    // 새 탭 열기
    if (subItem.link) {
      window.open(subItem.link, "_blank");
    }
  };

  // 선택된 메뉴 정보
  const selectedMenu = menuData.find((menu) => menu.id === activeMenu);

  return (
    <Router>
      <div className="app-container">
        <Header
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          resetHeroSection={() => setActiveMenu(null)}
          visitorCount={999}
          onOpenSettings={() => setShowSettingsDrawer(true)}
        />

        <Routes>
          {/* 메인 페이지 (기본 페이지) */}
          <Route
            path="/"
            element={
              <MainPage
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                logs={logs}
                addLog={addLog}
                showSettingsDrawer={showSettingsDrawer}
                setShowSettingsDrawer={setShowSettingsDrawer}
              />
            }
          />
          {/* 통계 페이지 (StatisticsPage) */}
          <Route path="/statistics" element={<StatisticsPage logs={logs} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
