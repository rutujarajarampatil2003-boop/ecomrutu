'use client';

import { useState } from 'react';
import { returnOrder } from '@/lib/actions';
import { RotateCcw } from 'lucide-react';

export default function ReturnOrderButton({ orderId }: { orderId: number }) {
  const [loading, setLoading] = useState(false);

  const handleReturn = async () => {
    if (!confirm('Are you sure you want to return this order and request a refund?')) return;
    
    setLoading(true);
    const result = await returnOrder(orderId);
    setLoading(false);

    if (result.success) {
      alert('Return successful. The amount has been refunded to your account.');
    } else {
      alert('Failed to process return. Please contact support.');
    }
  };

  return (
    <button 
      onClick={handleReturn}
      disabled={loading}
      className="btn btn-outline"
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: loading ? 0.5 : 1 }}
    >
      <RotateCcw size={16} />
      {loading ? 'Processing...' : 'Return Order'}
    </button>
  );
}
