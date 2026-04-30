import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Filter, Search } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
import LikeButton from '@/components/LikeButton';

export default async function ProductsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ category?: string }> 
}) {
  const { category } = await searchParams;
  
  const user = await prisma.user.findFirst();
  const userId = user?.id || 1;

  const products = await prisma.product.findMany({
    where: category ? { categoryId: parseInt(category) } : {},
    include: {
      images: true,
      category: true,
    },
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ 
        marginBottom: '3rem', 
        borderRadius: 'var(--radius)', 
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'var(--card)'
      }}>
        {category && categories.find(c => c.id === parseInt(category))?.imageUrl && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.2 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={categories.find(c => c.id === parseInt(category))?.imageUrl!} 
              alt="Category Banner" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '3rem 2rem',
          position: 'relative',
          zIndex: 1,
          background: category ? 'linear-gradient(to right, var(--background) 40%, transparent)' : 'transparent'
        }}>
          <div>
            <h1 style={{ marginBottom: '0.5rem', fontSize: '2.5rem', fontWeight: 800 }}>
              {category ? categories.find(c => c.id === parseInt(category))?.categoryName : 'All Products'}
            </h1>
            <p style={{ opacity: 0.7, fontSize: '1.2rem' }}>
              {category ? categories.find(c => c.id === parseInt(category))?.description || `Browsing items in ${categories.find(c => c.id === parseInt(category))?.categoryName}` : 'Discover our premium collection.'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', opacity: 0.5 }} />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="card" 
                style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', width: '300px', backgroundColor: 'var(--background)' }} 
              />
            </div>
            <button className="btn btn-outline" style={{ backgroundColor: 'var(--background)' }}>
              <Filter size={18} /> Filter
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem' }}>
        {/* Sidebar Filters */}
        <aside>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Categories</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link href="/products" className="nav-link" style={{ opacity: category ? 0.7 : 1, fontWeight: category ? 400 : 700 }}>
                  All Products
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id} style={{ marginBottom: '0.5rem' }}>
                  <Link href={`/products?category=${cat.id}`} className="nav-link" style={{ opacity: 0.7 }}>
                    {cat.categoryName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Price Range</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input type="range" min="0" max="1000" step="50" style={{ width: '100%' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', opacity: 0.6 }}>
                <span>$0</span>
                <span>$1000+</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
          {products.map((product) => (
            <div key={product.id} className="card relative group">
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
                <LikeButton productId={product.id} userId={userId} />
              </div>
              <Link href={`/products/${product.id}`} style={{ display: 'block' }}>
                <div style={{ 
                  aspectRatio: '1/1', 
                  backgroundColor: 'var(--input)', 
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  marginBottom: '1rem'
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={product.images[0]?.imageUrl || 'https://via.placeholder.com/400'} 
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', opacity: 0.5, textTransform: 'uppercase' }}>{product.category.categoryName}</span>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{product.name}</h3>
                <div style={{ display: 'flex', color: '#fbbf24', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                  {'★'.repeat(Math.round(product.rating || 0) || 4)}{'☆'.repeat(5 - (Math.round(product.rating || 0) || 4))}
                  <span style={{ color: 'var(--foreground)', opacity: 0.5, marginLeft: '0.25rem' }}>(42)</span>
                </div>
              </Link>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>${product.price}</span>
                <AddToCartButton productId={product.id} userId={userId} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
