import { prisma } from '@/lib/prisma';
import { Bell, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default async function NotificationsPage() {
  const user = await prisma.user.findFirst();
  const userId = user?.id || 1;

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { id: 'desc' },
  });

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Notifications</h1>
          <p style={{ opacity: 0.6 }}>Stay updated with your orders and account activity.</p>
        </div>
        {notifications.length > 0 && (
          <button className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="card glass" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--input)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 2rem'
          }}>
            <Bell size={40} style={{ opacity: 0.3 }} />
          </div>
          <h3>No notifications yet</h3>
          <p style={{ opacity: 0.6, maxWidth: '400px', margin: '0 auto 2rem' }}>
            When you place an order or we have updates for you, they'll appear here.
          </p>
          <Link href="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className="card" 
              style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                alignItems: 'flex-start',
                backgroundColor: notif.isRead ? 'var(--card)' : 'rgba(99, 102, 241, 0.05)',
                borderLeft: notif.isRead ? '1px solid var(--border)' : '4px solid var(--primary)'
              }}
            >
              <div style={{ 
                padding: '0.75rem', 
                borderRadius: '50%', 
                backgroundColor: 'var(--input)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {notif.message.toLowerCase().includes('success') || notif.message.toLowerCase().includes('shipped') ? (
                  <CheckCircle size={20} style={{ color: '#10b981' }} />
                ) : notif.message.toLowerCase().includes('alert') || notif.message.toLowerCase().includes('failed') ? (
                  <AlertTriangle size={20} style={{ color: '#f59e0b' }} />
                ) : (
                  <Info size={20} style={{ color: 'var(--primary)' }} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ marginBottom: '0.5rem', fontWeight: notif.isRead ? 400 : 600 }}>{notif.message}</p>
                <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>Just now</span>
              </div>
              {!notif.isRead && (
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)', marginTop: '0.5rem' }}></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
