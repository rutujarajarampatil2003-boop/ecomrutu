'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = [
    {
      title: 'Fashion New Arrivals',
      subtitle: 'Step into Style with Premium Collections',
      badge: 'LIMITED TIME OFFER',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80',
      color: 'linear-gradient(to right, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.4))'
    },
    {
      title: 'Summer Electronics Sale',
      subtitle: 'Up to 40% Off on Top Gadgets',
      badge: 'SEASONAL DEAL',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600&q=80',
      color: 'linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(99, 102, 241, 0.4))'
    },
    {
      title: 'Modern Home Decor',
      subtitle: 'Elevate Your Living Space',
      badge: 'NEW COLLECTION',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1600&q=80',
      color: 'linear-gradient(to right, rgba(236, 72, 153, 0.8), rgba(249, 115, 22, 0.4))'
    }
  ];

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length, paused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div 
      className="hero-container"
      style={{
        position: 'relative',
        height: '650px',
        overflow: 'hidden',
        borderRadius: '2.5rem',
        margin: '1.5rem 0 4rem',
        backgroundColor: '#111',
        boxShadow: 'var(--shadow-lg)',
        animation: 'fadeIn 1s ease'
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: currentSlide === index ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: currentSlide === index ? 1 : 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt={slide.title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transform: currentSlide === index ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 8s ease'
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: slide.color,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 6rem',
            color: 'white'
          }}>
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              backdropFilter: 'blur(10px)',
              padding: '0.6rem 1.2rem', 
              borderRadius: '99px', 
              display: 'inline-block', 
              fontSize: '0.875rem', 
              fontWeight: 800,
              letterSpacing: '0.15em',
              marginBottom: '2rem',
              width: 'fit-content',
              border: '1px solid rgba(255,255,255,0.3)',
              transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'all 0.8s ease 0.2s'
            }}>
              {slide.badge}
            </div>
            <h1 style={{ 
              fontSize: '5rem', 
              fontWeight: 900, 
              marginBottom: '1.5rem', 
              lineHeight: 1.05,
              maxWidth: '900px',
              letterSpacing: '-0.04em',
              transform: currentSlide === index ? 'translateY(0)' : 'translateY(40px)',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'all 0.8s ease 0.4s'
            }}>
              {slide.title}
            </h1>
            <p style={{ 
              fontSize: '1.75rem', 
              marginBottom: '3.5rem',
              maxWidth: '700px',
              fontWeight: 400,
              transform: currentSlide === index ? 'translateY(0)' : 'translateY(40px)',
              opacity: currentSlide === index ? 0.9 : 0,
              transition: 'all 0.8s ease 0.6s'
            }}>
              {slide.subtitle}
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1.5rem',
              transform: currentSlide === index ? 'translateY(0)' : 'translateY(40px)',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'all 0.8s ease 0.8s'
            }}>
              <Link href="/products" className="btn" style={{ 
                backgroundColor: 'white', 
                color: '#111', 
                padding: '1.25rem 3rem',
                fontSize: '1.25rem',
                fontWeight: 700,
                boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                borderRadius: '99px'
              }}>
                Shop Now <ArrowRight size={22} />
              </Link>
              <Link href="/categories" className="btn" style={{ 
                padding: '1.25rem 3rem',
                fontSize: '1.25rem',
                fontWeight: 700,
                border: '2px solid rgba(255,255,255,0.4)',
                borderRadius: '99px',
                color: 'white',
                backdropFilter: 'blur(10px)'
              }}>
                Explore
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <button 
        onClick={prevSlide}
        style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10, color: 'white', opacity: 0.5, cursor: 'pointer', background: 'none', border: 'none' }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
      >
        <ChevronLeft size={48} />
      </button>
      <button 
        onClick={nextSlide}
        style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10, color: 'white', opacity: 0.5, cursor: 'pointer', background: 'none', border: 'none' }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
      >
        <ChevronRight size={48} />
      </button>

      <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '1rem' }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            style={{
              width: currentSlide === i ? '50px' : '12px',
              height: '12px',
              borderRadius: '6px',
              backgroundColor: 'white',
              opacity: currentSlide === i ? 1 : 0.3,
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              border: 'none',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
