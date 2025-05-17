import { useCheckout } from '../checkout.context';
import { Label, Input, Select, Option, Section } from '../checkout.page';
import { WizardActions, WizardButton } from '../wizard.button';

const paymentMethods = [
  { value: 'stripe', label: 'Credit/Debit Card (Stripe)' },
  { value: 'paypal', label: 'PayPal' },
];

const paymentPlans = [
  { value: 'once', label: 'One-time Payment' },
  { value: '3mo', label: '3-Month Installments' },
  { value: '6mo', label: '6-Month Installments' },
];

export const PaymentStep = () => {
  const { form, setForm, next, prev } = useCheckout();

  return (
    <Section>
      <h3>Payment</h3>
      <Label htmlFor="paymentMethod">Payment Method</Label>
      <Select id="paymentMethod" name="paymentMethod" value={form.paymentMethod} onChange={e => setForm(f => ({ ...f, paymentMethod: e.target.value }))} required>
        {paymentMethods.map(m => (
          <Option key={m.value} value={m.value}>{m.label}</Option>
        ))}
      </Select>
      <Label htmlFor="paymentPlan">Payment Plan</Label>
      <Select id="paymentPlan" name="paymentPlan" value={form.paymentPlan} onChange={e => setForm(f => ({ ...f, paymentPlan: e.target.value }))} required>
        {paymentPlans.map(p => (
          <Option key={p.value} value={p.value}>{p.label}</Option>
        ))}
      </Select>
      {form.paymentMethod === 'stripe' && (
        <>
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input id="cardNumber" name="cardNumber" value={form.cardNumber} onChange={e => setForm(f => ({ ...f, cardNumber: e.target.value }))} required />
          <Label htmlFor="cardExpiry">Expiry (MM/YY)</Label>
          <Input id="cardExpiry" name="cardExpiry" value={form.cardExpiry} onChange={e => setForm(f => ({ ...f, cardExpiry: e.target.value }))} required />
          <Label htmlFor="cardCVC">CVC</Label>
          <Input id="cardCVC" name="cardCVC" value={form.cardCVC} onChange={e => setForm(f => ({ ...f, cardCVC: e.target.value }))} required />
        </>
      )}
      {form.paymentMethod === 'paypal' && (
        <>
          <Label htmlFor="paypalEmail">PayPal Email</Label>
          <Input id="paypalEmail" name="paypalEmail" type="email" value={form.paypalEmail} onChange={e => setForm(f => ({ ...f, paypalEmail: e.target.value }))} required />
        </>
      )}
      <WizardActions>
        <WizardButton variant="secondary" type="button" onClick={prev}>
          Back
        </WizardButton>
        <WizardButton type="button" onClick={next}>
          Next
        </WizardButton>
      </WizardActions>
    </Section>
  );
};