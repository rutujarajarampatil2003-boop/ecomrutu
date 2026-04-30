import { prisma } from '@/lib/prisma';
import { Mail, Phone } from 'lucide-react';

export default async function VendorsPage() {
  const vendors = await prisma.vendor.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <h1 style={{ marginBottom: '3rem' }}>Our Trusted Vendors</h1>
      <div className="grid grid-cols-2">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ marginBottom: '0.5rem' }}>{vendor.vendorName}</h2>
                <span className="badge badge-primary">{vendor._count.products} Products Active</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '2rem', opacity: 0.7 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} /> {vendor.email}
              </div>
              {vendor.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} /> {vendor.phone}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
