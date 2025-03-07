import React from "react";
import styled, { useTheme } from "styled-components";
import { FiMoon, FiSun } from "react-icons/fi";

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border: 2px solid ${({ theme }) => theme.border};
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

const DarkModeToggle: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.mode === "dark";

  return (
    <ToggleButton onClick={theme.toggleTheme}>
      {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
      {isDark ? "Light Mode" : "Dark Mode"}
    </ToggleButton>
  );
};

export default DarkModeToggle;