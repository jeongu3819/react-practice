import React from "react";
import HeroSection from "./HeroSection";
import SpotfireContainer from "./SpotfireContainer";
import CardMenuItem from "./CardMenuItem";
import menuData from "../data/menuData";
import SettingsDrawer from "./SettingsDrawer";

function MainPage({ activeMenu, setActiveMenu, logs, addLog, showSettingsDrawer, setShowSettingsDrawer }) {
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
    <div className="main-container">  {/* ✅ 기존 App.css 내 스타일을 사용하면 됨 */}
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

export default MainPage;
