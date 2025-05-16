import { useContext, createContext } from 'react';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number; // Add this line
    vendorId: string;
    vendorName: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'T-Shirt',
    description: 'A cool purple t-shirt.',
    price: 29.99, // Add price
    vendorId: 'a',
    vendorName: 'Vendor A',
  },
  {
    id: '2',
    name: 'Mug',
    description: 'A stylish mug for your coffee.',
    price: 14.99, // Add price
    vendorId: 'b',
    vendorName: 'Vendor B',
  },
];

const ProductsContext = createContext<Product[]>(products);

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => (
  <ProductsContext.Provider value={products}>{children}</ProductsContext.Provider>
);