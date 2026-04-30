import { prisma } from '@/lib/prisma';
import { Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import ApproveOrderButton from '@/components/ApproveOrderButton';

export default async function AdminOrdersPage() {
  // In a real app, you would check if user.role === 'ADMIN' here
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: { include: { product: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1>Admin Dashboard: Manage Orders</h1>
        <div className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.5rem 1rem' }}>
          Admin View
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {orders.map((order) => (
          <div key={order.id} className="card" style={{ border: order.status === 'PENDING_VERIFICATION' ? '2px solid #3b82f6' : '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ marginBottom: 0 }}>Order #{order.id}</h3>
                  <span className={`badge ${order.status === 'PAID' ? 'bg-success' : 'bg-warning'}`} 
                        style={{ backgroundColor: order.status === 'PAID' ? '#10b981' : order.status === 'PENDING_VERIFICATION' ? '#3b82f6' : '#9ca3af', color: 'white' }}>
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  Customer: <strong>{order.user.fullName}</strong> ({order.user.email})
                </p>
                <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>
                  Placed on {order.createdAt.toLocaleString()}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>Total Paid</p>
                <p style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--primary)' }}>${order.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', opacity: 0.7 }}>Order Items:</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {order.items.map(item => (
                  <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {order.status === 'PENDING_VERIFICATION' && (
              <div style={{ 
                backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                padding: '1.5rem', 
                borderRadius: 'var(--radius)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#3b82f6' }}>
                  <AlertCircle size={20} />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.1rem' }}>Payment Verification Required</p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Check your bank account for a transaction matching this order's total.</p>
                  </div>
                </div>
                <ApproveOrderButton orderId={order.id} />
              </div>
            )}

            {order.status === 'PAID' && (
              <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                <CheckCircle size={18} /> Payment Verified & Order Confirmed
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
