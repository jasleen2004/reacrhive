'use client';

import React from 'react';

export function HeroSection() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '0 24px',
      textAlign: 'center',
    }}>

      {/* BACKGROUND GRAIN */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
        opacity: 0.4,
        pointerEvents: 'none',
      }} />

      {/* GLOW ORBS */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(214,179,111,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '8%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(180,140,200,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* EYEBROW */}
        <p style={{
          fontSize: 11,
          letterSpacing: '0.45em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          margin: '0 0 28px',
          fontFamily: "'Quicksand', sans-serif",
          fontWeight: 600,
          textAlign: 'center',
        }}>
          Circular Fashion · AI Styling · Conscious Wardrobe
        </p>

        {/* MAIN HEADING */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(4rem, 13vw, 11rem)',
          fontWeight: 700,
          lineHeight: 0.9,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          margin: '0 0 8px',
          color: 'var(--text)',
          width: '100%',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}>
          ReArchive
        </h1>

        {/* PUNCHLINE */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(0.9rem, 1.6vw, 1.2rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          margin: '16px 0 36px',
          textAlign: 'center',
        }}>
          Own Less. Style More.
        </p>

        {/* TAGLINE */}
        <p style={{
          fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
          lineHeight: 1.9,
          color: 'var(--muted)',
          maxWidth: 580,
          margin: '0 auto 48px',
          fontWeight: 300,
          letterSpacing: '0.02em',
          textAlign: 'center',
        }}>
          The fashion industry produces 92 million tonnes of waste every year.
          ReArchive is the antidote — an AI-powered wardrobe intelligence platform
          built on sustainability, style, and the belief that less can mean more.
        </p>

        {/* CTA BUTTONS */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            padding: '15px 34px',
            borderRadius: 999,
            background: 'rgba(214,179,111,0.12)',
            border: '1px solid rgba(214,179,111,0.35)',
            color: 'var(--text)',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(214,179,111,0.22)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(214,179,111,0.12)')}
          >
            Start Archiving
          </button>
          <button style={{
            padding: '15px 34px',
            borderRadius: 999,
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--muted)',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}>
            Our Mission
          </button>
        </div>
      </div>
    </section>
  );
}