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

  return (
    <nav className="navbar glass">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Link href="/" className="nav-link" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
          ECOMM
        </Link>

        <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/products" className="nav-link">Shop</Link>
          <Link href="/categories" className="nav-link">Categories</Link>
          <Link href="/orders" className="nav-link">Orders</Link>
          <Link href="/admin/orders" className="nav-link" style={{ color: '#3b82f6', fontWeight: 600 }}>Admin</Link>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} />
          </div>
          <Link href="/wishlist">
            <Heart size={20} />
          </Link>
          <Link href="/cart" style={{ position: 'relative' }}>
            <ShoppingCart size={20} />
            <span className="badge badge-primary" style={{ position: 'absolute', top: '-8px', right: '-8px', fontSize: '10px', padding: '2px 5px' }}>{cartItemCount}</span>
          </Link>
          <Link href="/notifications">
            <Bell size={20} />
          </Link>
          <Link href="/auth/login">
            <User size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
