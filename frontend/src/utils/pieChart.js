 
import React from "react";

export const generatePieChart = (budget) => {
  const total = Object.values(budget).reduce((sum, value) => sum + value, 0);
  let cumulativePercent = 0;

  const segments = Object.keys(budget).map((category, index) => {
    const percent = budget[category];
    const angle = (percent / total) * 360;
    const colorClass = [
      "text-indigo-500",
      "text-green-500",
      "text-yellow-500",
      "text-red-500",
    ][index % 4];

    const startX = 50 + Math.sin((2 * Math.PI * cumulativePercent) / 100) * 40;
    const startY = 50 - Math.cos((2 * Math.PI * cumulativePercent) / 100) * 40;
    cumulativePercent += percent;
    const endX = 50 + Math.sin((2 * Math.PI * cumulativePercent) / 100) * 40;
    const endY = 50 - Math.cos((2 * Math.PI * cumulativePercent) / 100) * 40;

    const largeArcFlag = angle > 180 ? 1 : 0;
    const pathData = `M 50,50 L ${startX},${startY} A 40,40 0 ${largeArcFlag},1 ${endX},${endY} Z`;

    return {
      pathData,
      colorClass,
      category,
      percent,
    };
  });

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {segments.map((segment, index) => (
        <path
          key={index}
          d={segment.pathData}
          fill="currentColor"
          className={segment.colorClass.replace("text-", "fill-")}
          stroke="white"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
};