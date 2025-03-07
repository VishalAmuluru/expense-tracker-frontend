// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FiHome, FiDollarSign, FiPieChart } from "react-icons/fi";
import styled, { createGlobalStyle, ThemeProvider, DefaultTheme } from "styled-components";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import Budgets from "./pages/Budgets";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Extend the DefaultTheme interface
declare module "styled-components" {
  export interface DefaultTheme {
    body: string;
    text: string;
  }
}

/* ----------------------------------
 * 1. Global Styles & Themes
 * ---------------------------------- */
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    transition: background-color 0.3s ease, color 0.3s ease;
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  }
`;

const lightTheme: DefaultTheme = {
  body: "#f8fafc", // Light background
  text: "#1f2937",
  formBg: "",
  cardBg: "",
  border: "",
  primary: "",
  primaryDark: "",
  textSecondary: "",
  error: "",
  statBg: "",
  progressBg: ""
};

const darkTheme: DefaultTheme = {
  body: "#1f2937", // Dark background
  text: "#f8fafc",
  formBg: "",
  cardBg: "",
  border: "",
  primary: "",
  primaryDark: "",
  textSecondary: "",
  error: "",
  statBg: "",
  progressBg: ""
};

/* ----------------------------------
 * 2. Styled Components
 * ---------------------------------- */
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const Header = styled.header`
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #e2e8f0;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    border-color: #bfdbfe;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid transparent;

  &:hover {
    color: #3b82f6;
    background: #f1f5f9;
    border-color: #bfdbfe;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 6rem 2rem 5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Footer = styled.footer`
  background: white;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e2e8f0;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #64748b;
  font-size: 0.875rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    color: #64748b;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #3b82f6;
    }
  }
`;

/* ----------------------------------
 * 3. Theme Toggle Button
 * ---------------------------------- */
const ToggleThemeButton = styled.button`
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #2563eb;
  }
`;

/* ----------------------------------
 * 4. Main App Component
 * ---------------------------------- */
const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Choose the current theme
  const currentTheme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Router>
        <Layout>
          <Header>
            <Nav>
              <Brand to="/">
                <FiDollarSign /> FinTrack
              </Brand>
              <NavLinks>
                <NavLink to="/">
                  <FiHome /> Home
                </NavLink>
                <NavLink to="/expenses">
                  <FiDollarSign /> Expenses
                </NavLink>
                <NavLink to="/budgets">
                  <FiPieChart /> Budgets
                </NavLink>
                {/* Toggle theme button in the nav */}
                <ToggleThemeButton onClick={toggleTheme}>
                  {isDark ? "Light Mode" : "Dark Mode"}
                </ToggleThemeButton>
              </NavLinks>
            </Nav>
          </Header>

          <MainContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </MainContent>

          <Footer>
            <FooterContent>
              <div>© 2024 FinTrack. All rights reserved.</div>
              <FooterLinks>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/contact">Contact Us</Link>
              </FooterLinks>
            </FooterContent>
          </Footer>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;