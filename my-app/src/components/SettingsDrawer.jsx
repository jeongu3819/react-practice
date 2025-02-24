import React, { useState } from "react";
import "../styles/SettingsDrawer.css";
import { useNavigate } from "react-router-dom";

function SettingsDrawer({ isOpen, onClose, logs }) {
  const navigate = useNavigate();

  // ✅ (A) 비밀번호 보호 로직을 위한 상태
  const [isAuthorized, setIsAuthorized] = useState(false); // 비밀번호 통과 여부
  const [passwordInput, setPasswordInput] = useState(""); // 사용자 입력한 비밀번호
  const [errorMessage, setErrorMessage] = useState("");   // 잘못된 비밀번호 시 표시할 메시지

  // 예시로 하드코딩된 비밀번호 (실제 운영에서는 .env 파일 혹은 백엔드 확인 권장)
  const CORRECT_PASSWORD = "1234";

  if (!isOpen) return null;

  // ✅ (B) 비밀번호 체크 함수
  const handlePasswordCheck = () => {
    if (passwordInput === CORRECT_PASSWORD) {
      setIsAuthorized(true);
      setErrorMessage("");
    } else {
      setErrorMessage("비밀번호가 틀렸습니다.");
    }
  };

  // (1) 오늘, 이번 주, 이번 달, 이번 해 계산 기준
  const now = new Date();

  // 날짜 비교 헬퍼들...
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  const isSameWeek = (date1, date2) => {
    const diff = Math.abs(date1 - date2);
    return diff < 7 * 24 * 60 * 60 * 1000;
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

  // (2) logs 순회: 오늘/이번주/이번달/이번해
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
    } else if (log.type === "CLICK" && log.subItemTitle) {
      // 메뉴 클릭 통계
      const key = `${log.menuId} - ${log.subItemTitle}`;
      if (isSameDay(logDate, now)) {
        dailyClicks[key] = (dailyClicks[key] || 0) + 1;
      }
      if (isSameWeek(logDate, now)) {
        weeklyClicks[key] = (weeklyClicks[key] || 0) + 1;
      }
      if (isSameMonth(logDate, now)) {
        monthlyClicks[key] = (monthlyClicks[key] || 0) + 1;
      }
      if (isSameYear(logDate, now)) {
        yearlyClicks[key] = (yearlyClicks[key] || 0) + 1;
      }
    }
  });

  // ✅ (C) 실제 Drawer 렌더링
  return (
    <div className="drawer-overlay open">
      <div className="drawer-panel">
        <div className="drawer-header">
          <h3>페이지 설정</h3>
          <button
            className="drawer-close-btn"
            onClick={() => {
              // Drawer 닫을 때 비밀번호 상태 초기화
              setIsAuthorized(false);
              setPasswordInput("");
              setErrorMessage("");
              onClose();
            }}
          >
            X
          </button>
        </div>

        {/* ✅ (D) 비밀번호 인증 전/후에 다른 화면 보여주기 */}
        {!isAuthorized ? (
          <div className="drawer-content">
            <p>설정 페이지에 접근하려면 비밀번호를 입력하세요.</p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="비밀번호"
            />
            <button onClick={handlePasswordCheck}>확인</button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
        ) : (
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
              <h4>메뉴 클릭 수 (오늘)</h4>
              {Object.entries(dailyClicks).map(([key, count]) => (
                <p key={key}>
                  {key} : {count}회
                </p>
              ))}

              <h4>이번주</h4>
              {Object.entries(weeklyClicks).map(([key, count]) => (
                <p key={key}>
                  {key} : {count}회
                </p>
              ))}

              <h4>이번달</h4>
              {Object.entries(monthlyClicks).map(([key, count]) => (
                <p key={key}>
                  {key} : {count}회
                </p>
              ))}

              <h4>올해</h4>
              {Object.entries(yearlyClicks).map(([key, count]) => (
                <p key={key}>
                  {key} : {count}회
                </p>
              ))}
            </div>

            {/* 통계 그래프 페이지 링크 */}
            <div>
              <button onClick={() => navigate("/statistics")}>
                통계 그래프 보기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsDrawer;
