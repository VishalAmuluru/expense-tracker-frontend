import React from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const ChartContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  height: 400px;
`;

const Home: React.FC = () => {
  const data = [
    { month: 'Jan', expense: 4000, budget: 2400 },
    { month: 'Feb', expense: 3000, budget: 1398 },
    { month: 'Mar', expense: 2000, budget: 9800 },
  ];

  return (
    <div>
      <StatsGrid>
        <StatCard>
          <h3>$12,450</h3>
          <p>Total Expenses</p>
        </StatCard>
        <StatCard>
          <h3>$8,200</h3>
          <p>Monthly Budget</p>
        </StatCard>
      </StatsGrid>

      <ChartContainer>
        <h3>Monthly Overview</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="expense" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default Home;