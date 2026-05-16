import Link from 'next/link';
import { CreditCard, CheckCircle, MapPin, Truck, ShieldCheck, Download, ExternalLink } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import CheckoutForm from '@/components/CheckoutForm';

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ success?: string, orderId?: string }> }) {
  const params = await searchParams;
  
  if (params.success) {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(params.orderId || '0') },
      include: { items: { include: { product: { include: { images: true } } } } }
    });

    return (
      <div className="container" style={{ padding: '6rem 1.5rem', maxWidth: '800px' }}>
        <div className="card glass" style={{ textAlign: 'center', padding: '4rem 2rem', marginBottom: '3rem' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'white', boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}>
            <CheckCircle size={60} />
          </div>
          <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>Order Placed Successfully!</h1>
          <p style={{ opacity: 0.7, marginBottom: '2rem', fontSize: '1.2rem' }}>
            Thank you for your purchase. Your order <strong>#ORD-{order?.id || '...' }</strong> is being processed.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/orders" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
              Track Order
            </Link>
            <button className="btn btn-outline" style={{ padding: '1rem 2rem' }}>
              <Download size={18} /> Invoice
            </button>
          </div>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck style={{ color: '#10b981' }} /> Order Details
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {order?.items.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius)', overflow: 'hidden', backgroundColor: 'var(--input)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.product.images[0]?.imageUrl || 'https://via.placeholder.com/100'} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.product.name}</p>
                    <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>Qty: {item.quantity}</p>
                  </div>
                </div>
                <span style={{ fontWeight: 700 }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', opacity: 0.6 }}>
                <span>Subtotal</span>
                <span>${order?.totalAmount.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', opacity: 0.6 }}>
                <span>Shipping</span>
                <span style={{ color: '#10b981' }}>FREE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.25rem', marginTop: '1rem' }}>
                <span>Total Amount Paid</span>
                <span style={{ color: 'var(--primary)' }}>${order?.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const user = await prisma.user.findFirst();
  const userId = user?.id || 1;

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: { include: { images: true } } } } }
  });

  const subtotal = cart?.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) || 0;
  const shipping = 0; // Amazon Free Shipping for Prime/Large orders
  const total = subtotal;

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Checkout</h1>
        <div style={{ display: 'flex', gap: '0.5rem', opacity: 0.4 }}>
          <span>Cart</span>
          <span>&gt;</span>
          <span style={{ fontWeight: 700, color: 'var(--primary)', opacity: 1 }}>Details</span>
          <span>&gt;</span>
          <span>Payment</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Shipping Details */}
          <div className="card">
            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <MapPin size={24} style={{ color: 'var(--primary)' }} /> Shipping Address
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: 600 }}>Full Name</label>
                <input type="text" className="card" style={{ padding: '1rem', width: '100%', backgroundColor: 'var(--input)' }} defaultValue={user?.fullName || ''} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: 600 }}>Detailed Address</label>
                <textarea className="card" style={{ padding: '1rem', width: '100%', backgroundColor: 'var(--input)', minHeight: '100px' }} placeholder="House No, Street, Landmark..."></textarea>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: 600 }}>City</label>
                <input type="text" className="card" style={{ padding: '1rem', width: '100%', backgroundColor: 'var(--input)' }} placeholder="Mumbai" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: 600 }}>Postal Code</label>
                <input type="text" className="card" style={{ padding: '1rem', width: '100%', backgroundColor: 'var(--input)' }} placeholder="400001" />
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="card">
            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CreditCard size={24} style={{ color: 'var(--primary)' }} /> Payment Method
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="card glass" style={{ padding: '1.5rem', border: '2px solid var(--primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '5px solid var(--primary)' }}></div>
                  <span style={{ fontWeight: 600 }}>UPI / Scan & Pay</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" alt="UPI" style={{ height: '15px' }} />
                </div>
              </div>
              <div className="card" style={{ padding: '1.5rem', opacity: 0.5, cursor: 'not-allowed', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--border)' }}></div>
                  <span style={{ fontWeight: 600 }}>Credit / Debit Card</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <CreditCard size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card glass" style={{ position: 'sticky', top: '6rem', padding: '2rem' }}>
            <h3 style={{ marginBottom: '2rem' }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {cart?.items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ opacity: 0.7 }}>{item.product.name} x {item.quantity}</span>
                  <span style={{ fontWeight: 600 }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', opacity: 0.7 }}>
                <span>Items Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', opacity: 0.7 }}>
                <span>Shipping Fee</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>FREE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', marginBottom: '2.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>Grand Total</span>
                <span style={{ fontWeight: 800, fontSize: '1.75rem', color: 'var(--primary)' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            {subtotal > 0 ? (
              <CheckoutForm userId={userId} total={total} />
            ) : (
              <button disabled className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', opacity: 0.5 }}>
                Your Cart is Empty
              </button>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', opacity: 0.5, fontSize: '0.75rem', lineHeight: 1.4 }}>
              <ShieldCheck size={32} />
              <p>Your payment information is encrypted and secure. By confirming, you agree to our Terms of Service.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
