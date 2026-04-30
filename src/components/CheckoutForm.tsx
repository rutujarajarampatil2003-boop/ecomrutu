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
      router.push('/checkout?success=true');
    } else {
      alert(result.error || 'Checkout failed');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ textAlign: 'left' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
          Transaction ID / UTR Number
        </label>
        <input 
          type="text" 
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter 12-digit UTR number" 
          className="card" 
          style={{ padding: '0.75rem', backgroundColor: 'var(--input)', width: '100%', border: '1px solid var(--border)' }} 
        />
        <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.5rem' }}>
          Mandatory: Enter the ID from your payment app to verify.
        </p>
      </div>

      <button 
        onClick={handleCheckout} 
        disabled={loading}
        className="btn btn-primary" 
        style={{ width: '100%', padding: '1.25rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? 'Confirming Payment...' : 'I have Scanned & Paid'} <ArrowRight size={20} />
      </button>
    </div>
  );
}
