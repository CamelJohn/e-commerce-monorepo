import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './product.card';
import { useProducts } from './product.context';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin: 32px 0;
`;

const SearchInput = styled.input`
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  margin-bottom: 18px;
  width: 100%;
  max-width: 340px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background: ${({ theme }) => theme.colors.navBg};
  color: ${({ theme }) => theme.colors.text};
`;

const ProductsPage = () => {
  const products = useProducts();
  const [query, setQuery] = useState('');

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>All Products</h2>
      <SearchInput
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <Grid>
        {filtered.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </Grid>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default ProductsPage;