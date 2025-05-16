import styled from 'styled-components';
import { useCart } from './cart.context';
import { Link } from 'react-router-dom';

const Drawer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 340px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.navBg};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: -2px 0 16px rgba(0,0,0,0.18);
  transform: translateX(${({ open }) => (open ? '0' : '100%')});
  transition: transform 0.3s cubic-bezier(.4,0,.2,1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 24px 20px;
`;

const CloseBtn = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 12px;
`;

const CheckoutButton = styled.button`
  margin-top: 18px;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 0;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s;
  &:hover {
    background: #7c3aed;
  }
`;

const QtyButton = styled.button`
  background: ${({ theme }) => theme.colors.navBg};
  color: ${({ theme }) => theme.colors.primary};
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s, border 0.15s;
  outline: none;
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &:active {
    background: #7c3aed;
    color: #fff;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff5a5f;
  font-size: 0.95rem;
  margin-left: 8px;
  cursor: pointer;
`;

const ClearButton = styled.button`
  margin-top: 10px;
  background: none;
  border: 1px solid #a259ff;
  color: #a259ff;
  border-radius: 6px;
  padding: 6px 0;
  width: 100%;
  font-size: 0.98rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s;
  &:hover {
    background: #a259ff;
    color: #fff;
  }
`;

const CartItemCard = styled.div`
  background: ${({ theme }) => theme.colors.navBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 12px 14px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: box-shadow 0.18s, background 0.18s, transform 0.18s;
  &:hover {
    box-shadow: 0 4px 16px rgba(162, 89, 255, 0.15);
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

const CartList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CartListItem = styled.li`
  margin: 0;
  padding: 0;
`;

const CartDrawer = () => {
  const { items, open, setOpen, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('Checkout not implemented yet!');
  };

  return (
    <Drawer open={open}>
      <CloseBtn onClick={() => setOpen(false)}>&times;</CloseBtn>
      <h3>Your Cart</h3>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>
                      <QtyButton onClick={() => decreaseQty(item.id)}>-</QtyButton>
                      {item.quantity}
                      <QtyButton onClick={() => increaseQty(item.id)}>+</QtyButton>
                    </span>
                    <span style={{ color: '#A259FF', fontWeight: 600 }}>${item.price.toFixed(2)}</span>
                  </div>
                </CartItemCard>
              </CartListItem>
            ))}
          </CartList>
          <div style={{ fontWeight: 600, marginTop: 12 }}>
            Total: <span style={{ color: '#A259FF' }}>${total.toFixed(2)}</span>
          </div>
          <CheckoutButton onClick={handleCheckout}>Checkout</CheckoutButton>
          <ClearButton onClick={clearCart}>Clear Cart</ClearButton>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;