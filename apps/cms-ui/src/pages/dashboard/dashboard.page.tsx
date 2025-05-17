import styled from 'styled-components';
import { Link } from 'react-router-dom';

const WelcomeCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 32px 28px;
  margin: 40px auto;
  max-width: 520px;
  box-shadow: 0 2px 12px rgba(162,89,255,0.07);
  text-align: center;
`;

const Actions = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 24px;
  justify-content: center;
`;

const ActionLink = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 6px;
  padding: 12px 28px;
  font-weight: 600;
  text-decoration: none;
  font-size: 1.08rem;
  transition: background 0.18s;
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

export default function DashboardPage() {
  return (
    <WelcomeCard>
      <h2>Welcome to your Vendor Portal</h2>
      <p>
        Manage your products, view orders, and update your account details all in one place.
      </p>
      <Actions>
        <ActionLink to="/products/new">Add Product</ActionLink>
        <ActionLink to="/products">View Products</ActionLink>
        <ActionLink to="/orders">View Orders</ActionLink>
      </Actions>
    </WelcomeCard>
  );
}