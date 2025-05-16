import { createContext, useContext } from 'react';

export interface Vendor {
  id: string;
  name: string;
  description: string;
}

const vendors: Vendor[] = [
  { id: 'a', name: 'Vendor A', description: 'Quality apparel and more.' },
  { id: 'b', name: 'Vendor B', description: 'Unique mugs and accessories.' },
];

const VendorsContext = createContext<Vendor[]>(vendors);

export const useVendors = () => useContext(VendorsContext);

export const VendorsProvider = ({ children }: { children: React.ReactNode }) => (
  <VendorsContext.Provider value={vendors}>{children}</VendorsContext.Provider>
);