import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany();

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Shop by Category</h1>
        <p style={{ opacity: 0.6, fontSize: '1.2rem', marginTop: '1rem' }}>Discover top-rated products curated by department.</p>
      </div>

      <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            href={`/products?category=${cat.id}`} 
            className="card group" 
            style={{ 
              display: 'block', 
              overflow: 'hidden', 
              padding: 0,
              position: 'relative',
              borderRadius: 'var(--radius)',
              height: '350px'
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={cat.imageUrl || `https://source.unsplash.com/800x600/?${cat.categoryName.toLowerCase()}`}
              alt={cat.categoryName}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
              className="group-hover:scale-105"
            />
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '2rem'
            }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>
                {cat.categoryName}
              </h2>
              {cat.description && (
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '1rem' }}>
                  {cat.description}
                </p>
              )}
              <div style={{ 
                color: 'var(--primary)', 
                fontWeight: 600, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                fontSize: '1.1rem'
              }}>
                Explore {cat.categoryName} <ArrowRight size={20} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
