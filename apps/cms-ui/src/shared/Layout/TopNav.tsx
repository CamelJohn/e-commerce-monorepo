import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const NavBar = styled.nav`
  height: ${({ theme }) => theme.layout.navHeight};
  background: ${({ theme }) => theme.colors.navBg};
  box-shadow: ${({ theme }) => theme.colors.navShadow};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Brand = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.font.brandSize};
  font-weight: ${({ theme }) => theme.font.brandWeight};
  text-decoration: none;
  letter-spacing: 1px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 28px;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.text};
  font-weight: 500;
  text-decoration: none;
  padding: 4px 0;
  border-bottom: 2px solid ${({ theme, $active }) => $active ? theme.colors.primary : 'transparent'};
  transition: color 0.18s, border-bottom 0.18s;
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const TopNav = () => {
  const location = useLocation();

  return (
    <NavBar>
      <Brand to="/">Storefront Vendor Portal</Brand>
      <NavLinks>
        <NavLink to="/" $active={location.pathname === '/'}>Dashboard</NavLink>
        <NavLink to="/subscriptions" $active={location.pathname.startsWith('/subscriptions')}>Subscriptions</NavLink>
        <NavLink to="/products" $active={location.pathname.startsWith('/products')}>Products</NavLink>
        <NavLink to="/orders" $active={location.pathname.startsWith('/orders')}>Orders</NavLink>
        <NavLink to="/account" $active={location.pathname.startsWith('/account')}>Account</NavLink>
      </NavLinks>
    </NavBar>
  );
};