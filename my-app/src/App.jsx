// src/App.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SpotfireContainer from "./components/SpotfireContainer"; // 메뉴별 Spotfire
import CardMenuItem from "./components/CardMenuItem"; // 우리가 수정한 컴포넌트
import menuData from "./data/menuData";
import SettingsDrawer from "./components/SettingsDrawer";
import "./styles/App.css";

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
  const handleMenuClick = (menuId) => {
    setActiveMenu((prev) => (prev === menuId ? null : menuId));
  };

  // CardMenuItem 클릭 시 (링크 열기 + 로그 기록)
  const handleCardClick = (menuId, subItem) => {
    // 로그
    addLog({
      type: "CLICK",
      menuId,
      subItemId: subItem.id,
    });
    // 새 탭 열기
    if (subItem.link) {
      window.open(subItem.link, "_blank");
    }
  };

  // 선택된 메뉴 정보
  const selectedMenu = menuData.find((menu) => menu.id === activeMenu);

  return (
    <div className="app-container">
      <Header
        // Header에서 activeMenu, setActiveMenu를 직접 사용해도 되고,
        // 혹은 handleMenuClick만 넘겨줘도 됨.
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        // 오른쪽 상단 설정 버튼
        resetHeroSection={() => setActiveMenu(null)}
        visitorCount={999} // (예시로, logs에서 계산해도 됨)
        onOpenSettings={() => setShowSettingsDrawer(true)}
      />

      {/* HeroSection: activeMenu가 없을 때만 보이도록 */}
      {!activeMenu && <HeroSection />}

      {/* activeMenu가 있으면 subItems를 CardMenuItem으로 표시 */}
      {activeMenu && (
        <div className="card-container">
          {/* subItems를 CardMenuItem으로 렌더링 */}
          {selectedMenu?.subItems.map((item) => (
            <CardMenuItem
              key={item.id}
              title={item.title}
              text={item.text}
              link={item.link}
              onCardClick={() => handleCardClick(activeMenu, item)}
            />
          ))}

          {/* SpotfireContainer를 메뉴별로 보이게 할 수도 있음 */}
          <SpotfireContainer activeMenu={activeMenu} />
        </div>
      )}

      {/* SettingsDrawer에서 logs를 받아서 통계 */}
      <SettingsDrawer
        isOpen={showSettingsDrawer}
        onClose={() => setShowSettingsDrawer(false)}
        logs={logs}
      />
    </div>
  );
}

export default App;
