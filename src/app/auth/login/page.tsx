'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent)'
    }}>
      <div className="card glass animate-fadeIn" style={{ width: '400px', padding: '3rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Email Address</label>
            <input 
              type="email" 
              className="card" 
              style={{ width: '100%', padding: '0.75rem' }} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Password</label>
            <input 
              type="password" 
              className="card" 
              style={{ width: '100%', padding: '0.75rem' }} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="btn btn-primary" style={{ padding: '1rem', marginTop: '1rem' }} type="button">
            Sign In
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '2rem', opacity: 0.7, fontSize: '0.875rem' }}>
          Don't have an account? <Link href="/auth/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create one</Link>
        </p>
      </div>
    </div>
  );
}
