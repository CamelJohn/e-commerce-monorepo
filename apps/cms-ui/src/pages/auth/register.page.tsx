import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 80px auto;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 32px 28px;
  box-shadow: 0 2px 12px rgba(162,89,255,0.07);

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 28px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 95%;
  padding: 9px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  margin-bottom: 18px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 0;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s;
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const ErrorMsg = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  margin-bottom: 16px;
  text-align: center;
`;

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    // Replace with real registration logic
    navigate('/login');
  };

  return (
    <RegisterContainer>
      <Title>Vendor Registration</Title>
      <form onSubmit={handleSubmit}>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Label htmlFor="confirm">Confirm Password</Label>
        <Input
          id="confirm"
          type="password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        <Button type="submit">Register</Button>
        <NavLink to="/auth/login" style={{ textAlign: 'center', marginTop: '16px', display: 'block' }}>
          Already have an account? Login here
        </NavLink>
      </form>
    </RegisterContainer>
  );
}