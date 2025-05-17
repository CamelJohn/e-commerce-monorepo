import styled from 'styled-components';
import { useCart } from './cart.context';
import { Link, useNavigate } from 'react-router-dom';

const DrawerOverlay = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(11, 22, 35, 0.55);
  z-index: 999;
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  transition: opacity 0.2s;
`;

const Drawer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 340px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.navBg};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: -4px 0 24px rgba(0,0,0,0.18);
  border-left: 1.5px solid ${({ theme }) => theme.colors.border};
  transform: translateX(${({ open }) => (open ? '0' : '100%')});
  transition: transform 0.28s cubic-bezier(.4,1.2,.4,1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 22px 12px 22px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.navBg};
  position: sticky;
  top: 0;
  z-index: 2;
`;

const DrawerTitle = styled.h3`
  margin: 0;
  font-size: 1.18rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 4px;
  transition: color 0.18s;
  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const DrawerContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 18px 22px;
`;

const CartList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CartListItem = styled.li`
  margin: 0;
  padding: 0;
`;

const CartItemCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 12px 14px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: box-shadow 0.18s, background 0.18s, transform 0.18s;
  &:hover {
    box-shadow: 0 4px 16px rgba(0,173,159,0.13);
    background: ${({ theme }) => theme.colors.navHoverBg};
    transform: translateY(-2px) scale(1.01);
  }
`;

const CartItemTitle = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 1.1rem;
  margin-left: 8px;
  cursor: pointer;
  transition: color 0.18s;
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const QtyControl = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 999px;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  padding: 2px 10px;
  gap: 8px;
  min-width: 80px;
  justify-content: center;
`;

const QtyButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.15rem;
  font-weight: 700;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    outline: none;
  }
  &:active {
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
  }
`;

const QtyValue = styled.span`
  min-width: 22px;
  text-align: center;
  font-size: 1.08rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const DrawerFooter = styled.div`
  padding: 18px 22px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cardBg};
  position: sticky;
  bottom: 0;
  z-index: 2;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.08rem;
  margin-bottom: 18px;
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 0;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background 0.18s;
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    color: #aaa;
    cursor: not-allowed;
  }
`;

const ClearButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  padding: 8px 0;
  width: 100%;
  font-size: 0.98rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`;

const EmptyCart = styled.div`
  color: #aaa;
  text-align: center;
  margin-top: 40px;
`;

const CartDrawer = () => {
  const navigate = useNavigate();
  const { items, open, setOpen, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('checkout');
    setOpen(false);
  };

  return (
    <>
      <DrawerOverlay open={open} onClick={() => setOpen(false)} />
      <Drawer open={open}>
        <DrawerHeader>
          <DrawerTitle>Your Cart</DrawerTitle>
          <CloseBtn onClick={() => setOpen(false)} aria-label="Close cart">&times;</CloseBtn>
        </DrawerHeader>
        <DrawerContent>
          {items.length === 0 ? (
            <EmptyCart>Your cart is empty.</EmptyCart>
          ) : (
            <CartList>
              {items.map((item) => (
                <CartListItem key={item.id}>
                  <CartItemCard>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <CartItemTitle to={`/product/${item.id}`}>{item.name}</CartItemTitle>
                      <RemoveButton onClick={() => removeFromCart(item.id)} title="Remove item">
                        &times;
                      </RemoveButton>
                    </div>
                    <QtyControl>
                      <QtyButton
                        aria-label="Decrease quantity"
                        onClick={() => decreaseQty(item.id)}
                        disabled={item.quantity <= 1}
                        style={{ opacity: item.quantity <= 1 ? 0.5 : 1 }}
                      >−</QtyButton>
                      <QtyValue>{item.quantity}</QtyValue>
                      <QtyButton
                        aria-label="Increase quantity"
                        onClick={() => increaseQty(item.id)}
                      >+</QtyButton>
                    </QtyControl>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#00AD9F', fontWeight: 600 }}>${item.price.toFixed(2)}</span>
                    </div>
                  </CartItemCard>
                </CartListItem>
              ))}
            </CartList>
          )}
        </DrawerContent>
        <DrawerFooter>
          <TotalRow>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </TotalRow>
          <CheckoutButton onClick={handleCheckout} disabled={items.length === 0}>Checkout</CheckoutButton>
          <ClearButton onClick={clearCart} disabled={items.length === 0}>Clear Cart</ClearButton>
        </DrawerFooter>
      </Drawer>
    </>
  );
};

export default CartDrawer;