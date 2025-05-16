import { useParams, Link } from 'react-router-dom';
import { useVendors } from './vendor.context';
import VendorCard from './vendor.card';

const VendorPage = () => {
  const { vendorId } = useParams();
  const vendors = useVendors();
  const vendor = vendors.find((v) => v.id === vendorId);

  if (!vendor) {
    return (
      <div>
        <h2>Vendor not found</h2>
        <Link to="/vendor">Back to Vendors</Link>
      </div>
    );
  }

  return (
    <VendorCard {...vendor}>
      <Link to="/vendor">Back to Vendors</Link>
    </VendorCard>
  );
};

export default VendorPage;
