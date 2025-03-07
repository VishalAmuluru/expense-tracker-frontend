import React from 'react';
import styled from 'styled-components';
import { FiSearch, FiPlus } from 'react-icons/fi';

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem 1.5rem;
    text-align: left;
    border-bottom: 1px solid #f1f5f9;
  }

  th {
    background: #f8fafc;
    color: #64748b;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.75rem;
  }

  td {
    color: #1e293b;
  }

  tr:hover {
    background: #f8fafc;
  }
`;

const SearchInput = styled.div`
  position: relative;
  
  input {
    padding: 0.5rem 1rem 0.5rem 2rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    width: 240px;
  }
  
  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #2563eb;
  }
`;

const Expenses: React.FC = () => {
  return (
    <TableContainer>
      <TableHeader>
        <SearchInput>
          <FiSearch />
          <input 
            type="text" 
            placeholder="Search expenses..." 
          />
        </SearchInput>
        <AddButton>
          <FiPlus /> Add Expense
        </AddButton>
      </TableHeader>
      
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Add table rows here */}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default Expenses;