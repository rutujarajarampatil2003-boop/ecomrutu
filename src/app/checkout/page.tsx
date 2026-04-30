import Link from 'next/link';
import { CreditCard, CheckCircle } from 'lucide-react';

export default function CheckoutPage({ searchParams }: { searchParams: { success?: string } }) {
  if (searchParams.success) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <CheckCircle size={80} style={{ color: '#10b981', margin: '0 auto 2rem' }} />
        <h1 style={{ marginBottom: '1rem' }}>Payment Successful!</h1>
        <p style={{ opacity: 0.7, marginBottom: '3rem', fontSize: '1.2rem' }}>
          Thank you for your purchase. Your order has been placed and is being processed.
        </p>
        <Link href="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <h1 style={{ marginBottom: '3rem' }}>Secure Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem' }}>
        <div>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Shipping Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="text" placeholder="First Name" className="card" style={{ padding: '0.75rem', backgroundColor: 'var(--input)' }} />
              <input type="text" placeholder="Last Name" className="card" style={{ padding: '0.75rem', backgroundColor: 'var(--input)' }} />
              <input type="text" placeholder="Address" className="card" style={{ padding: '0.75rem', backgroundColor: 'var(--input)', gridColumn: 'span 2' }} />
              <input type="text" placeholder="City" className="card" style={{ padding: '0.75rem', backgroundColor: 'var(--input)' }} />
              <input type="text" placeholder="Postal Code" className="card" style={{ padding: '0.75rem', backgroundColor: 'var(--input)' }} />
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CreditCard /> Payment Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Card Number" className="card" style={{ padding: '0.75rem', backgroundColor: 'var(--input)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input type="text" placeholder="MM/YY" className="card" style={{ padding: '0.75rem', backgroundColor: 'var(--input)' }} />
                <input type="text" placeholder="CVC" className="card" style={{ padding: '0.75rem', backgroundColor: 'var(--input)' }} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card glass" style={{ position: 'sticky', top: '6rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', opacity: 0.7 }}>
              <span>Items Total</span>
              <span>Calculating...</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', opacity: 0.7 }}>
              <span>Shipping</span>
              <span>$20.00</span>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', marginTop: '1.5rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
              <span style={{ fontWeight: 700 }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--primary)' }}>Secure</span>
            </div>
            
            <Link href="/checkout?success=true" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', textAlign: 'center', display: 'block' }}>
              Pay Now
            </Link>
            
            <p style={{ textAlign: 'center', opacity: 0.5, fontSize: '0.875rem', marginTop: '1.5rem' }}>
              Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
