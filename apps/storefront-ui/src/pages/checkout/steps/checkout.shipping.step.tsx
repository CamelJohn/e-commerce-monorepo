import { useCheckout } from '../checkout.context';
import { Label, Input, Select, Option, Section } from '../checkout.page';
import { WizardActions, WizardButton } from '../wizard.button';

const shippingVendors = [
  { value: 'fedex', label: 'FedEx' },
  { value: 'dhl', label: 'DHL' },
  { value: 'ups', label: 'UPS' },
];

export const ShippingStep = () => {
  const { form, setForm, next, prev } = useCheckout();

  return (
    <Section>
      <h3>Shipping Address</h3>
      <Label htmlFor="shippingAddress">Address</Label>
      <Input id="shippingAddress" name="shippingAddress" value={form.shippingAddress} onChange={e => setForm(f => ({ ...f, shippingAddress: e.target.value }))} required />
      <Label htmlFor="shippingCity">City</Label>
      <Input id="shippingCity" name="shippingCity" value={form.shippingCity} onChange={e => setForm(f => ({ ...f, shippingCity: e.target.value }))} required />
      <Label htmlFor="shippingZip">ZIP/Postal Code</Label>
      <Input id="shippingZip" name="shippingZip" value={form.shippingZip} onChange={e => setForm(f => ({ ...f, shippingZip: e.target.value }))} required />
      <Label htmlFor="shippingVendor">Shipping Vendor</Label>
      <Select id="shippingVendor" name="shippingVendor" value={form.shippingVendor} onChange={e => setForm(f => ({ ...f, shippingVendor: e.target.value }))} required>
        {shippingVendors.map(v => (
          <Option key={v.value} value={v.value}>{v.label}</Option>
        ))}
      </Select>
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