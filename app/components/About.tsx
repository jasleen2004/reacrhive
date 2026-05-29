"use client";

import React from "react";

export function About() {
  return (
    <section style={{ padding: "0 18px", maxWidth: 700, margin: "0 auto", textAlign: "center", color: "inherit" }}>
      <h2 style={{ fontSize: 26, fontWeight: 500, marginBottom: 32, letterSpacing: 0.4, opacity: 0.95 }}>About</h2>

      <p style={{ opacity: 0.85, lineHeight: 1.9, marginBottom: 20, fontSize: 15 }}>
        ReArchive brings together AI-powered styling and a digital wardrobe to help you make considered fashion choices. Our styling engine crafts complete, editorial looks tailored to your mood, occasion, and personal aesthetics — not trends.
      </p>

      <p style={{ opacity: 0.80, lineHeight: 1.9, marginBottom: 20, fontSize: 15 }}>
        At the heart of ReArchive is a circular fashion vision: maximize what you already own, reduce unnecessary consumption, and extend the life of garments through smarter styling and curated rental partnerships.
      </p>

      <p style={{ opacity: 0.80, lineHeight: 1.9, fontSize: 15 }}>
        The platform learns from your choices, evolves with your identity, and offers quiet, editorial guidance — empowering confident dressing that feels personal, sustainable, and intentional.
      </p>
    </section>
  );
}