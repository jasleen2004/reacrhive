'use client';

import React, { useState } from 'react';
import { themes } from '../context/themes';

type WardrobeItem = {
  id: string;
  name: string;
  category: string;
  aesthetic: string;
  imageUrl: string;
};

const CATEGORIES = ['Tops', 'Bottoms', 'Shoes', 'Outerwear', 'Accessories', 'Bags', 'Jewelry'];
const AESTHETICS = [
  'Archive Noir',
  'Dreamstate',
  'Chrome Pop',
  'Atelier',
  'Afterglow/District',
];

export default function Wardrobe() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [aesthetic, setAesthetic] = useState(AESTHETICS[0]);

  const onFile = (f?: File) => {
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const addItem = () => {
    if (!preview || !name) return;
    const newItem: WardrobeItem = {
      id: String(Date.now()),
      name,
      category,
      aesthetic,
      imageUrl: preview,
    };
    setItems((s) => [newItem, ...s]);
    setFile(null);
    setPreview(null);
    setName('');
    setCategory(CATEGORIES[0]);
    setAesthetic(AESTHETICS[0]);
  };

  return (
    <section style={{ maxWidth: 1100, margin: '60px auto', padding: '30px', borderRadius: 16 }}>
      <h2 style={{ fontSize: 36, marginBottom: 12 }}>Digital Wardrobe</h2>
      <p style={{ opacity: 0.8, marginBottom: 18 }}>Upload and organize your clothing items. No backend—local state only.</p>

      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 18 }}>
        <div style={{ minWidth: 220, flex: 1, maxWidth: 360 }}>
          <label style={{ display: 'block', marginBottom: 8, color: 'rgba(255,255,255,0.9)' }}>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFile(e.target.files?.[0])}
            style={{ width: '100%' }}
          />
          {preview && (
            <div style={{ marginTop: 12 }}>
              <img src={preview} alt="preview" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', maxHeight: 220 }} />
            </div>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 220, maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ color: 'rgba(255,255,255,0.9)' }}>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} style={{ padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: 'inherit' }} />

          <label style={{ color: 'rgba(255,255,255,0.9)' }}>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: 'inherit' }}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label style={{ color: 'rgba(255,255,255,0.9)' }}>Aesthetic</label>
          <select value={aesthetic} onChange={(e) => setAesthetic(e.target.value)} style={{ padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: 'inherit' }}>
            {AESTHETICS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button onClick={addItem} style={{ padding: '12px 18px', borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.9)', color: '#111', fontWeight: 700, cursor: 'pointer' }}>Save Item</button>
            <button onClick={() => { setFile(null); setPreview(null); setName(''); }} style={{ padding: '12px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: 'inherit', cursor: 'pointer' }}>Clear</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <h3 style={{ marginBottom: 12 }}>Wardrobe</h3>
        {items.length === 0 ? (
          <div style={{ opacity: 0.7 }}>No items yet. Upload an image and save to see it here.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {items.map((it) => (
              <div key={it.id} style={{ borderRadius: 14, overflow: 'hidden', position: 'relative', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(6px)', transition: 'transform 0.25s ease', cursor: 'pointer' }}>
                <div style={{ height: 220, overflow: 'hidden' }}>
                  <img src={it.imageUrl} alt={it.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{it.name}</div>
                  <div style={{ fontSize: 13, opacity: 0.8 }}>{it.category} · <span style={{ fontWeight: 600 }}>{it.aesthetic}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
