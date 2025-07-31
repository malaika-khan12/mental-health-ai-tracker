'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const linkStyle = (path: string) => ({
    padding: '0.5rem 1rem',
    color: pathname === path ? '#ffffff' : '#4A7C59',
    backgroundColor: pathname === path ? '#4A7C59' : 'transparent',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  });

  return (
    <nav
      style={{
        backgroundColor: '#E6F4EA',
        padding: '1rem 2rem',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          color: '#4A7C59',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          textDecoration: 'none',
        }}
      >
        MindEase
      </Link>

      {/* Desktop Menu */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
        className="nav-links hidden md:flex"
      >
        <Link href="/" style={linkStyle('/')}>Home</Link>
        <Link href="/mood-tracker" style={linkStyle('/mood-tracker')}>Mood Tracker</Link>
        <Link href="/dashboard" style={linkStyle('/dashboard')}>Dashboard</Link>
        <Link href="/resources" style={linkStyle('/resources')}>Resources</Link>
        <Link href="/about" style={linkStyle('/about')}>About</Link>
        <Link href="/profile" style={linkStyle('/profile')}>Profile</Link>
      </div>

      {/* Hamburger for Mobile */}
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          zIndex: 50,
        }}
        className="md:hidden"
      >
        <span style={{ width: '25px', height: '3px', backgroundColor: '#4A7C59', borderRadius: '2px' }}></span>
        <span style={{ width: '25px', height: '3px', backgroundColor: '#4A7C59', borderRadius: '2px' }}></span>
        <span style={{ width: '25px', height: '3px', backgroundColor: '#4A7C59', borderRadius: '2px' }}></span>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            backgroundColor: '#E6F4EA',
            borderRadius: '12px',
            marginTop: '0.5rem',
            padding: '1rem',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '200px',
            animation: 'fadeIn 0.3s ease-in-out',
          }}
        >
          <Link href="/" style={linkStyle('/')}>Home</Link>
          <Link href="/mood-tracker" style={linkStyle('/mood-tracker')}>Mood Tracker</Link>
          <Link href="/dashboard" style={linkStyle('/dashboard')}>Dashboard</Link>
          <Link href="/resources" style={linkStyle('/resources')}>Resources</Link>
          <Link href="/about" style={linkStyle('/about')}>About</Link>
          <Link href="/profile" style={linkStyle('/profile')}>Profile</Link>
        </div>
      )}
    </nav>
  );
}
