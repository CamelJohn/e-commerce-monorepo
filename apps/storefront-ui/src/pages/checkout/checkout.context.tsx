import React, { createContext, useContext, useState } from 'react';

export type CheckoutStep = 0 | 1 | 2 | 3;

export interface CheckoutFormState {
  billingName: string;
  billingEmail: string;
  shippingAddress: string;
  shippingCity: string;
  shippingZip: string;
  shippingVendor: string;
  paymentMethod: string;
  paymentPlan: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  paypalEmail: string;
}

const defaultForm: CheckoutFormState = {
  billingName: '',
  billingEmail: '',
  shippingAddress: '',
  shippingCity: '',
  shippingZip: '',
  shippingVendor: 'fedex',
  paymentMethod: 'stripe',
  paymentPlan: 'once',
  cardNumber: '',
  cardExpiry: '',
  cardCVC: '',
  paypalEmail: '',
};

interface CheckoutContextType {
  step: CheckoutStep;
  setStep: (step: CheckoutStep) => void;
  form: CheckoutFormState;
  setForm: React.Dispatch<React.SetStateAction<CheckoutFormState>>;
  next: () => void;
  prev: () => void;
  reset: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [step, setStep] = useState<CheckoutStep>(0);
  const [form, setForm] = useState<CheckoutFormState>(defaultForm);

  const next = () => setStep(s => (s < 3 ? ((s + 1) as CheckoutStep) : s));
  const prev = () => setStep(s => (s > 0 ? ((s - 1) as CheckoutStep) : s));
  const reset = () => {
    setStep(0);
    setForm(defaultForm);
  };

  return (
    <CheckoutContext.Provider value={{ step, setStep, form, setForm, next, prev, reset }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider');
  return ctx;
};