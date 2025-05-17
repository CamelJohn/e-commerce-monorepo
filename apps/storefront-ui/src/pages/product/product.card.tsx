import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../../cart/cart.context';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  padding: 22px 18px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: box-shadow 0.18s, transform 0.18s;
  &:hover {
    box-shadow: 0 4px 24px rgba(0,173,159,0.18);
    transform: translateY(-2px) scale(1.01);
  }
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

const Vendor = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-size: 0.98rem;
`;

const Price = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 1.1rem;
`;

const AddToCartButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 20px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  align-self: flex-end;
  transition: background 0.18s;
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  vendorId: string;
  vendorName: string;
}

const ProductCard = ({ id, name, description, price, vendorId, vendorName }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
  <Card>
    <Title to={`/product/${id}`}>{name}</Title>
    <Description>{description}</Description>
    <Price>${price.toFixed(2)}</Price>
    <div>
      Sold by: <Vendor to={`/vendor/${vendorId}`}>{vendorName}</Vendor>
    </div>
    <AddToCartButton onClick={() => addToCart({
      id,
      name,
      description,
      price,
      vendorId,
      vendorName,
    })}>Add to Cart</AddToCartButton>
  </Card>
)};

export default ProductCard;