import { CheckoutProvider, useCheckout } from './checkout.context';
import { BillingStep } from './steps/checkout.billing.step';
import { ShippingStep } from './steps/checkout.shipping.step';
import { PaymentStep } from './steps/checkout.payment.step';
import { ReviewStep } from './steps/checkout.review.and.submit';
import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  max-width: 520px;
  margin: 40px auto;
  background: ${({ theme }) => theme.colors.navBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 32px 28px;
  box-shadow: 0 2px 12px rgba(162,89,255,0.07);
`;

export const Section = styled.section`
  margin-bottom: 28px;
`;

export const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 18px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 7px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  margin-bottom: 14px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const Select = styled.select`
  width: 100%;
  padding: 7px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  margin-bottom: 14px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const Option = styled.option`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const CheckoutButton = styled.button`
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
    background: #7c3aed;
  }
`;

export const BackButton = styled.button`
  display: block;
  margin: 16px auto 0 auto;
  background: none;
  color: ${({ theme }) => theme.colors.primary};
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  padding: 8px 22px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  text-align: center;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`;

export const paymentPlans = [
  { value: 'once', label: 'One-time Payment' },
  { value: '3mo', label: '3-Month Installments' },
  { value: '6mo', label: '6-Month Installments' },
];

export const shippingVendors = [
  { value: 'fedex', label: 'FedEx' },
  { value: 'dhl', label: 'DHL' },
  { value: 'ups', label: 'UPS' },
];

export const paymentMethods = [
  { value: 'stripe', label: 'Credit/Debit Card (Stripe)' },
  { value: 'paypal', label: 'PayPal' },
];

const Stepper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const StepCircle = styled.div<{ active: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.border};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;

export const WizardActions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  justify-content: flex-end;
`;

export const WizardButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.colors.navBg : theme.colors.primary};
  color: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.colors.primary : '#fff'};
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  padding: 9px 28px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, border 0.18s;
  &:hover, &:focus {
    background: ${({ theme, variant }) =>
      variant === 'secondary' ? theme.colors.primary : theme.colors.accent};
    color: #fff;
    outline: none;
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    color: #aaa;
    border-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`;

const steps = [
  { label: 'Billing' },
  { label: 'Shipping' },
  { label: 'Payment' },
  { label: 'Review' },
];

const CheckoutWizard = () => {
  const { step } = useCheckout();

  return (
    <CheckoutContainer>
      <Stepper>
        {steps.map((s, i) => (
          <div key={s.label} style={{ textAlign: 'center', flex: 1 }}>
            <StepCircle active={step === i}>{i + 1}</StepCircle>
            <div style={{ fontSize: 12, color: '#aaa', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </Stepper>
      {step === 0 && <BillingStep />}
      {step === 1 && <ShippingStep />}
      {step === 2 && <PaymentStep />}
      {step === 3 && <ReviewStep />}
    </CheckoutContainer>
  );
};

const CheckoutPage = () => (
  <CheckoutProvider>
    <CheckoutWizard />
  </CheckoutProvider>
);

export default CheckoutPage;