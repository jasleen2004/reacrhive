"use client";

import React from "react";

type Props = { setSection: (s: string) => void };

export default function Footer({ setSection }: Props) {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "60px 24px 40px",
      marginTop: 80,
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }}>

          {/* BRAND */}
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text)", margin: "0 0 12px" }}>
              ReArchive
            </h3>
            <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 16px", fontStyle: "italic" }}>
              Own Less. Style More.
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, maxWidth: 280, margin: 0 }}>
              An AI-powered wardrobe intelligence platform built on sustainability, circular fashion, and the belief that less can mean more.
            </p>
          </div>

          {/* PLATFORM */}
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 16px", fontWeight: 600 }}>Platform</p>
            {[["Archive", "upload"], ["Wardrobe", "wardrobe"], ["AI Styling", "ai"], ["Rental", "rental"]].map(([label, key]) => (
              <button key={key} onClick={() => setSection(key)} style={{ display: "block", background: "none", border: "none", color: "var(--muted)", fontSize: 13, padding: "5px 0", cursor: "pointer", textAlign: "left", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
              >{label}</button>
            ))}
          </div>

          {/* COMPANY */}
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 16px", fontWeight: 600 }}>Company</p>
            {[["Mission", "home"], ["Discover", "discover"], ["Profile", "profile"]].map(([label, key]) => (
              <button key={key} onClick={() => setSection(key)} style={{ display: "block", background: "none", border: "none", color: "var(--muted)", fontSize: 13, padding: "5px 0", cursor: "pointer", textAlign: "left", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
              >{label}</button>
            ))}
          </div>

          {/* VALUES */}
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 16px", fontWeight: 600 }}>Values</p>
            {["Circular Fashion", "Labour Rights", "Sustainability", "Transparency"].map((v) => (
              <p key={v} style={{ fontSize: 13, color: "var(--muted)", padding: "5px 0", margin: 0 }}>{v}</p>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 11, color: "var(--muted)", margin: 0, letterSpacing: "0.05em" }}>
            © 2026 ReArchive. Built for a more conscious wardrobe.
          </p>
          <p style={{ fontSize: 11, color: "var(--muted)", margin: 0, fontStyle: "italic" }}>
            "The most sustainable outfit is the one already in your wardrobe."
          </p>
        </div>
      </div>
    </footer>
  );
}