import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiDollarSign, FiCalendar, FiTag } from 'react-icons/fi';
import api from '../services/api';
import { Budget } from '../types';

interface BudgetFormProps {
  onSuccess: () => void;
  existingBudget?: Budget;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ onSuccess, existingBudget }) => {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState<number>(0);
  const [month, setMonth] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingBudget) {
      setCategory(existingBudget.category);
      setLimit(existingBudget.limit);
      setMonth(existingBudget.month);
    }
  }, [existingBudget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const method = existingBudget ? 'put' : 'post';
      const url = existingBudget ? `/api/budgets/${existingBudget.id}` : '/api/budgets';
      
      await api[method](url, { category, limit, month });
      onSuccess();
      
      if (!existingBudget) {
        setCategory('');
        setLimit(0);
        setMonth('');
      }
    } catch (err) {
      setError('Failed to save budget. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>
        <FiTag />
        {existingBudget ? 'Update Budget' : 'New Budget Plan'}
      </FormTitle>

      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup>
            <InputLabel>
              <FiTag size={16} />
              Category
            </InputLabel>
            <StyledSelect
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Housing">Housing</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities">Utilities</option>
            </StyledSelect>
          </FormGroup>

          <FormGroup>
            <InputLabel>
              <FiCalendar size={16} />
              Budget Month
            </InputLabel>
            <StyledInput
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <InputLabel>
              <FiDollarSign size={16} />
              Monthly Limit
            </InputLabel>
            <StyledInput
              type="number"
              min="0"
              step="1"
              value={limit || ""}
              onChange={(e) => setLimit(Number(e.target.value))}
              placeholder="Enter amount"
              required
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Processing...' : (existingBudget ? 'Update Budget' : 'Create Budget')}
          </SubmitButton>
        </FormGrid>
      </form>
    </FormContainer>
  );
};

export default BudgetForm;

const FormContainer = styled.div`
  background: ${({ theme }) => theme.formBg};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const FormTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 600;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(2, 1fr);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.8rem 1rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
    outline: none;
  }

  &[type="number"] {
    appearance: textfield;
    &::-webkit-inner-spin-button {
      appearance: none;
    }
  }
`;

const StyledSelect = styled(StyledInput).attrs({ as: 'select' })`
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.primaryDark};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.error};
  font-size: 0.9rem;
  margin-top: 0.5rem;
  grid-column: 1 / -1;
`;
