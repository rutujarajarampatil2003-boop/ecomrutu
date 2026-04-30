'use client';

import { registerUser } from '@/lib/actions';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);
    
    setLoading(false);
    if (result.success) {
      alert('Account created successfully! Please login.');
      router.push('/auth/login');
    } else {
      setError(result.error || 'Something went wrong');
    }
  }

  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent)'
    }}>
      <div className="card glass animate-fadeIn" style={{ width: '400px', padding: '3rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</h1>
        
        {error && <p style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Full Name</label>
            <input 
              name="fullName"
              type="text" 
              required
              className="card" 
              style={{ width: '100%', padding: '0.75rem' }} 
              placeholder="John Doe"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              className="card" 
              style={{ width: '100%', padding: '0.75rem' }} 
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Password</label>
            <input 
              name="password"
              type="password" 
              required
              className="card" 
              style={{ width: '100%', padding: '0.75rem' }} 
              placeholder="••••••••"
            />
          </div>
          <button 
            className="btn btn-primary" 
            style={{ padding: '1rem', marginTop: '1rem' }} 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '2rem', opacity: 0.7, fontSize: '0.875rem' }}>
          Already have an account? <Link href="/auth/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
