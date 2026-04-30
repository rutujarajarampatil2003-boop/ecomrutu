'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { removeFromCart } from '@/lib/actions';

export default function RemoveFromCartButton({ cartItemId }: { cartItemId: number }) {
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    setLoading(true);
    await removeFromCart(cartItemId);
    setLoading(false);
  };

  return (
    <button 
      onClick={handleRemove}
      disabled={loading}
      style={{ 
        color: loading ? '#9ca3af' : '#ef4444', 
        background: 'none', 
        border: 'none', 
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.5 : 1
      }}
      title="Remove from cart"
    >
      <Trash2 size={18} />
    </button>
  );
}
