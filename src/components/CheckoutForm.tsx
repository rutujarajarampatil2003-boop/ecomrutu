'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { processCheckout } from '@/lib/actions';
import { ArrowRight } from 'lucide-react';

export default function CheckoutForm({ userId }: { userId: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);
    const result = await processCheckout(userId);
    setLoading(false);

    if (result.success) {
      router.push('/checkout?success=true');
    } else {
      alert(result.error || 'Checkout failed');
    }
  };

  return (
    <button 
      onClick={handleCheckout} 
      disabled={loading}
      className="btn btn-primary" 
      style={{ width: '100%', padding: '1.25rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1 }}
    >
      {loading ? 'Confirming...' : 'I have Scanned & Paid'} <ArrowRight size={20} />
    </button>
  );
}
