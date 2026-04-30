import { prisma } from '@/lib/prisma';
import { Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default async function WishlistPage() {
  const wishlistItems = await prisma.wishlist.findMany({
    where: { userId: 3 },
    include: {
      product: {
        include: { images: true, category: true }
      }
    }
  });

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <h1 style={{ marginBottom: '3rem' }}>Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="card glass" style={{ textAlign: 'center', padding: '6rem' }}>
          <Heart size={64} style={{ margin: '0 auto 2rem', opacity: 0.2 }} />
          <h2>Your wishlist is empty</h2>
          <p style={{ opacity: 0.5, marginBottom: '2rem' }}>Save items you like for later!</p>
          <Link href="/products" className="btn btn-primary">Discover Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="card">
              <div style={{ aspectRatio: '1/1', backgroundColor: 'var(--input)', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: '1rem' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.product.images[0]?.imageUrl} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{item.product.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800 }}>${item.product.price}</span>
                <button className="btn btn-primary" style={{ padding: '0.5rem' }}>
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
