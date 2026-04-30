import { prisma } from '@/lib/prisma';
import { Package, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    where: { userId: 3 },
    include: {
      items: {
        include: { product: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <h1 style={{ marginBottom: '3rem' }}>My Orders</h1>

      {orders.length === 0 ? (
        <div className="card glass" style={{ textAlign: 'center', padding: '6rem' }}>
          <Package size={64} style={{ margin: '0 auto 2rem', opacity: 0.2 }} />
          <h2>No orders yet</h2>
          <p style={{ opacity: 0.5, marginBottom: '2rem' }}>You haven't placed any orders yet.</p>
          <Link href="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((order) => (
            <div key={order.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ marginBottom: 0 }}>Order #{order.id}</h3>
                  <span className="badge" style={{ backgroundColor: 'var(--input)', color: 'var(--foreground)' }}>{order.status}</span>
                </div>
                <p style={{ opacity: 0.5, fontSize: '0.875rem' }}>
                  Placed on {order.createdAt.toLocaleDateString()} • {order.items.length} items
                </p>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>Total Amount</p>
                  <p style={{ fontWeight: 800, fontSize: '1.25rem' }}>${order.totalAmount.toFixed(2)}</p>
                </div>
                <button className="btn btn-outline" style={{ padding: '0.5rem' }}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
