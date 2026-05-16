import { prisma } from '@/lib/prisma';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import RemoveFromCartButton from '@/components/RemoveFromCartButton';

export default async function CartPage() {
  const user = await prisma.user.findFirst();
  const userId = user?.id || 1;

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: { images: true }
          }
        }
      }
    }
  });

  const subtotal = cart?.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) || 0;
  const shipping = 0; // Amazon-style free shipping for demonstration
  const total = subtotal;

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Shopping Cart</h1>
        <span style={{ fontSize: '1.25rem', opacity: 0.4 }}>({cart?.items.length || 0} items)</span>
      </div>

      {!cart || cart.items.length === 0 ? (
        <div className="card glass" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--input)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <ShoppingBag size={40} style={{ opacity: 0.3 }} />
          </div>
          <h2>Your cart is empty</h2>
          <p style={{ opacity: 0.5, marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>Looks like you haven't added anything to your cart yet. Discover something you love!</p>
          <Link href="/products" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem' }}>
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cart.items.map((item) => (
              <div key={item.id} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{ width: '150px', aspectRatio: '1/1', backgroundColor: 'var(--input)', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.product.images[0]?.imageUrl} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <Link href={`/products/${item.product.id}`} style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2 }}>{item.product.name}</Link>
                    <span style={{ fontWeight: 800, fontSize: '1.5rem' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <p style={{ color: '#10b981', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>In Stock</p>
                  <p style={{ opacity: 0.6, fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>{item.product.description?.substring(0, 100)}...</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--input)', padding: '0.5rem 1rem', borderRadius: 'var(--radius)' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Qty: {item.quantity}</span>
                    </div>
                    <RemoveFromCartButton cartItemId={item.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div>
            <div className="card glass" style={{ position: 'sticky', top: '6rem', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                <CheckCircle size={18} />
                <span>Your order qualifies for FREE Shipping</span>
              </div>
              
              <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Order Subtotal</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '1.125rem' }}>
                <span style={{ opacity: 0.6 }}>Items ({cart.items.length})</span>
                <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '1.125rem' }}>
                <span style={{ opacity: 0.6 }}>Shipping</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>FREE</span>
              </div>
              
              <div style={{ borderTop: '1px solid var(--border)', marginTop: '1.5rem', paddingTop: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>Total</span>
                  <span style={{ fontWeight: 800, fontSize: '2rem', color: 'var(--primary)' }}>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)' }}>
                Proceed to Checkout <ArrowRight size={22} />
              </Link>
              
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.75rem', opacity: 0.6 }}>
                  <ShieldCheck size={18} />
                  <span>Secure SSL Encryption</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.75rem', opacity: 0.6 }}>
                  <Truck size={18} />
                  <span>Doorstep Delivery Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add local CheckCircle component for the free shipping note
function CheckCircle({ size, style }: { size: number, style?: any }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={style}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
