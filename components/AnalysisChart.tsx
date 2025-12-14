import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface AnalysisChartProps {
  score: number;
}

const AnalysisChart: React.FC<AnalysisChartProps> = ({ score }) => {
  const data = [{ name: 'Score', value: score }];
  
  const getColor = (s: number) => {
     if (s >= 85) return '#059669'; // emerald-600 (Mükemmel)
     if (s >= 70) return '#10b981'; // emerald-500 (İyi)
     if (s >= 60) return '#f59e0b'; // amber-500 (Orta)
     return '#dc2626'; // red-600 (Kötü)
  };

  return (
    <div className="relative w-56 h-56">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          innerRadius="80%" 
          outerRadius="100%" 
          barSize={20} 
          data={data} 
          startAngle={90} 
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: '#f1f5f9' }}
            dataKey="value"
            cornerRadius={50}
            fill={getColor(score)}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className={`text-6xl font-bold tracking-tighter ${
            score >= 70 ? 'text-emerald-600' : score >= 60 ? 'text-amber-500' : 'text-red-600'
        }`}>
          {score}
        </span>
        <span className="text-base text-slate-400 font-medium mt-2">100 Üzerinden</span>
      </div>
    </div>
  );
};

export default AnalysisChart;