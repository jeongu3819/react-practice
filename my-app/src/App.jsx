// src/App.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import menuData from "./data/menuData";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StatisticsPage from "./components/StatisticsPage"; // 통계 페이지 추가
import MainPage from "./components/MainPage";

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
          <Route path="/statistics" element={<StatisticsPage logs={logs} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
