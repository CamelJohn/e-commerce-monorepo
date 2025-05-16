import { useParams, Link } from 'react-router-dom';
import { useProducts } from './product.context';
import ProductCard from './product.card';

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const products = useProducts();
  const product = products.find((p) => p.id === productId);

  // Example static product
  if (!product) {
    return (
      <div>
        <h2>Product not found</h2>
        <Link to="/product">Back to Products</Link>
      </div>
    );
  }

  return (
    <div>
      <ProductCard {...product} />
      <Link to="/product">Back to Products</Link>
    </div>
  );
};

export default ProductPage;
