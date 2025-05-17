import { ListDisplay } from '../../shared/ListDisplay';
import ProductCard from './product.card';
import { useProducts, type Product } from './product.context';

const columns: { key: keyof Product; label: string; render?: (p: Product) => React.ReactNode }[] = [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'price', label: 'Price', render: (p) => `$${p.price.toFixed(2)}` },
  { key: 'vendorName', label: 'Vendor' },
];

const ProductsPage = () => {
  const products = useProducts();
  return (
    <ListDisplay
      title="All Products"
      data={products}
      columns={columns}
      renderCard={(p: Product) => <ProductCard key={p.id} {...p} />}
      searchKeys={['name', 'description', 'vendorName']}
    />
  );
};

export default ProductsPage;