'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';
import { toggleWishlist } from '@/lib/actions';

export default function LikeButton({ productId, userId, initialLiked = false }: { productId: number, userId: number, initialLiked?: boolean }) {
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    // Optimistic UI update
    setLiked(!liked);
    
    const result = await toggleWishlist(userId, productId);
    
    if (!result.success) {
      // Revert on failure
      setLiked(liked);
      alert('Failed to update wishlist');
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleLike} 
      disabled={loading}
      style={{ 
        background: 'white', 
        border: 'none', 
        borderRadius: '50%', 
        width: '36px', 
        height: '36px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        color: liked ? '#ef4444' : '#9ca3af',
        transition: 'all 0.2s ease',
        transform: liked ? 'scale(1.1)' : 'scale(1)'
      }}
      title={liked ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart size={20} fill={liked ? '#ef4444' : 'none'} />
    </button>
  );
}
