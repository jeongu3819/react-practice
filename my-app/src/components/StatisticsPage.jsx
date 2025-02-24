import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Chart.js v3 이상에서 필요

function StatisticsPage({ logs }) {
  // Subitem 클릭 횟수 집계
  let subItemClicks = {};

  logs.forEach((log) => {
    if (log.type === "CLICK" && log.subItemTitle) {
      const key = `${log.menuId} - ${log.subItemTitle}`;
      subItemClicks[key] = (subItemClicks[key] || 0) + 1;
    }
  });

  // 그래프 데이터 생성
  const data = {
    labels: Object.keys(subItemClicks),
    datasets: [
      {
        label: "클릭 횟수",
        data: Object.values(subItemClicks),
        backgroundColor: "rgba(59, 130, 246, 0.7)", // 파란색
      },
    ],
  };

  return (
    <div>
      <h2>Subitem 클릭 통계</h2>
      <Bar data={data} />
      <button onClick={() => window.history.back()}>돌아가기</button>
    </div>
  );
}

export default StatisticsPage;
