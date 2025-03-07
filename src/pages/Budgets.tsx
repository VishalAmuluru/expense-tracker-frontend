// src/pages/Budgets.tsx
import React from 'react';
import styled from 'styled-components';
import BudgetForm from '../components/BudgetForm';
import { FiPieChart, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

const BudgetsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const BudgetLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
`;

const StatsCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 2rem;
`;

const BudgetStats = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.statBg};
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ProgressBar = styled.div<{ percentage: number }>`
  height: 8px;
  background: ${({ theme }) => theme.progressBg};
  border-radius: 4px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ percentage }) => percentage}%;
    background: ${({ theme }) => theme.primary};
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

const Budgets: React.FC = () => {
  // Example data - replace with real data
  const budgetStats = [
    { category: 'Housing', used: 1200, limit: 2000 },
    { category: 'Food', used: 800, limit: 1000 },
    { category: 'Transportation', used: 300, limit: 500 }
  ];

  return (
    <BudgetsContainer>
      <SectionTitle>
        <FiTrendingUp size={24} />
        Budget Management
      </SectionTitle>

      <BudgetLayout>
        <FormCard>
          <SectionTitle>
            <FiDollarSign size={20} />
            Create New Budget
          </SectionTitle>
          <BudgetForm onSuccess={() => console.log('Budget created')} />
        </FormCard>

        <StatsCard>
          <SectionTitle>
            <FiPieChart size={20} />
            Budget Utilization
          </SectionTitle>
          
          <BudgetStats>
            {budgetStats.map((stat, index) => (
              <div key={index}>
                <StatItem>
                  <div>
                    <h4>{stat.category}</h4>
                    <small>${stat.used} / ${stat.limit}</small>
                  </div>
                  <span>{Math.round((stat.used / stat.limit) * 100)}%</span>
                </StatItem>
                <ProgressBar percentage={(stat.used / stat.limit) * 100} />
              </div>
            ))}
          </BudgetStats>
        </StatsCard>
      </BudgetLayout>
    </BudgetsContainer>
  );
};

export default Budgets;