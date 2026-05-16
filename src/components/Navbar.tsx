import Link from 'next/link';
import { ShoppingCart, User, Search, Heart, Bell } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function Navbar() {
  const user = await prisma.user.findFirst();
  const userId = user?.id || 1;

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true }
  });

  const cartItemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const unreadNotificationsCount = await prisma.notification.count({
    where: { userId, isRead: false }
  });

  return (
    <div style={{ position: 'sticky', top: '1.5rem', zIndex: 100, padding: '0 1.5rem' }}>
      <nav className="navbar glass" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        borderRadius: '9999px', 
        padding: '0.75rem 2rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.75rem', fontWeight: 900, background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>
            ECOMM
          </Link>
  
          <div className="nav-links" style={{ display: 'flex', gap: '2.5rem' }}>
            <Link href="/products" className="nav-link" style={{ fontWeight: 600 }}>Shop</Link>
            <Link href="/categories" className="nav-link" style={{ fontWeight: 600 }}>Categories</Link>
            <Link href="/orders" className="nav-link" style={{ fontWeight: 600 }}>Orders</Link>
            <Link href="/admin/orders" className="nav-link" style={{ color: '#3b82f6', fontWeight: 700 }}>Admin</Link>
          </div>
  
          <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
            <div className="nav-icon" style={{ position: 'relative', cursor: 'pointer' }}>
              <Search size={22} />
            </div>
            <Link href="/wishlist" className="nav-icon">
              <Heart size={22} />
            </Link>
            <Link href="/cart" className="nav-icon" style={{ position: 'relative' }}>
              <ShoppingCart size={22} />
              {cartItemCount > 0 && (
                <span className="badge badge-primary" style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '10px', minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartItemCount}</span>
              )}
            </Link>
            <Link href="/notifications" className="nav-icon" style={{ position: 'relative' }}>
              <Bell size={22} />
              {unreadNotificationsCount > 0 && (
                <span className="badge" style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '10px', minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ef4444', color: 'white' }}>{unreadNotificationsCount}</span>
              )}
            </Link>
            <Link href="/auth/login" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)' }}>
              <User size={20} />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
