import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../cart/cart.context';

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

const CartButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 6px;
  padding: 6px 16px;
  font-weight: 600;
  border: none;
  margin-left: 18px;
  cursor: pointer;
  position: relative;
  transition: background 0.18s;
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -7px;
  right: -7px;
  background: ${({ theme }) => theme.colors.danger};
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.92rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.14);
  padding: 0;
`;

export const TopNav = () => {
  const location = useLocation();
  const { setOpen, items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <NavBar>
      <Brand to="/">Storefont</Brand>
      <NavLinks>
        <NavLink to="/product" $active={location.pathname.startsWith('/products')}>Products</NavLink>
        <NavLink to="/vendor" $active={location.pathname.startsWith('/vendors')}>Vendors</NavLink>
        <CartButton onClick={() => setOpen(true)}>
          Cart
          {count > 0 && <CartCount>{count}</CartCount>}
        </CartButton>
      </NavLinks>
    </NavBar>
  );
};