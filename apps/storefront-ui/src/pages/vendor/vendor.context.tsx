import { createContext, useContext } from 'react';

export interface Vendor {
  id: string;
  name: string;
  description: string;
  contactEmail: string;
}

const vendors: Vendor[] = [
  { id: 'a', name: 'Vendor A', description: 'Quality shirts', contactEmail: 'a@example.com' },
  { id: 'b', name: 'Vendor B', description: 'Stylish mugs', contactEmail: 'b@example.com' },
];

const VendorsContext = createContext<Vendor[]>(vendors);

export const useVendors = () => useContext(VendorsContext);

export const VendorsProvider = ({ children }: { children: React.ReactNode }) => (
  <VendorsContext.Provider value={vendors}>{children}</VendorsContext.Provider>
);