import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import LikeButton from '@/components/LikeButton';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const user = await prisma.user.findFirst();
  const userId = user?.id || 1;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      images: true,
      category: true,
      vendor: true,
      reviews: {
        include: { user: true }
      },
    },
  });

  if (!product) notFound();

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '6rem' }}>
        {/* Images */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card" style={{ aspectRatio: '1/1', padding: 0, overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={product.images[0]?.imageUrl || 'https://via.placeholder.com/600'} 
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {product.images.map((img) => (
              <div key={img.id} className="card" style={{ width: '80px', height: '80px', padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>{product.category.categoryName}</span>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{product.name}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', color: '#fbbf24' }}>
              <Star size={18} fill="#fbbf24" />
              <Star size={18} fill="#fbbf24" />
              <Star size={18} fill="#fbbf24" />
              <Star size={18} fill="#fbbf24" />
              <Star size={18} fill="none" />
            </div>
            <span style={{ opacity: 0.5 }}>(4.0 • {product.reviews.length} reviews)</span>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>${product.price}</span>
            {product.stock > 0 ? (
              <span style={{ marginLeft: '1rem', color: '#10b981', fontWeight: 600 }}>In Stock</span>
            ) : (
              <span style={{ marginLeft: '1rem', color: '#ef4444', fontWeight: 600 }}>Out of Stock</span>
            )}
          </div>

          {product.size && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h4 style={{ fontSize: '0.875rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Select Size</h4>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {['XS', 'S', 'M', 'L', 'XL'].map(s => (
                  <button 
                    key={s} 
                    className={`btn ${product.size === s ? 'btn-primary' : 'btn-outline'}`}
                    style={{ padding: '0.75rem', minWidth: '50px' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p style={{ fontSize: '1.125rem', opacity: 0.7, marginBottom: '3rem', lineHeight: 1.8 }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
            <div style={{ flex: 1 }}>
              <AddToCartButton productId={product.id} userId={userId} />
            </div>
            <Link href={`/checkout`} className="btn btn-primary" style={{ flex: 1, padding: '1.25rem', textAlign: 'center', backgroundColor: '#10b981', color: 'white' }}>
              Buy Now
            </Link>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <LikeButton productId={product.id} userId={userId} />
            </div>
          </div>

          <div className="card glass" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Truck size={24} style={{ color: 'var(--primary)' }} />
              <div>
                <h4 style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Fast Delivery</h4>
                <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>2-4 business days</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <RotateCcw size={24} style={{ color: 'var(--primary)' }} />
              <div>
                <h4 style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Easy Returns</h4>
                <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>30-day money back</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section>
        <h2 style={{ marginBottom: '3rem' }}>Customer Reviews</h2>
        {product.reviews.length === 0 ? (
          <div className="card glass" style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ opacity: 0.5 }}>No reviews yet. Be the first to review this product!</p>
            <button className="btn btn-outline" style={{ marginTop: '1.5rem' }}>Write a Review</button>
          </div>
        ) : (
          <div className="grid grid-cols-2">
            {product.reviews.map((review) => (
              <div key={review.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h4 style={{ marginBottom: 0 }}>{review.user.fullName}</h4>
                  <div style={{ display: 'flex', color: '#fbbf24' }}>
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="#fbbf24" />)}
                  </div>
                </div>
                <p style={{ opacity: 0.7 }}>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
