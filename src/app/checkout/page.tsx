import Link from 'next/link';
import { CreditCard, CheckCircle } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import CheckoutForm from '@/components/CheckoutForm';

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const params = await searchParams;
  
  if (params.success) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <CheckCircle size={80} style={{ color: '#10b981', margin: '0 auto 2rem' }} />
        <h1 style={{ marginBottom: '1rem' }}>Payment Successful!</h1>
        <p style={{ opacity: 0.7, marginBottom: '2rem', fontSize: '1.2rem' }}>
          Thank you for your purchase. Your receipt has been sent to your registered mobile number via SMS.
        </p>
        <Link href="/orders" className="btn btn-primary">
          View Your Orders
        </Link>
      </div>
    );
  }

  const user = await prisma.user.findFirst();
  const userId = user?.id || 1;

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } }
  });

  const subtotal = cart?.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) || 0;
  const shipping = 20.00;
  const total = subtotal > 0 ? subtotal + shipping : 0;

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <h1 style={{ marginBottom: '3rem' }}>Secure Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem' }}>
        <div>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Shipping Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="text" placeholder="First Name" className="card" style={{ padding: '0.75rem', backgroundColor: 'var(--input)' }} defaultValue={user?.fullName?.split(' ')[0]} />
              <input type="text" placeholder="Last Name" className="card" style={{ padding: '0.75rem', backgroundColor: 'var(--input)' }} defaultValue={user?.fullName?.split(' ')[1]} />
              <input type="text" placeholder="Address" className="card" style={{ padding: '0.75rem', backgroundColor: 'var(--input)', gridColumn: 'span 2' }} />
              <input type="text" placeholder="City" className="card" style={{ padding: '0.75rem', backgroundColor: 'var(--input)' }} />
              <input type="text" placeholder="Postal Code" className="card" style={{ padding: '0.75rem', backgroundColor: 'var(--input)' }} />
            </div>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              Scan & Pay with QR Code
            </h3>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '1rem', 
              borderRadius: 'var(--radius)', 
              display: 'inline-block',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=merchant@upi&pn=ECOMM&am=${total.toFixed(2)}&cu=USD`} 
                alt="Payment QR Code"
                style={{ width: '200px', height: '200px' }}
              />
            </div>
            <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '1rem' }}>
              Scan this QR code with your payment app (GPay, PhonePe, Paytm, etc.) to complete the payment of <strong>${total.toFixed(2)}</strong>
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', opacity: 0.5 }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" alt="UPI" style={{ height: '20px' }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png" alt="GPay" style={{ height: '20px' }} />
            </div>
          </div>
        </div>

        <div>
          <div className="card glass" style={{ position: 'sticky', top: '6rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', opacity: 0.7 }}>
              <span>Items Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', opacity: 0.7 }}>
              <span>Shipping</span>
              <span>${subtotal > 0 ? shipping.toFixed(2) : '0.00'}</span>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', marginTop: '1.5rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
              <span style={{ fontWeight: 700 }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--primary)' }}>${total.toFixed(2)}</span>
            </div>
            
            {subtotal > 0 ? (
              <CheckoutForm userId={userId} total={total} />
            ) : (
              <button disabled className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', opacity: 0.5 }}>
                Cart is Empty
              </button>
            )}
            
            <p style={{ textAlign: 'center', opacity: 0.5, fontSize: '0.875rem', marginTop: '1.5rem' }}>
              Once you have scanned and paid, click the button above to confirm your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
