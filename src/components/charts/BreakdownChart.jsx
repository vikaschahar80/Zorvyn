import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6'];

const BreakdownChart = ({ data }) => {
  // Extract category totals from data
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value
  })).sort((a, b) => b.value - a.value);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <p className="text-[var(--color-text-muted)] m-0 text-sm">{payload[0].name}</p>
          <p style={{ margin: 0, fontWeight: 600 }}>
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  if(chartData.length === 0) {
      return <div className="flex items-center justify-center h-full text-[var(--color-text-muted)]">No expenses yet</div>
  }

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BreakdownChart;
