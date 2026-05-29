'use client';

import React from 'react';

export function HeroSection() {
  return (
    <div style={{ minHeight: 'calc(100vh - 84px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem', position: 'relative' }}>
      <div className="relative z-10 text-center">
        <h1 className="display-heading" style={{
          margin: 0,
          fontFamily: "Cormorant Garamond, serif",
          fontWeight: 700,
          fontSize: 'clamp(48px, 9vw, 120px)',
          lineHeight: 1,
          letterSpacing: '0.08em',
        }}>
          ReArchive
        </h1>

        <p style={{ maxWidth: 760, margin: '20px auto 0', opacity: 0.75, fontSize: 16, lineHeight: 1.6 }}>
          AI-powered fashion styling, digital wardrobe, and identity-driven aesthetics.
        </p>
      </div>
    </div>
  );
}
