import { useState } from 'react';
import styled from 'styled-components';

const AccountContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 32px 28px;
  box-shadow: 0 2px 12px rgba(162,89,255,0.07);
`;

const Section = styled.section`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 18px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 9px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  margin-bottom: 18px;
  font-size: 1rem;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
`;

const Button = styled.button`
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
  margin-top: 12px;
`;

const DangerButton = styled(Button)`
  background: ${({ theme }) => theme.colors.danger};
  &:hover {
    background: #d32f2f;
  }
`;

const SuccessMsg = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;
  text-align: center;
`;

export default function AccountPage() {
  // Replace with real user/business data from context or API
  const [profile, setProfile] = useState({
    name: 'Vendor Name',
    email: 'vendor@example.com',
    phone: '',
    avatar: '',
  });
  const [business, setBusiness] = useState({
    businessName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    taxId: '',
    website: '',
  });
  const [payout, setPayout] = useState({
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    swift: '',
    paypal: '',
  });
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [success, setSuccess] = useState('');
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyPayouts, setNotifyPayouts] = useState(true);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusiness({ ...business, [e.target.name]: e.target.value });
  };
  const handlePayoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayout({ ...payout, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with real update logic
    setSuccess('Profile updated!');
    setPassword('');
    setConfirm('');
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleDelete = () => {
    // Replace with real delete logic
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      alert('Account deletion requested.');
    }
  };

  return (
    <AccountContainer>
      <form onSubmit={handleSave}>
        <Section>
          <SectionTitle>Profile Information</SectionTitle>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={profile.name} onChange={handleProfileChange} required />
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={profile.email} onChange={handleProfileChange} required />
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={profile.phone} onChange={handleProfileChange} />
          {/* Add avatar upload if needed */}
        </Section>

        <Section>
          <SectionTitle>Business Information</SectionTitle>
          <Label htmlFor="businessName">Business Name</Label>
          <Input id="businessName" name="businessName" value={business.businessName} onChange={handleBusinessChange} />
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" value={business.address} onChange={handleBusinessChange} />
          <Row>
            <div style={{ flex: 1 }}>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" value={business.city} onChange={handleBusinessChange} />
            </div>
            <div style={{ flex: 1 }}>
              <Label htmlFor="state">State</Label>
              <Input id="state" name="state" value={business.state} onChange={handleBusinessChange} />
            </div>
          </Row>
          <Row>
            <div style={{ flex: 1 }}>
              <Label htmlFor="zip">ZIP</Label>
              <Input id="zip" name="zip" value={business.zip} onChange={handleBusinessChange} />
            </div>
            <div style={{ flex: 1 }}>
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" value={business.country} onChange={handleBusinessChange} />
            </div>
          </Row>
          <Label htmlFor="taxId">Tax ID / VAT</Label>
          <Input id="taxId" name="taxId" value={business.taxId} onChange={handleBusinessChange} />
          <Label htmlFor="website">Website</Label>
          <Input id="website" name="website" value={business.website} onChange={handleBusinessChange} />
        </Section>

        <Section>
          <SectionTitle>Payout Information</SectionTitle>
          <Label htmlFor="bankName">Bank Name</Label>
          <Input id="bankName" name="bankName" value={payout.bankName} onChange={handlePayoutChange} />
          <Label htmlFor="accountNumber">Account Number / IBAN</Label>
          <Input id="accountNumber" name="accountNumber" value={payout.accountNumber} onChange={handlePayoutChange} />
          <Label htmlFor="routingNumber">Routing Number</Label>
          <Input id="routingNumber" name="routingNumber" value={payout.routingNumber} onChange={handlePayoutChange} />
          <Label htmlFor="swift">SWIFT Code</Label>
          <Input id="swift" name="swift" value={payout.swift} onChange={handlePayoutChange} />
          <Label htmlFor="paypal">PayPal Email (optional)</Label>
          <Input id="paypal" name="paypal" value={payout.paypal} onChange={handlePayoutChange} />
        </Section>

        <Section>
          <SectionTitle>Security</SectionTitle>
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Leave blank to keep current"
          />
          <Label htmlFor="confirm">Confirm New Password</Label>
          <Input
            id="confirm"
            name="confirm"
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="Leave blank to keep current"
          />
        </Section>

        <Section>
          <SectionTitle>Notifications</SectionTitle>
          <label>
            <input
              type="checkbox"
              checked={notifyOrders}
              onChange={e => setNotifyOrders(e.target.checked)}
            />{' '}
            Email me about new orders
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={notifyPayouts}
              onChange={e => setNotifyPayouts(e.target.checked)}
            />{' '}
            Email me about payouts
          </label>
        </Section>

        {success && <SuccessMsg>{success}</SuccessMsg>}
        <Button type="submit">Save Changes</Button>
      </form>

      <Section>
        <SectionTitle>Account Actions</SectionTitle>
        <DangerButton type="button" onClick={handleDelete}>
          Delete Account
        </DangerButton>
      </Section>
    </AccountContainer>
  );
}