import { useCart } from '../cart/cart.context';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

const CheckoutContainer = styled.div`
  max-width: 520px;
  margin: 40px auto;
  background: ${({ theme }) => theme.colors.navBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 32px 28px;
  box-shadow: 0 2px 12px rgba(0,173,159,0.07);
`;

const Section = styled.section`
  margin-bottom: 28px;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 18px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 7px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  margin-bottom: 14px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CheckoutButton = styled.button`
  margin-top: 18px;
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
  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
    color: #aaa;
  }
`;

const CheckoutPage = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState({
    billingName: '',
    billingEmail: '',
    shippingAddress: '',
    shippingCity: '',
    shippingZip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = Object.values(form).every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    alert('Order placed! Thank you for shopping.');
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <CheckoutContainer>
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
        <Link to="/products">Back to Products</Link>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <h2 style={{ marginBottom: 24 }}>Review Your Order</h2>
      <Section>
        {items.map(item => (
          <ItemRow key={item.id}>
            <span>
              {item.name} <span style={{ color: '#00AD9F' }}>× {item.quantity}</span>
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </ItemRow>
        ))}
        <TotalRow>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </TotalRow>
      </Section>
      <form onSubmit={handleSubmit} autoComplete="on">
        <Section>
          <h3>Billing Information</h3>
          <Label htmlFor="billingName">Full Name</Label>
          <Input id="billingName" name="billingName" value={form.billingName} onChange={handleChange} required autoComplete="name" />
          <Label htmlFor="billingEmail">Email</Label>
          <Input id="billingEmail" name="billingEmail" type="email" value={form.billingEmail} onChange={handleChange} required autoComplete="email" />
        </Section>
        <Section>
          <h3>Shipping Address</h3>
          <Label htmlFor="shippingAddress">Address</Label>
          <Input id="shippingAddress" name="shippingAddress" value={form.shippingAddress} onChange={handleChange} required autoComplete="street-address" />
          <Label htmlFor="shippingCity">City</Label>
          <Input id="shippingCity" name="shippingCity" value={form.shippingCity} onChange={handleChange} required autoComplete="address-level2" />
          <Label htmlFor="shippingZip">ZIP/Postal Code</Label>
          <Input id="shippingZip" name="shippingZip" value={form.shippingZip} onChange={handleChange} required autoComplete="postal-code" />
        </Section>
        <Section>
          <h3>Payment</h3>
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input id="cardNumber" name="cardNumber" value={form.cardNumber} onChange={handleChange} required autoComplete="cc-number" />
          <Label htmlFor="cardExpiry">Expiry (MM/YY)</Label>
          <Input id="cardExpiry" name="cardExpiry" value={form.cardExpiry} onChange={handleChange} required autoComplete="cc-exp" />
          <Label htmlFor="cardCVC">CVC</Label>
          <Input id="cardCVC" name="cardCVC" value={form.cardCVC} onChange={handleChange} required autoComplete="cc-csc" />
        </Section>
        <CheckoutButton type="submit" disabled={!isFormValid}>Place Order</CheckoutButton>
      </form>
      <Link to="/cart" style={{ display: 'block', marginTop: 16, textAlign: 'center' }}>
        Back to Cart
      </Link>
    </CheckoutContainer>
  );
};

export default CheckoutPage;