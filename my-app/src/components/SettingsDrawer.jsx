// SettingsDrawer.jsx (간략 예시)
import React from "react";
import "../styles/SettingsDrawer.css";

function SettingsDrawer({ isOpen, onClose, logs }) {
  if (!isOpen) return null;

  // (1) 오늘, 이번 주, 이번 달, 이번 연도 계산을 위한 기준
  const now = new Date();

  // 간단한 헬퍼 함수 예시
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isSameWeek = (date1, date2) => {
    // 주 계산은 지역과 주 시작 요일에 따라 다를 수 있음. 간단히 "ISO week"를 쓰거나,
    // (date1 - date2)의 차이로 7일 범위인지 체크하는 방식도 가능
    // 여기서는 단순히 "7일 이내"로 보는 예시만 보여줄게요.
    const diff = Math.abs(date1 - date2);
    return diff < 7 * 24 * 60 * 60 * 1000; // 7일 이내
  };

  const isSameMonth = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    );
  };

  const isSameYear = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear();
  };

  // (2) logs를 순회하며, 오늘/이번주/이번달/이번해에 해당하는 것만 카운트
  let dailyVisits = 0;
  let weeklyVisits = 0;
  let monthlyVisits = 0;
  let yearlyVisits = 0;

  // 메뉴별 클릭 카운트 (일/주/월/년)
  let dailyClicks = {};
  let weeklyClicks = {};
  let monthlyClicks = {};
  let yearlyClicks = {};

  logs.forEach((log) => {
    const logDate = new Date(log.timestamp);
    if (log.type === "VISIT") {
      // 방문자 통계
      if (isSameDay(logDate, now)) dailyVisits++;
      if (isSameWeek(logDate, now)) weeklyVisits++;
      if (isSameMonth(logDate, now)) monthlyVisits++;
      if (isSameYear(logDate, now)) yearlyVisits++;
    } else if (log.type === "CLICK") {
      // 메뉴 클릭 통계
      const menuId = log.menuId; // 예: 'etch'
      if (isSameDay(logDate, now)) {
        dailyClicks[menuId] = (dailyClicks[menuId] || 0) + 1;
      }
      if (isSameWeek(logDate, now)) {
        weeklyClicks[menuId] = (weeklyClicks[menuId] || 0) + 1;
      }
      if (isSameMonth(logDate, now)) {
        monthlyClicks[menuId] = (monthlyClicks[menuId] || 0) + 1;
      }
      if (isSameYear(logDate, now)) {
        yearlyClicks[menuId] = (yearlyClicks[menuId] || 0) + 1;
      }
    }
  });

  return (
    <div className="drawer-overlay open">
      <div className="drawer-panel">
        <div className="drawer-header">
          <h3>페이지 설정</h3>
          <button className="drawer-close-btn" onClick={onClose}>
            X
          </button>
        </div>

        <div className="drawer-content">
          {/* 방문자 통계 */}
          <div>
            <h4>방문자 수 (오늘/이번주/이번달/이번해)</h4>
            <p>오늘: {dailyVisits}</p>
            <p>이번주: {weeklyVisits}</p>
            <p>이번달: {monthlyVisits}</p>
            <p>이번해: {yearlyVisits}</p>
          </div>

          {/* 메뉴 클릭 통계 */}
          <div>
            <h4>메뉴 클릭 수 (오늘 기준)</h4>
            {Object.entries(dailyClicks).map(([menuId, count]) => (
              <p key={menuId}>
                {menuId} : {count}회
              </p>
            ))}

            <h4>이번주</h4>
            {Object.entries(weeklyClicks).map(([menuId, count]) => (
              <p key={menuId}>
                {menuId} : {count}회
              </p>
            ))}

            <h4>이번달</h4>
            {Object.entries(monthlyClicks).map(([menuId, count]) => (
              <p key={menuId}>
                {menuId} : {count}회
              </p>
            ))}

            <h4>올해</h4>
            {Object.entries(yearlyClicks).map(([menuId, count]) => (
              <p key={menuId}>
                {menuId} : {count}회
              </p>
            ))}
          </div>

          {/* 하단에 그래프 페이지 링크 (React Router 사용 시) */}
          <div>
            <button onClick={() => window.alert("그래프 페이지로 이동!")}>
              통계 그래프 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsDrawer;
