import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../../cart/cart.context';

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
  border-radius: 4px;
  padding: 5px 18px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  margin-top: 6px;
  align-self: flex-end;
  transition: background 0.18s;
  &:hover {
    background: #7c3aed;
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