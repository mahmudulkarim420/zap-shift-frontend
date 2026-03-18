'use client';

import React from 'react';

const AnalyticsChart = () => {
  // Mock data for the chart
  const data = [30, 45, 35, 60, 50, 80, 70, 95, 85, 110, 100, 130];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const maxValue = Math.max(...data);
  const chartHeight = 160;
  const chartWidth = 600;
  
  // Calculate points for the polyline
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * chartWidth;
    const y = chartHeight - (val / maxValue) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  // Area points (for the gradient fill)
  const areaPoints = `0,${chartHeight} ${points} ${chartWidth},${chartHeight}`;

  return (
    <div className="w-full mt-6">
      <div className="relative h-64 w-full bg-white rounded-2xl border border-gray-100 p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-gray-800 uppercase tracking-tight">Growth Analytics</h4>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              +24% Volume
            </span>
          </div>
        </div>

        <div className="relative h-40 mt-2">
          {/* Grid Lines */}
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="absolute w-full border-t border-gray-50" 
              style={{ top: `${(i / 3) * 100}%` }}
            />
          ))}

          <svg 
            viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
            className="absolute inset-0 w-full h-full drop-shadow-lg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C8FF65" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#C8FF65" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Gradient Area */}
            <polygon 
              points={areaPoints} 
              fill="url(#chartGradient)"
              className="transition-all duration-1000 ease-in-out"
            />

            {/* Line */}
            <polyline
              points={points}
              fill="none"
              stroke="#033C3F"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-1000 ease-in-out"
            />
            
            {/* Interactive Points */}
            {data.map((val, i) => {
              const x = (i / (data.length - 1)) * chartWidth;
              const y = chartHeight - (val / maxValue) * chartHeight;
              return (
                <g key={i} className="group/dot">
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#C8FF65"
                    stroke="#033C3F"
                    strokeWidth="2"
                    className="opacity-0 group-hover/dot:opacity-100 transition-opacity"
                  />
                  <rect
                    x={x - 20}
                    y={y - 30}
                    width="40"
                    height="20"
                    rx="4"
                    fill="#033C3F"
                    className="opacity-0 group-hover/dot:opacity-100 transition-opacity"
                  />
                  <text
                    x={x}
                    y={y - 17}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                    className="opacity-0 group-hover/dot:opacity-100 transition-opacity"
                  >
                    {val}%
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-4">
          {months.map((month, i) => (
            <span key={i} className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              {month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
