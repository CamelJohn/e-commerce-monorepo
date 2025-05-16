import { Link, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../cart/cart.context';

const Nav = styled.nav`
  background: ${({ theme }) => theme.colors.navBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.colors.navShadow};
  padding: 0 32px;
  height: ${({ theme }) => theme.layout.navHeight};
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: ${({ theme }) => theme.font.size};
`;

const Brand = styled.div`
  font-weight: ${({ theme }) => theme.font.brandWeight};
  font-size: ${({ theme }) => theme.font.brandSize};
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 1px;
  margin-right: 40px;
`;

interface INavLinkProps {
  $active?: boolean;
}

const NavLink = styled(Link)<INavLinkProps>`
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.font.weight};
  padding: 6px 12px;
  border-radius: 6px;
  background: ${({ $active, theme }) => ($active ? theme.colors.navActiveBg : 'transparent')};
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.navHoverBg};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CartLinkWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const CartButton = styled.button<{ $active?: boolean }>`
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  background: ${({ $active, theme }) => ($active ? theme.colors.navActiveBg : 'none')};
  border: none;
  font: inherit;
  font-weight: ${({ theme }) => theme.font.weight};
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.navHoverBg};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -8px;
  background: #a259ff;
  color: #fff;
  border-radius: 50%;
  font-size: 0.72rem;
  font-weight: bold;
  padding: 0;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  line-height: 1;
`;

const Main = styled.main`
  padding: ${({ theme }) => theme.layout.mainPadding};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: calc(100vh - ${({ theme }) => theme.layout.navHeight});
`;

const MainLayout = () => {
  const location = useLocation();
  const { items, setOpen, open } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Nav>
        <Brand>Storefront</Brand>
        <NavLink to="/" $active={location.pathname === '/'}>Home</NavLink>
        <NavLink to="/product" $active={location.pathname.startsWith('/product') || location.pathname === '/products'}>Products</NavLink>
        <NavLink to="/vendor" $active={location.pathname.startsWith('/vendor') || location.pathname === '/vendors'}>Vendors</NavLink>
        <CartLinkWrapper>
          <CartButton onClick={() => setOpen(true)} $active={open}>
            Cart
          </CartButton>
          {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
        </CartLinkWrapper>
      </Nav>
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default MainLayout;