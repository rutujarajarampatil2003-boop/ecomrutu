import { prisma } from '@/lib/prisma';
import { Package, Truck, CheckCircle, Clock, RotateCcw, ChevronRight, FileText } from 'lucide-react';
import Link from 'next/link';

export default async function OrdersPage() {
  const user = await prisma.user.findFirst();
  const userId = user?.id || 1;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: { include: { images: true } } } } },
    orderBy: { id: 'desc' }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PAID': return <CheckCircle size={20} style={{ color: '#10b981' }} />;
      case 'PENDING_VERIFICATION': return <Clock size={20} style={{ color: '#f59e0b' }} />;
      case 'SHIPPED': return <Truck size={20} style={{ color: '#3b82f6' }} />;
      default: return <Package size={20} style={{ color: '#6b7280' }} />;
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace(/_/g, ' ');
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Your Orders</h1>
          <p style={{ opacity: 0.6 }}>Track, manage and download invoices for your purchases.</p>
        </div>
        <Link href="/products" className="btn btn-outline">
          Continue Shopping
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="card glass" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <Package size={60} style={{ opacity: 0.2, margin: '0 auto 2rem' }} />
          <h3>No orders placed yet</h3>
          <p style={{ opacity: 0.6, marginBottom: '2rem' }}>Ready to start your shopping journey?</p>
          <Link href="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {orders.map((order) => (
            <div key={order.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Order Header */}
              <div style={{ 
                padding: '1.5rem 2rem', 
                backgroundColor: 'var(--input)', 
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', gap: '3rem' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.25rem', fontWeight: 700 }}>Order Placed</p>
                    <p style={{ fontWeight: 600 }}>May 5, 2026</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.25rem', fontWeight: 700 }}>Total</p>
                    <p style={{ fontWeight: 600 }}>${order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.25rem', fontWeight: 700 }}>Ship To</p>
                    <p style={{ fontWeight: 600, color: 'var(--primary)', cursor: 'pointer' }}>{user?.fullName}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.25rem', fontWeight: 700 }}>Order #ORD-{order.id}</p>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Link href="#" style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <FileText size={16} /> Invoice
                    </Link>
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                  {getStatusIcon(order.status)}
                  <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>{getStatusLabel(order.status)}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {order.items.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.product.images[0]?.imageUrl || 'https://via.placeholder.com/100'} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                          <Link href={`/products/${item.productId}`} style={{ fontWeight: 600, fontSize: '1.125rem', display: 'block', marginBottom: '0.25rem' }}>
                            {item.product.name}
                          </Link>
                          <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>Quantity: {item.quantity}</p>
                          <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', marginTop: '0.75rem' }}>
                            <RotateCcw size={12} /> Buy it again
                          </button>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Track Package</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
