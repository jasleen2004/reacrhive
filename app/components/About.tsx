"use client";

import React from "react";

export function About() {
  return (
    <section className="section-panel fade-in" style={{ padding: "60px 18px" }}>
      <div className="glass-panel" style={{ padding: "48px 40px" }}>
        <p className="section-title">About ReArchive</p>
        <h2 style={{ fontSize: 38, fontWeight: 600, margin: "0 0 28px", letterSpacing: 0.02, color: "#f9f7f1" }}>
          A premium fashion-tech platform for AI styling, identity and sustainability.
        </h2>

        <div style={{ display: "grid", gap: 22, color: "var(--muted)", fontSize: 16, lineHeight: 1.9 }}>
          <p>
            ReArchive transforms styling into a finely curated editorial experience. Our AI-powered stylist crafts looks that feel luxury runway-ready while honoring your own mood, occasion and aesthetic identity.
          </p>

          <p>
            Your digital wardrobe becomes an elevated archive. Organize pieces, revisit favorites, and discover styling combinations that maximize your closet’s creative potential with thoughtful guidance.
          </p>

          <p>
            This is styling for modern identity, inspired by Gen Z culture and premium fashion direction. The platform learns from your choices and evolves with you, helping every outfit feel intentional.
          </p>

          <p>
            Sustainability is built into the experience: smart wardrobe curation reduces waste, encourages reuse and supports more conscious fashion decisions with every recommendation.
          </p>
        </div>
      </div>
    </section>
  );
}
