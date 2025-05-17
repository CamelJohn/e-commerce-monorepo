import { useCart } from '../../../cart/cart.context';
import { useCheckout } from '../checkout.context';
import { Section, TotalRow, ItemRow } from '../checkout.page';
import { WizardActions, WizardButton } from '../wizard.button';

export const ReviewStep = () => {
  const { form, prev, reset } = useCheckout();
  const { items, clearCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    alert('Order placed! Thank you for shopping.');
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Section>
        <h3>Review Your Order</h3>
        {items.map(item => (
          <ItemRow key={item.id}>
            <span>
              {item.name} <span style={{ color: '#a259ff' }}>× {item.quantity}</span>
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </ItemRow>
        ))}
        <TotalRow>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </TotalRow>
      </Section>
      <Section>
        <h4>Shipping: {form.shippingVendor}</h4>
        <h4>Payment: {form.paymentMethod} ({form.paymentPlan})</h4>
      </Section>
      <WizardActions>
        <WizardButton variant="secondary" type="button" onClick={prev}>
          Back
        </WizardButton>
        <WizardButton type="submit">
          Place Order
        </WizardButton>
      </WizardActions>
    </form>
  );
};