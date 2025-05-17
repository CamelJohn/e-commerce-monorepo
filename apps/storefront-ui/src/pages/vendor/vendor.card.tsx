import styled from 'styled-components';
import type { Vendor } from './vendor.context';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  padding: 22px 18px;
  margin-bottom: 24px;
`;

const VendorCard = (vendor: Vendor) => (
  <Card>
      <h3>{vendor.name}</h3>
      <p>{vendor.description}</p>
      <p>
        <a href={`mailto:${vendor.contactEmail}`}>{vendor.contactEmail}</a>
      </p>
  </Card>
);

export default VendorCard;
