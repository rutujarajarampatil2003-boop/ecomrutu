'use client';

import { addToCart } from '@/lib/actions';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function AddToCartButton({ productId, userId }: { productId: number, userId: number }) {
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const result = await addToCart(userId, productId);
    setLoading(false);
    if (result.success) {
      alert('Added to cart!');
    } else {
      alert('Failed to add to cart');
    }
  };

  return (
    <button 
      onClick={handleAdd}
      disabled={loading}
      className="btn btn-primary" 
      style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', opacity: loading ? 0.5 : 1 }}
    >
      {loading ? '...' : 'Add'}
    </button>
  );
}
