import { useCheckout } from '../checkout.context';
import { Label, Input, Section } from '../checkout.page';
import { WizardActions, WizardButton } from '../wizard.button';

export const BillingStep = () => {
  const { form, setForm, next } = useCheckout();

  return (
    <Section>
      <h3>Billing Information</h3>
      <Label htmlFor="billingName">Full Name</Label>
      <Input id="billingName" name="billingName" value={form.billingName} onChange={e => setForm(f => ({ ...f, billingName: e.target.value }))} required />
      <Label htmlFor="billingEmail">Email</Label>
      <Input id="billingEmail" name="billingEmail" type="email" value={form.billingEmail} onChange={e => setForm(f => ({ ...f, billingEmail: e.target.value }))} required />
      <WizardActions>
        <WizardButton type="button" onClick={next}>
          Next
        </WizardButton>
      </WizardActions>
    </Section>
  );
};