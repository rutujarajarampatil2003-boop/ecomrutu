import Link from 'next/link';
import { ArrowRight, ShoppingBag, Zap, Shield, Truck, Star, TrendingUp } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import CategorySlider from '@/components/CategorySlider';
import HeroCarousel from '@/components/HeroCarousel';

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 8,
    include: {
      images: true,
      category: true,
    },
  });

  const categories = await prisma.category.findMany();

  return (
    <div style={{ animation: 'fadeIn 1s ease' }}>
      {/* Hero Carousel (Cinematic Upgrade) */}
      <HeroCarousel />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Features Row - Modern Floating Design */}
        <section style={{ 
          margin: '-5rem 0 6rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem'
        }}>
          {[
            { icon: <Zap size={32} />, title: 'Flash Delivery', desc: 'Ships within 12 hours' },
            { icon: <Shield size={32} />, title: 'Secure Pay', desc: '100% encrypted payment' },
            { icon: <ShoppingBag size={32} />, title: 'Global Brands', desc: 'Direct from source' },
            { icon: <TrendingUp size={32} />, title: 'Trending Now', desc: 'Curated by experts' }
          ].map((feature, i) => (
            <div key={i} className="card glass" style={{ 
              textAlign: 'center', 
              padding: '3rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              border: '1px solid rgba(255,255,255,0.4)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ 
                color: 'var(--primary)', 
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                padding: '1rem',
                borderRadius: '50%',
                marginBottom: '0.5rem'
              }}>
                {feature.icon}
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{feature.title}</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>{feature.desc}</p>
            </div>
          ))}
        </section>

      {categories && categories.length > 0 && (
        <CategorySlider categories={categories} />
      )}

      <section style={{ padding: '8rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem' }}>
            <div>
              <div style={{ color: 'var(--primary)', fontWeight: 800, letterSpacing: '0.2em', marginBottom: '1rem', fontSize: '0.875rem' }}>EXPLORE OUR BEST</div>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Featured Collection</h2>
            </div>
            <Link href="/products" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              fontWeight: 700,
              fontSize: '1.125rem',
              color: 'var(--primary)',
              padding: '1rem 2rem',
              backgroundColor: 'var(--input)',
              borderRadius: '99px'
            }}>
              Explore All <ArrowRight size={20} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3rem' }}>
            {products.map((product) => (
              <div key={product.id} className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', transition: 'all 0.4s ease' }}>
                <Link href={`/products/${product.id}`}>
                  <div style={{ 
                    aspectRatio: '3/4', 
                    backgroundColor: 'var(--input)', 
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={product.images[0]?.imageUrl || 'https://via.placeholder.com/400x500'} 
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    />
                    <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                      <span style={{ 
                        backgroundColor: 'white', 
                        padding: '0.4rem 1rem', 
                        borderRadius: '99px', 
                        fontSize: '0.75rem', 
                        fontWeight: 800,
                        boxShadow: 'var(--shadow-sm)'
                      }}>
                        NEW
                      </span>
                    </div>
                  </div>
                </Link>
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.875rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>{product.category.categoryName}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
                      <Star size={14} fill="currentColor" />
                      <span style={{ color: 'var(--foreground)', fontSize: '0.875rem', fontWeight: 600 }}>4.9</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>{product.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 900, fontSize: '1.75rem', color: 'var(--primary)' }}>${product.price}</span>
                    <button className="btn btn-primary" style={{ padding: '0.8rem 1.5rem', borderRadius: '99px' }}>
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter CTA - Premium Gradient Design */}
        <section style={{ 
          padding: '8rem 4rem', 
          background: 'var(--primary-gradient)', 
          color: 'white', 
          borderRadius: '4rem', 
          margin: '4rem 0 8rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 30px 60px rgba(99, 102, 241, 0.3)'
        }}>
          {/* Abstract circles for decoration */}
          <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
          <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>
          
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <h2 style={{ color: 'white', fontSize: '4rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.02em' }}>Never Miss a Drop</h2>
            <p style={{ opacity: 0.9, maxWidth: '650px', margin: '0 auto 4rem', fontSize: '1.5rem', lineHeight: 1.5 }}>
              Subscribe to get exclusive early access to our limited editions and members-only deals.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <input 
                type="email" 
                placeholder="Enter your professional email" 
                style={{ 
                  padding: '1.5rem 2.5rem', 
                  borderRadius: '99px', 
                  border: 'none', 
                  width: '450px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '1.125rem',
                  backdropFilter: 'blur(20px)',
                  outline: 'none'
                }} 
              />
              <button className="btn" style={{ 
                backgroundColor: 'white', 
                color: 'var(--primary)', 
                padding: '1.5rem 3.5rem',
                fontSize: '1.125rem',
                fontWeight: 800,
                borderRadius: '99px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}>
                Get Started
              </button>
            </div>
            <p style={{ marginTop: '2rem', fontSize: '0.875rem', opacity: 0.7 }}>We care about your data in our <Link href="#" style={{ color: 'white', textDecoration: 'underline' }}>Privacy Policy</Link>.</p>
          </div>
        </section>
      </div>

      {/* Modern Footer Placeholder */}
      <footer style={{ backgroundColor: 'var(--foreground)', color: 'white', padding: '8rem 0 4rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem', marginBottom: '6rem' }}>
            <div>
              <h2 style={{ color: 'white', marginBottom: '2rem' }}>ECOMM</h2>
              <p style={{ opacity: 0.6, lineHeight: 1.8 }}>The future of premium retail. We curate the world's best brands and deliver them to your doorstep with unparalleled care.</p>
            </div>
            {['Shop', 'Company', 'Support', 'Legal'].map((col) => (
              <div key={col}>
                <h4 style={{ color: 'white', marginBottom: '2rem' }}>{col}</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.6 }}>
                  <li><Link href="#">Featured Drops</Link></li>
                  <li><Link href="#">Our Story</Link></li>
                  <li><Link href="#">Contact Us</Link></li>
                  <li><Link href="#">Terms & Conditions</Link></li>
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4rem', display: 'flex', justifyContent: 'space-between', opacity: 0.5, fontSize: '0.875rem' }}>
            <p>© 2026 ECOMM Retail Group. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <Link href="#">Twitter</Link>
              <Link href="#">Instagram</Link>
              <Link href="#">LinkedIn</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
