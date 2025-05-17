import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  max-width: 800px; // reduce if needed
  margin: 40px auto;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 32px 8px; // less horizontal padding
`;

const Section = styled.section`
  margin-bottom: 32px;
`;

const PlansGrid = styled.div`
  display: flex;
  gap: 24px; // less gap
  justify-content: center;
  margin-top: 24px;
  flex-wrap: nowrap; // prevent wrapping
  overflow-x: auto; // allow scroll if needed
`;

const PlanCard = styled.div<{ selected?: boolean }>`
  flex: 0 1 200px;
  width: 200px;
  min-height: 420px;
  max-width: 220px;
  border: 2.5px solid
    ${({ theme, selected }) => (selected ? theme.colors.primary : theme.colors.border)};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ selected }) => (selected ? '0 4px 24px rgba(162,89,255,0.10)' : 'none')};
  padding: 32px 18px 24px 18px;
  text-align: center;
  transition:
    border 0.18s,
    box-shadow 0.18s;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const PlanName = styled.div<{ selected?: boolean }>`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme, selected }) => (selected ? theme.colors.primary : theme.colors.text)};
  margin-bottom: 8px;
`;

const PlanPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

const FeaturesList = styled.ul`
  text-align: left;
  margin: 0 0 18px 0;
  padding: 0 0 0 18px;
  font-size: 0.98rem;
  color: #555;
`;

const ChooseButton = styled.button<{ selected?: boolean }>`
  width: 100%;
  background: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.background};
  color: ${({ theme, selected }) => (selected ? '#fff' : theme.colors.primary)};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
  opacity: ${({ selected }) => (selected ? 0.7 : 1)};
  pointer-events: ${({ selected }) => (selected ? 'none' : 'auto')};
  transition:
    background 0.18s,
    color 0.18s;
  margin-top: 8px;
`;

export default function SubscriptionsPage() {
  // Replace with real data
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const plans = [
    { name: 'Free', price: '$0', features: ['Basic features'] },
    {
      name: 'Pro',
      price: '$29/mo',
      features: ['All Free features', 'Priority support', 'Advanced analytics'],
    },
    {
      name: 'Enterprise',
      price: 'Contact us',
      features: ['Custom integrations', 'Dedicated support'],
    },
  ];

  return (
    <Container>
      <h2>Subscription & Billing</h2>
      <Section>
        <h3>Choose Your Plan</h3>
        <PlansGrid>
          {plans.map((plan) => {
            const isCurrent = plan.name === selectedPlan;
            return (
              <PlanCard key={plan.name} selected={isCurrent}>
                <div>
                  <PlanName selected={isCurrent}>{plan.name}</PlanName>
                  <PlanPrice>{plan.price}</PlanPrice>
                  <FeaturesList>
                    {plan.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </FeaturesList>
                </div>
                <ChooseButton
                  type="button"
                  selected={isCurrent}
                  onClick={() => setSelectedPlan(plan.name)}
                  disabled={isCurrent}
                >
                  {isCurrent ? 'Selected' : 'Choose'}
                </ChooseButton>
              </PlanCard>
            );
          })}
        </PlansGrid>
      </Section>
      <Section>
        <h3>Billing History</h3>
        <div>No invoices yet.</div>
      </Section>
    </Container>
  );
}
