'use client';

import React, { useState } from 'react';
import { themes } from '../context/themes';
import { ThemeDropdown } from './ThemeDropdown';

type Props = {
  themeKey: string;
  setTheme?: (t: string) => void;
  onAuth: () => void;
};

export default function LoginGate({ themeKey, setTheme, onAuth }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const current = themes[themeKey as keyof typeof themes];

  const enter = () => {
    onAuth();
  };

  const accent = current.color;
  const inputBase = {
    width: '100%',
    padding: 14,
    borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.14)',
    background: 'rgba(255,255,255,0.08)',
    color: 'inherit',
    outline: 'none',
    transition: 'border-color 200ms ease, transform 200ms ease',
  } as const;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: (current as any).bgGradient || current.bg,
        fontFamily: current.font,
        color: current.color,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(70px)', top: '-10%', left: '-10%' }} />
        <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', filter: 'blur(55px)', bottom: '-5%', right: '-8%' }} />
        <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', filter: 'blur(45px)', top: '20%', right: '10%' }} />
      </div>

      <div style={{ position: 'absolute', top: 28, right: 28 }}>
        {setTheme ? <ThemeDropdown currentTheme={themeKey} setTheme={setTheme} /> : null}
      </div>

      <div
        style={{
          width: 560,
          maxWidth: '92%',
          borderRadius: 28,
          padding: '42px 36px',
          background: 'rgba(18, 18, 18, 0.72)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 35px 90px rgba(0,0,0,0.25)',
          backdropFilter: 'blur(18px)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ marginBottom: 28, textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: 46, letterSpacing: '0.24em', textTransform: 'uppercase' }}>ReArchive</h1>
          <p style={{ margin: '16px auto 0', maxWidth: 420, opacity: 0.82, lineHeight: 1.75 }}>
            Welcome to ReArchive — your fashion-tech wardrobe companion.
            Preview your looks, generate premium edits, and enter the platform in demo mode.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={inputBase}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={inputBase}
          />
        </div>

        <div style={{ marginTop: 22, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={enter}
            style={{
              minWidth: 130,
              padding: '14px 24px',
              borderRadius: 14,
              border: 'none',
              background: accent,
              color: '#111',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'transform 180ms ease, opacity 180ms ease',
            }}
          >
            Login
          </button>
          <button
            onClick={enter}
            style={{
              minWidth: 130,
              padding: '14px 24px',
              borderRadius: 14,
              border: `1px solid ${accent}`,
              background: 'transparent',
              color: accent,
              cursor: 'pointer',
              transition: 'transform 180ms ease, opacity 180ms ease',
            }}
          >
            Sign Up
          </button>
        </div>

        <div style={{ marginTop: 20 }}>
          <button
            onClick={enter}
            style={{
              padding: '12px 18px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'transparent',
              color: 'inherit',
              opacity: 0.88,
              cursor: 'pointer',
            }}
          >
            Continue as Guest
          </button>
        </div>

        <p style={{ marginTop: 20, opacity: 0.65, fontSize: 13, lineHeight: 1.6 }}>
          Demo mode only — any email and password will work. Refreshing the page resets login.
        </p>
      </div>
    </div>
  );
}
