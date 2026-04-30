import { prisma } from '@/lib/prisma';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
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
  const shipping = 20.00;
  const total = subtotal + shipping;

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <h1 style={{ marginBottom: '3rem' }}>Your Shopping Cart</h1>

      {!cart || cart.items.length === 0 ? (
        <div className="card glass" style={{ textAlign: 'center', padding: '6rem' }}>
          <ShoppingBag size={64} style={{ margin: '0 auto 2rem', opacity: 0.2 }} />
          <h2>Your cart is empty</h2>
          <p style={{ opacity: 0.5, marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem' }}>
          {/* Cart Items */}
          <div>
            {cart.items.map((item) => (
              <div key={item.id} className="card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '100px', height: '100px', backgroundColor: 'var(--input)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.product.images[0]?.imageUrl} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{item.product.name}</h3>
                  <p style={{ opacity: 0.5, fontSize: '0.875rem' }}>Qty: {item.quantity}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>${(item.product.price * item.quantity).toFixed(2)}</p>
                  <RemoveFromCartButton cartItemId={item.id} />
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="card glass" style={{ position: 'sticky', top: '6rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', opacity: 0.7 }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', opacity: 0.7 }}>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', marginTop: '1.5rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                <span style={{ fontWeight: 700 }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--primary)' }}>${total.toFixed(2)}</span>
              </div>
              <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', display: 'block', textAlign: 'center' }}>
                Checkout <ArrowRight size={20} style={{ display: 'inline', marginLeft: '0.5rem', verticalAlign: 'middle' }} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
