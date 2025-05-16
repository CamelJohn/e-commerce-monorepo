import { Link } from 'react-router-dom';
import { useVendors } from './vendor.context';
import VendorCard from './vendor.card';

const VendorsPage = () => {
  const vendors = useVendors();
  return (
    <div>
      <h2>All Vendors</h2>
      {vendors.map((v) => (
        <VendorCard key={v.id} {...v} />
      ))}
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default VendorsPage;