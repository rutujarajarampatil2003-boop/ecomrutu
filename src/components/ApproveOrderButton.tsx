'use client';

import { useState } from 'react';
import { approveOrder } from '@/lib/actions';
import { CheckCircle } from 'lucide-react';

export default function ApproveOrderButton({ orderId }: { orderId: number }) {
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    const result = await approveOrder(orderId);
    setLoading(false);

    if (result.success) {
      alert('Order payment approved successfully!');
    } else {
      alert('Failed to approve order.');
    }
  };

  return (
    <button 
      onClick={handleApprove}
      disabled={loading}
      className="btn btn-primary"
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#10b981', color: 'white', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
    >
      <CheckCircle size={16} />
      {loading ? 'Approving...' : 'Approve Payment'}
    </button>
  );
}
