import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "../styles/StatisticsPage.css";

function StatisticsPage({ logs }) {
  const navigate = useNavigate();

  // ✅ 기간 선택 상태: "day", "week", "month", "year"
  const [selectedRange, setSelectedRange] = useState("day");
  const [chartData, setChartData] = useState([]);

  // 날짜 비교를 위한 헬퍼 함수들
  const now = new Date();

  const isSameDay = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  // 이번 주는 "7일 이내"로 간단 처리 (정확한 "이번 주(월~일)"가 필요하면 별도 로직 사용)
  const isWithin7Days = (date1, date2) => {
    const diff = Math.abs(date1 - date2);
    return diff < 7 * 24 * 60 * 60 * 1000; // 7일 이내
  };

  // 이번 달은 "월이 동일한지"로 처리
  const isSameMonth = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth();

  // 올해는 "연도가 동일한지"로 처리
  const isSameYear = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear();

  useEffect(() => {

    if (!logs || logs.length === 0) {
      console.warn("🚨 로그 데이터가 비어 있음!");
      setChartData([]);
      return;
    }

    // 1) "CLICK" + subItemTitle이 있는 로그만 추려낸다
    const clickLogs = logs.filter(
      (log) => log.type === "CLICK" && log.subItemTitle
    );

    // 2) 기간(selectedRange)에 맞게 필터링
    const filteredLogs = clickLogs.filter((log) => {
      const logDate = new Date(log.timestamp);

      if (selectedRange === "day") {
        return isSameDay(logDate, now);
      } else if (selectedRange === "week") {
        return isWithin7Days(logDate, now);
      } else if (selectedRange === "month") {
        return isSameMonth(logDate, now);
      } else if (selectedRange === "year") {
        return isSameYear(logDate, now);
      }
      return false; // 혹은 기본값
    });

    // 3) subItemTitle 기준으로 클릭 횟수 집계
    const clickCounts = {};
    filteredLogs.forEach((log) => {
      const key = `${log.menuId} - ${log.subItemTitle}`;
      clickCounts[key] = (clickCounts[key] || 0) + 1;
    });

    // 4) Recharts용 데이터: [{ name: "etch - Etch Overview", count: 5 }, ...]
    const chartDataArr = Object.entries(clickCounts).map(([key, value]) => ({
      name: key,
      count: value,
    }));

    setChartData(chartDataArr);
  }, [logs, selectedRange]);

  return (
    <div className="statistics-container">
      <h2 className="statistics-title">Subitem 클릭 통계</h2>

      {/* ✅ 기간 선택 Dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>기간 선택:</label>
        <select value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)}>
          <option value="day">오늘</option>
          <option value="week">이번 주</option>
          <option value="month">이번 달</option>
          <option value="year">올해</option>
        </select>
      </div>

      <div className="chart-container">
        {chartData.length > 0 ? (
          <BarChart width={800} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" /> {/* name 필드를 X축 라벨로 사용 */}
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        ) : (
          <p>차트에 표시할 데이터가 없습니다.</p>
        )}
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>
        돌아가기
      </button>
    </div>
  );
}

export default StatisticsPage;
