"use client";

import React from "react";

export function Features() {
  const items = [
    { title: "AI Outfit Intelligence", desc: "Generates editorial-ready outfits tuned to occasion, mood and personal aesthetics." },
    { title: "Digital Wardrobe", desc: "Organize your pieces so styling becomes effortless and intentional." },
    { title: "Circular Focus", desc: "Encourage reuse and thoughtful curation over endless consumption." },
    { title: "Personal Aesthetics", desc: "Switch and refine visual identities from minimal to editorial to experimental." },
    { title: "Mood-Based Styling", desc: "Outfits adapt to real-life contexts: work, casual, date, events, travel." },
    { title: "Adaptive Learning", desc: "The platform evolves with your preferences to refine personalization over time." },
  ];

  return (
    <section style={{ padding: "0 18px", maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
      <h2 style={{ fontSize: 26, fontWeight: 500, marginBottom: 40, letterSpacing: 0.4, opacity: 0.95 }}>Features</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 36 }}>
        {items.map((it, i) => (
          <div key={i} style={{ textAlign: "left", padding: "0 8px" }}>
            <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 16, fontWeight: 500, opacity: 0.95 }}>{it.title}</h3>
            <p style={{ opacity: 0.75, lineHeight: 1.7, fontSize: 14, margin: 0 }}>{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}