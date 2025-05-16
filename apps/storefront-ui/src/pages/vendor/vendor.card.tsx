import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.navBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(162, 89, 255, 0.07);
  padding: 20px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 4px;
  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-size: 0.98rem;
`;

interface VendorCardProps {
  id: string;
  name: string;
  description: string;
  children?: React.ReactNode;
}

const VendorCard = ({ id, name, description, children }: VendorCardProps) => (
  <Card>
    <Title to={`/vendor/${id}`}>{name}</Title>
    <Description>{description}</Description>
    {children}
  </Card>
);

export default VendorCard;
