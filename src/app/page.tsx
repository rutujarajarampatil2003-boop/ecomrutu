import Link from 'next/link';
import { ArrowRight, ShoppingBag, Zap, Shield, Truck } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 4,
    include: {
      images: true,
      category: true,
    },
  });

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section style={{ 
        padding: '8rem 0', 
        background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.1), transparent), radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.1), transparent)',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="badge badge-primary" style={{ marginBottom: '1.5rem' }}>New Collection 2026</span>
          <h1 style={{ fontSize: '4rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
            Elevate Your Lifestyle with <span style={{ color: 'var(--primary)' }}>Premium</span> Goods.
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '600px', margin: '0 auto 3rem' }}>
            Experience the future of shopping with our curated selection of high-end electronics, fashion, and lifestyle essentials.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/products" className="btn btn-primary">
              Shop Now <ArrowRight size={20} />
            </Link>
            <Link href="/categories" className="btn btn-outline">
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid grid-cols-4">
            <div style={{ textAlign: 'center' }}>
              <Zap style={{ color: 'var(--primary)', marginBottom: '1rem' }} size={32} />
              <h4>Fast Delivery</h4>
              <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>Same day shipping on orders over $500.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Shield style={{ color: 'var(--primary)', marginBottom: '1rem' }} size={32} />
              <h4>Secure Payment</h4>
              <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>SSL encrypted checkout for your peace of mind.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <ShoppingBag style={{ color: 'var(--primary)', marginBottom: '1rem' }} size={32} />
              <h4>Premium Quality</h4>
              <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>Hand-picked products from top global vendors.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Truck style={{ color: 'var(--primary)', marginBottom: '1rem' }} size={32} />
              <h4>Free Returns</h4>
              <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>30-day no-hassle return policy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ marginBottom: '0.5rem' }}>Featured Products</h2>
              <p style={{ opacity: 0.7 }}>Our best-selling items this week.</p>
            </div>
            <Link href="/products" style={{ color: 'var(--primary)', fontWeight: 600 }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="card">
                <div style={{ 
                  aspectRatio: '1/1', 
                  backgroundColor: 'var(--input)', 
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  marginBottom: '1rem',
                  position: 'relative'
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={product.images[0]?.imageUrl || 'https://via.placeholder.com/400'} 
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                    <button className="glass" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', opacity: 0.5, textTransform: 'uppercase' }}>{product.category.categoryName}</span>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>${product.price}</span>
                  <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--foreground)', color: 'white', borderRadius: '2rem', margin: '0 1.5rem 4rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '1.5rem' }}>Join the Future of Shopping</h2>
          <p style={{ opacity: 0.8, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Get early access to new drops, exclusive discounts, and personalized recommendations.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <input type="email" placeholder="Enter your email" style={{ 
              padding: '1rem 1.5rem', 
              borderRadius: 'var(--radius)', 
              border: 'none', 
              width: '300px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'white'
            }} />
            <button className="btn btn-primary" style={{ padding: '1rem 2rem' }}>Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
