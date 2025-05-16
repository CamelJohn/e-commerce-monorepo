import { Link } from 'react-router-dom';
import { ProductItem, ProductList } from './home.page.styles';

const HomePage = () => {
  // Example static products
  const products = [
    { id: '1', name: 'T-Shirt', vendorId: 'a', vendorName: 'Vendor A' },
    { id: '2', name: 'Mug', vendorId: 'b', vendorName: 'Vendor B' },
  ];

  return (
   <>
      <h1>Welcome to the Marketplace</h1>
      <ProductList>
        {products.map((p) => (
          <ProductItem key={p.id}>
            <Link to={`/product/${p.id}`}>{p.name}</Link>
            {' by '}
            <Link to={`/vendor/${p.vendorId}`}>{p.vendorName}</Link>
          </ProductItem>
        ))}
      </ProductList>
    </>
  );
};

export default HomePage;
