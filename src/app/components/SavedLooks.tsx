'use client';

import React from 'react';

type Look = {
  id: string;
  title: string;
  description?: string;
  occasion?: string;
  style?: string;
  mood?: string;
};

type Props = {
  looks: Look[];
  onRemove?: (id: string) => void;
};

export default function SavedLooks({ looks, onRemove }: Props) {
  return (
    <section style={{ padding: '40px 20px', maxWidth: 1100, margin: 'auto' }}>
      <h2 style={{ fontSize: 36, marginBottom: 18 }}>Saved Looks</h2>

      {looks.length === 0 ? (
        <div style={{ opacity: 0.8 }}>No saved looks yet. Generate an outfit and save it here.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
          {looks.map((l) => (
            <div key={l.id} style={{ padding: 18, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ margin: 0 }}>{l.title}</h3>
              <div style={{ marginTop: 8, opacity: 0.85 }}>{l.description}</div>
              <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {l.occasion && <div style={{ fontSize: 12, opacity: 0.8 }}>{l.occasion}</div>}
                {l.style && <div style={{ fontSize: 12, opacity: 0.8 }}>{l.style}</div>}
                {l.mood && <div style={{ fontSize: 12, opacity: 0.8 }}>{l.mood}</div>}
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <button onClick={() => onRemove && onRemove(l.id)} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', cursor: 'pointer' }}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
