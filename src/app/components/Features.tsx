"use client";

import React from "react";

const features = [
  {
    tag: "AI",
    title: "Wardrobe Intelligence",
    body: "Upload any outfit photo. Our AI detects every individual piece — garments, accessories, shoes — and builds a living digital inventory of everything you own.",
    accent: "rgba(214,179,111,0.12)",
  },
  {
    tag: "Styling",
    title: "Editorial AI Stylist",
    body: "Describe a moment — a date, a meeting, a festival — and the AI curates a complete look from your own wardrobe. No buying required. Your clothes, endlessly restyled.",
    accent: "rgba(180,140,200,0.08)",
  },
  {
    tag: "Circular",
    title: "Rental Marketplace",
    body: "Borrow pieces from curated influencer wardrobes for special occasions. Return them. The garment lives on. This is fashion without the permanence and without the waste.",
    accent: "rgba(100,200,160,0.08)",
  },
  {
    tag: "Planning",
    title: "Outfit Planner",
    body: "Plan your looks ahead of time with a calendar view. Pin saved outfits to dates, build packing lists for trips, and never stare at a full wardrobe feeling like you have nothing to wear.",
    accent: "rgba(214,179,111,0.06)",
  },
  {
    tag: "Discovery",
    title: "Discover & Explore",
    body: "Browse curated looks from the ReArchive community. Find styling inspiration that feels real — worn by real people, built from real wardrobes, not studio shoots.",
    accent: "rgba(180,140,200,0.06)",
  },
  {
    tag: "Impact",
    title: "Your Sustainability Score",
    body: "Track the environmental impact of your wardrobe choices over time. See how many purchases you've avoided, how many times you've reworn pieces, and what that means in real terms.",
    accent: "rgba(100,200,160,0.06)",
  },
];

const process = [
  { step: "01", title: "Upload", body: "Photograph your outfit. Our AI identifies every piece instantly." },
  { step: "02", title: "Archive", body: "Your items are catalogued into a searchable digital wardrobe." },
  { step: "03", title: "Style", body: "Request a look for any occasion. The AI styles from what you own." },
  { step: "04", title: "Wear", body: "Look intentional. Buy less. Waste nothing." },
];

export function Features() {
  return (
    <>
      {/* ── FEATURES GRID ── */}
      <section style={{ padding: "80px 24px 100px", position: "relative" }}>

        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.42em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 16px", fontWeight: 600 }}>
                The Platform
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 400, lineHeight: 1.2, margin: 0, color: "var(--text)", letterSpacing: "0.02em", maxWidth: 480 }}>
                Everything you need to own your wardrobe — not be owned by it.
              </h2>
            </div>
            <p style={{ fontSize: 13, color: "rgba(245,243,238,0.45)", maxWidth: 280, lineHeight: 1.75, margin: 0 }}>
              Six tools, one platform, built entirely around the clothes you already own.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            {features.map((f, i) => (
              <div key={i}
                style={{
                  padding: "36px 32px",
                  borderRadius: 20,
                  background: f.accent,
                  border: "1px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  transition: "transform 0.3s ease, border-color 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(214,179,111,0.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <span style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(214,179,111,0.7)", fontWeight: 700 }}>
                  {f.tag}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: "var(--text)", lineHeight: 1.3 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.85, margin: 0 }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 24px 140px", position: "relative" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.42em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 16px", fontWeight: 600, textAlign: "center" }}>
            How It Works
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 400, lineHeight: 1.2, margin: "0 0 72px", color: "var(--text)", textAlign: "center", letterSpacing: "0.02em" }}>
            Four steps to a more conscious wardrobe.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative" }}>

            {process.map((p, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 20px", position: "relative", zIndex: 1 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "rgba(214,179,111,0.08)",
                  border: "1px solid rgba(214,179,111,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 24,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 16, fontWeight: 700,
                  color: "rgba(214,179,111,0.8)",
                }}>
                  {p.step}
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 10px", color: "var(--text)" }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM QUOTE */}
        <div style={{ maxWidth: 700, margin: "100px auto 0", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 300, fontStyle: "italic", color: "var(--muted)", lineHeight: 1.65, margin: "0 0 20px" }}>
            "The most sustainable outfit is the one already in your wardrobe."
          </p>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(214,179,111,0.5)" }}>
            ReArchive
          </p>
        </div>
      </section>
    </>
  );
}