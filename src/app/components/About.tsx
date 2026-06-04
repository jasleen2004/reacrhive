"use client";

import React from "react";

const values = [
  {
    num: "01",
    title: "Circular by Design",
    body: "ReArchive is built around the principle that the most sustainable garment is the one you already own. Every feature pushes you to rediscover, restyle and rewear before you consider buying new.",
  },
  {
    num: "02",
    title: "Against Fast Fashion",
    body: "Fast fashion thrives on disposability. We exist to counter that — by making your existing wardrobe feel abundant, curated and worth keeping. Style without the waste.",
  },
  {
    num: "03",
    title: "Labour & Ethics",
    body: "The human cost of cheap clothing is invisible by design. We believe in radical transparency — championing brands that pay living wages and maintain safe, dignified conditions.",
  },
  {
    num: "04",
    title: "Longevity Over Trend",
    body: "Trends are engineered to expire. Our AI stylist finds the longevity in what you already own — building looks that feel relevant across seasons, not disposable after one.",
  },
];

const goals = [
  {
    icon: "♻️",
    title: "Reduce textile waste",
    body: "Help people wear what they already own more — cutting demand for new production and keeping clothes out of landfill.",
  },
  {
    icon: "🤝",
    title: "Make fashion equitable",
    body: "Give everyone access to premium styling intelligence, not just those who can afford personal stylists or endless new wardrobes.",
  },
  {
    icon: "🌍",
    title: "Prove sustainability is stylish",
    body: "Show that conscious fashion choices don't mean compromising on aesthetics. Looking good and doing good are not opposites.",
  },
  {
    icon: "🔄",
    title: "Build the circular economy",
    body: "Through rental, restyling and rewearing, we want to shift fashion from a linear take-make-waste model to one where garments have infinite lives.",
  },
  {
    icon: "📢",
    title: "Demand transparency",
    body: "Surface the true cost of what we wear — environmental and human — so every purchase decision is an informed one.",
  },
  {
    icon: "💡",
    title: "Use AI for good",
    body: "Prove that artificial intelligence can be a force for sustainability, not just consumption — optimising what exists rather than selling what's new.",
  },
];

export function About() {
  return (
    <>
      {/* ── MISSION ── */}
      <section style={{ padding: "100px 24px", position: "relative" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.42em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 24px", fontWeight: 600, textAlign: "center" }}>
            Our Mission
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 400, lineHeight: 1.15, margin: "0 auto 28px", color: "var(--text)", letterSpacing: "0.02em", textAlign: "center", maxWidth: 780 }}>
            Fashion should not cost the earth — or the people who make it.
          </h2>

          <p style={{ color: "var(--muted)", lineHeight: 2, fontSize: 15, margin: "0 auto 20px", maxWidth: 680, textAlign: "center" }}>
            ReArchive exists because the fashion industry's model is broken. It produces more than is needed, pays less than is fair, and discards more than is acceptable. We built a platform to make the alternative effortless — starting with the wardrobe you already have.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 2, fontSize: 15, margin: "0 auto", maxWidth: 680, textAlign: "center" }}>
            We use AI not to sell you more, but to help you do infinitely more with what you already own. Every saved look, every restyled outfit, every rented piece instead of a purchased one — that is the vision in action.
          </p>
        </div>
      </section>

      {/* ── GOALS ── */}
      <section style={{ padding: "60px 24px 100px", position: "relative" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.42em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 16px", fontWeight: 600, textAlign: "center" }}>
            What We Want to Achieve
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 400, lineHeight: 1.2, margin: "0 0 56px", color: "var(--text)", textAlign: "center", letterSpacing: "0.02em" }}>
            Six goals that drive every decision we make.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {goals.map((g, i) => (
              <div key={i} style={{
                padding: "36px 28px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "background 0.3s ease, border-color 0.3s ease",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(214,179,111,0.04)";
                  e.currentTarget.style.borderColor = "rgba(214,179,111,0.15)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <p style={{ fontSize: 22, margin: "0 0 16px" }}>{g.icon}</p>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 12px", color: "var(--text)", lineHeight: 1.3 }}>{g.title}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.85, margin: 0 }}>{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: "60px 24px 120px", position: "relative" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.42em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 16px", fontWeight: 600, textAlign: "center" }}>
            What We Stand For
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 400, lineHeight: 1.2, margin: "0 0 56px", color: "var(--text)", textAlign: "center", letterSpacing: "0.02em" }}>
            Four principles behind everything we build.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 1, border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, overflow: "hidden" }}>
            {values.map((v, i) => (
              <div key={i} style={{
                padding: "40px 32px",
                background: "rgba(255,255,255,0.02)",
                borderRight: i < values.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                transition: "background 0.3s ease",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(214,179,111,0.04)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
              >
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "var(--accent)", margin: "0 0 20px", letterSpacing: "0.2em" }}>
                  {v.num}
                </p>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 14px", color: "var(--text)", lineHeight: 1.3 }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.85, margin: 0 }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}