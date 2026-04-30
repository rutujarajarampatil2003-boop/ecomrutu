import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import ReturnOrderButton from '@/components/ReturnOrderButton';

export default async function OrdersPage() {
  const user = await prisma.user.findFirst();
  const userId = user?.id || 1;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: { include: { images: true } } }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <h1 style={{ marginBottom: '3rem' }}>Your Orders</h1>

      {orders.length === 0 ? (
        <div className="card glass" style={{ textAlign: 'center', padding: '6rem' }}>
          <Package size={64} style={{ margin: '0 auto 2rem', opacity: 0.2 }} />
          <h2>No orders found</h2>
          <p style={{ opacity: 0.5, marginBottom: '2rem' }}>You haven't placed any orders yet.</p>
          <Link href="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {orders.map((order) => (
            <div key={order.id} className="card glass" style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Order #{order.id}</h3>
                  <p style={{ opacity: 0.5, fontSize: '0.875rem' }}>
                    Placed on {order.createdAt.toLocaleDateString()} at {order.createdAt.toLocaleTimeString()}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', justifyContent: 'flex-end' }}>
                    {order.status === 'PAID' ? (
                      <span className="badge" style={{ backgroundColor: '#10b981', color: 'white' }}>
                        <CheckCircle size={14} style={{ display: 'inline', marginRight: '4px' }} /> Paid & Processing
                      </span>
                    ) : order.status === 'RETURNED_REFUNDED' ? (
                      <span className="badge" style={{ backgroundColor: '#ef4444', color: 'white' }}>
                        <XCircle size={14} style={{ display: 'inline', marginRight: '4px' }} /> Returned & Refunded
                      </span>
                    ) : (
                      <span className="badge" style={{ backgroundColor: '#3b82f6', color: 'white' }}>
                        <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} /> {order.status}
                      </span>
                    )}
                  </div>
                  <p style={{ fontWeight: 800, fontSize: '1.25rem' }}>Total: ${order.totalAmount.toFixed(2)}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {order.items.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--input)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.product.images[0]?.imageUrl || 'https://via.placeholder.com/100'} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Link href={`/products/${item.product.id}`} style={{ fontWeight: 700, fontSize: '1.125rem', color: 'inherit' }}>
                        {item.product.name}
                      </Link>
                      <p style={{ opacity: 0.5, fontSize: '0.875rem' }}>Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                {order.status === 'PAID' ? (
                  <ReturnOrderButton orderId={order.id} />
                ) : order.status === 'RETURNED_REFUNDED' ? (
                  <p style={{ color: '#ef4444', fontSize: '0.875rem', fontWeight: 600 }}>Refund processed to original payment method.</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
