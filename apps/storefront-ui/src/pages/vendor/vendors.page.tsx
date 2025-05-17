import { ListDisplay } from '../../shared/ListDisplay';
import VendorCard from './vendor.card';
import { useVendors, type Vendor } from './vendor.context';

const columns: { key: keyof Vendor; label: string; render?: (v: Vendor) => React.ReactNode }[] = [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'contactEmail', label: 'Contact', render: (v) => <a href={`mailto:${v.contactEmail}`}>{v.contactEmail}</a> },
];

const VendorsPage = () => {
  const vendors = useVendors();
  return (
    <ListDisplay
      title="All Vendors"
      data={vendors}
      columns={columns}
      renderCard={(v: Vendor) => <VendorCard key={v.id} {...v} />}
      searchKeys={['name', 'description', 'contactEmail']}
    />
  );
};

export default VendorsPage;