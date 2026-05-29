'use client';

import React, { useState, useRef, useEffect } from 'react';
import { themes } from '../context/themes';

type Props = {
  currentTheme: string;
  setTheme: (t: string) => void;
};

export function ThemeDropdown({ currentTheme, setTheme }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((s) => !s)}
        style={{
          padding: '8px 14px',
          borderRadius: 12,
          border: `1px solid rgba(255,255,255,0.12)`,
          background: 'rgba(255,255,255,0.04)',
          color: 'inherit',
          cursor: 'pointer',
          backdropFilter: 'blur(6px)',
        }}
      >
        Theme Switcher · {themes[currentTheme as keyof typeof themes]?.name || currentTheme}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            marginTop: 10,
            width: 220,
            borderRadius: 12,
            padding: 8,
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {Object.keys(themes).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTheme(t);
                setOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 10px',
                borderRadius: 10,
                background: t === currentTheme ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: 'inherit',
                cursor: 'pointer',
                textAlign: 'left',
                border: 'none',
              }}
            >
              <div style={{ flex: 1 }}>{themes[t as keyof typeof themes].name}</div>
              {t === currentTheme && (
                <div style={{ fontSize: 12, opacity: 0.8 }}>Selected</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
