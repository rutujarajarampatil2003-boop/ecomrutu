'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { processCheckout } from '@/lib/actions';
import { ArrowRight } from 'lucide-react';

export default function CheckoutForm({ userId, total }: { userId: number, total: number }) {
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const router = useRouter();

  const handleCheckout = async () => {
    if (!transactionId || transactionId.length < 8) {
      alert('Please enter a valid Transaction ID / UTR Number to confirm payment.');
      return;
    }

    setLoading(true);
    const result = await processCheckout(userId, transactionId);
    setLoading(false);

    if (result.success) {
      router.push(`/checkout?success=true&orderId=${result.orderId}`);
    } else {
      alert(result.error || 'Checkout failed');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'var(--input)', borderRadius: 'var(--radius)', border: '1px dashed var(--primary)' }}>
        <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>Scan to Pay with Any App</p>
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: 'var(--radius)', display: 'inline-block', marginBottom: '1rem' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=merchant@upi&pn=ECOMM&am=${total.toFixed(2)}&cu=USD`} 
            alt="QR Code" 
            style={{ width: '150px', height: '150px' }} 
          />
        </div>
        <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Total Amount: ${total.toFixed(2)}</p>
      </div>

      <div style={{ textAlign: 'left' }}>
        <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: 700 }}>
          Payment Confirmation (UTR / TXN ID)
        </label>
        <input 
          type="text" 
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter 12-digit transaction ID" 
          className="card" 
          style={{ padding: '1rem', backgroundColor: 'var(--background)', width: '100%', border: '1px solid var(--border)', fontSize: '1rem' }} 
        />
        <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.75rem' }}>
          * Enter the ID from your payment app (GPay/PhonePe) to confirm your order.
        </p>
      </div>

      <button 
        onClick={handleCheckout} 
        disabled={loading}
        className="btn btn-primary" 
        style={{ 
          width: '100%', 
          padding: '1.25rem', 
          fontSize: '1.125rem',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.75rem', 
          opacity: loading ? 0.7 : 1,
          boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)'
        }}
      >
        {loading ? 'Verifying...' : 'Complete Payment & Order'} <ArrowRight size={20} />
      </button>
    </div>
  );
}
