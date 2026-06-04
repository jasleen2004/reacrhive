'use client';

import React, { useState } from 'react';

type Look = {
  id: string;
  title: string;
  description?: string;
  occasion?: string;
  style?: string;
  mood?: string;
  editorial?: string;
  palette?: string[];
  fabric?: string[];
  howToStyle?: string[];
  items?: { name: string; detail: string }[];
  wardrobeReferences?: string[];
};

type Props = {
  looks: Look[];
  onRemove?: (id: string) => void;
  onAddToCalendar?: (look: Look) => void;
};

export default function SavedLooks({ looks, onRemove, onAddToCalendar }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [addedToCalendar, setAddedToCalendar] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleAddToCalendar = (look: Look) => {
    onAddToCalendar?.(look);
    setAddedToCalendar((prev) => new Set(prev).add(look.id));
    setTimeout(() => {
      setAddedToCalendar((prev) => {
        const next = new Set(prev);
        next.delete(look.id);
        return next;
      });
    }, 2000);
  };

  return (
    <section style={{ padding: '40px 20px', maxWidth: 1100, margin: 'auto' }}>
      <h2 style={{ fontSize: 36, marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Saved Looks
      </h2>
      <p style={{ opacity: 0.6, marginBottom: 28, fontSize: 14 }}>
        {looks.length} look{looks.length !== 1 ? 's' : ''} saved
      </p>

      {looks.length === 0 ? (
        <div style={{ opacity: 0.8 }}>No saved looks yet. Generate an outfit and save it here.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {looks.map((l) => {
            const isOpen = expandedId === l.id;
            const isAdded = addedToCalendar.has(l.id);

            return (
              <div
                key={l.id}
                style={{
                  borderRadius: 18,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease',
                }}
              >
                {/* HEADER ROW — always visible, click to expand */}
                <div
                  onClick={() => toggle(l.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 22px',
                    cursor: 'pointer',
                    gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>{l.title}</h3>
                    {!isOpen && (
                      <p style={{ margin: 0, fontSize: 13, opacity: 0.6, maxWidth: 600 }}>
                        {l.description}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    {/* TAGS */}
                    {l.occasion && (
                      <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.07)', opacity: 0.8 }}>
                        {l.occasion}
                      </span>
                    )}
                    {l.style && (
                      <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.07)', opacity: 0.8 }}>
                        {l.style}
                      </span>
                    )}
                    {/* CHEVRON */}
                    <span style={{ fontSize: 18, opacity: 0.5, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>
                      ⌄
                    </span>
                  </div>
                </div>

                {/* EXPANDED CONTENT */}
                {isOpen && (
                  <div style={{ padding: '0 22px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>

                    {/* DESCRIPTION */}
                    {l.description && (
                      <p style={{ margin: 0, fontSize: 14, opacity: 0.75, lineHeight: 1.75 }}>{l.description}</p>
                    )}

                    {/* PALETTE */}
                    {l.palette && l.palette.length > 0 && (
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {l.palette.map((color) => (
                          <span key={color} style={{ fontSize: 12, padding: '5px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            {color}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* KEY PIECES */}
                    {l.items && l.items.length > 0 && (
                      <div>
                        <p style={{ margin: '0 0 10px', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.5 }}>
                          Key Pieces
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {l.items.map((item) => (
                            <div key={item.name} style={{ fontSize: 13, padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', lineHeight: 1.6 }}>
                              <strong style={{ fontWeight: 600 }}>{item.name}</strong>
                              {item.detail && <span style={{ opacity: 0.7 }}> — {item.detail}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STYLING NOTES */}
                    {l.howToStyle && l.howToStyle.length > 0 && (
                      <div>
                        <p style={{ margin: '0 0 10px', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.5 }}>
                          Styling Notes
                        </p>
                        <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {l.howToStyle.map((tip, i) => (
                            <li key={i} style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.65 }}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* EDITORIAL */}
                    {l.editorial && (
                      <p style={{ margin: 0, fontSize: 13, opacity: 0.6, fontStyle: 'italic', lineHeight: 1.8, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
                        {l.editorial}
                      </p>
                    )}

                    {/* ACTION BUTTONS */}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
                      <button
                        onClick={() => handleAddToCalendar(l)}
                        style={{
                          padding: '9px 16px',
                          borderRadius: 999,
                          border: '1px solid rgba(255,255,255,0.14)',
                          background: isAdded ? 'rgba(100,200,100,0.12)' : 'rgba(214,179,111,0.1)',
                          color: isAdded ? '#8eda8e' : '#f5e0b8',
                          cursor: 'pointer',
                          fontSize: 13,
                          fontWeight: 600,
                          transition: 'all 0.25s ease',
                        }}
                      >
                        {isAdded ? '✓ Added to Planner' : '📅 Add to Planner'}
                      </button>

                      <button
                        onClick={() => onRemove && onRemove(l.id)}
                        style={{
                          padding: '9px 16px',
                          borderRadius: 999,
                          border: '1px solid rgba(255,255,255,0.08)',
                          background: 'transparent',
                          color: 'inherit',
                          cursor: 'pointer',
                          fontSize: 13,
                          opacity: 0.6,
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}