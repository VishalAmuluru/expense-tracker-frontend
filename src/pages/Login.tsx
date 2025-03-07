import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';

const LoginContainer = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  padding: 2.5rem;
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  
  &::placeholder {
    color: #adb5bd;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #5563de;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #4452b8;
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Updated endpoint includes /api prefix
      const res = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('accessToken', res.data.accessToken);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <LoginButton type="submit">Sign In</LoginButton>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
