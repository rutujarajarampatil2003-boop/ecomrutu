import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce | Professional Shop",
  description: "A premium full-stack e-commerce experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <footer className="glass" style={{ marginTop: '4rem', padding: '4rem 0', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div className="grid grid-cols-4">
              <div>
                <h3 style={{ color: 'var(--primary)' }}>ECOMM</h3>
                <p style={{ opacity: 0.7 }}>Premium shopping experience with state-of-the-art technology.</p>
              </div>
              <div>
                <h4>Shop</h4>
                <ul style={{ listStyle: 'none' }}>
                  <li><Link href="/products">All Products</Link></li>
                  <li><Link href="/categories">Categories</Link></li>
                  <li><Link href="/vendors">Vendors</Link></li>
                </ul>
              </div>
              <div>
                <h4>Support</h4>
                <ul style={{ listStyle: 'none' }}>
                  <li><Link href="/faq">FAQ</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                  <li><Link href="/shipping">Shipping</Link></li>
                </ul>
              </div>
              <div>
                <h4>Newsletter</h4>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <input type="email" placeholder="Your email" className="card" style={{ padding: '0.5rem', flex: 1 }} />
                  <button className="btn btn-primary">Join</button>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '4rem', textAlign: 'center', opacity: 0.5, fontSize: '0.875rem' }}>
              © 2026 ECOMM. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
