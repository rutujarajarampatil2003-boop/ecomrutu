'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Category {
  id: number;
  categoryName: string;
  description: string | null;
  imageUrl: string | null;
}

interface CategorySliderProps {
  categories: Category[];
}

const CategorySlider: React.FC<CategorySliderProps> = ({ categories }) => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % Math.ceil(categories.length / 4));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? Math.ceil(categories.length / 4) - 1 : prev - 1));
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isHovered, categories.length]);

  return (
    <section 
      style={{ padding: '6rem 0', backgroundColor: '#fff', borderRadius: '4rem', margin: '4rem 0' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em' }}>Shop by Department</h2>
            <p style={{ opacity: 0.5, fontSize: '1.25rem' }}>Explore our handpicked categories for every need.</p>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '0.5rem' }}>
            <button onClick={prevSlide} className="btn btn-outline" style={{ borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft size={28} />
            </button>
            <button onClick={nextSlide} className="btn btn-outline" style={{ borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronRight size={28} />
            </button>
          </div>
        </div>

        <div style={{ overflow: 'hidden', margin: '0 -1.5rem', padding: '1.5rem' }}>
          <div style={{ 
            display: 'flex', 
            gap: '2.5rem', 
            transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: `translateX(-${current * 100}%)`
          }}>
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/products?category=${category.id}`} 
                style={{ 
                  flex: '0 0 calc(25% - 1.875rem)',
                  minWidth: '300px',
                  display: 'block'
                }}
              >
                <div 
                  className="card" 
                  style={{ 
                    padding: 0, 
                    overflow: 'hidden', 
                    height: '480px', 
                    position: 'relative',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: 'none',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    borderRadius: '2.5rem'
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.1)';
                    e.currentTarget.style.transform = 'translateY(-15px)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={category.imageUrl || 'https://via.placeholder.com/400x600'} 
                    alt={category.categoryName} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.8s ease'
                    }} 
                  />
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2.5rem',
                    color: 'white'
                  }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>{category.categoryName}</h3>
                    <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '1.5rem', lineHeight: 1.5 }}>
                      {category.description || `Browse our exclusive ${category.categoryName} collection.`}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      fontWeight: 800, 
                      fontSize: '0.875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--primary)',
                      backgroundColor: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '99px',
                      width: 'fit-content'
                    }}>
                      Shop Now <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
