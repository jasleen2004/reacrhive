"use client";

import React from "react";

export function Features() {
  const items = [
    { title: "AI Outfit Intelligence", desc: "Premium styling that anticipates your mood, occasion, and identity with editorial precision." },
    { title: "Digital Wardrobe", desc: "A refined closet experience that turns every piece into a curated asset for your archive." },
    { title: "Aesthetic Engine", desc: "Switch between stylish identities with immersive visual guidance tailored to your brand." },
    { title: "Context-Aware Styling", desc: "Outfit recommendations adapt to events, workdays, and after-hours rituals." },
    { title: "Sustainable Fashion Logic", desc: "Designed to reduce waste with smarter styling and greater wardrobe longevity." },
    { title: "Personalized Style Learning", desc: "The platform evolves with you to make each recommendation more confident and refined." },
  ];

  return (
    <section className="section-panel fade-in" style={{ padding: "50px 18px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <p className="section-title">Feature Highlights</p>
        <h2 style={{ fontSize: 38, fontWeight: 600, margin: "0 0 34px", letterSpacing: 0.02, color: "#f9f7f1" }}>
          Premium tools for fashion, identity, and sustainable wardrobe intelligence.
        </h2>

        <div className="feature-grid">
          {items.map((item, index) => (
            <div key={index} className="glass-card fade-in" style={{ minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <p style={{ margin: 0, fontSize: 13, letterSpacing: 0.3, textTransform: "uppercase", opacity: 0.68 }}>
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </p>
                <h3 style={{ margin: "14px 0 16px", fontSize: 20, lineHeight: 1.3, color: "#f8f6f1" }}>{item.title}</h3>
                <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.8 }}>{item.desc}</p>
              </div>
              <div style={{ marginTop: 24, color: "rgba(214,179,111,0.85)", fontSize: 13, letterSpacing: 0.14 }}>
                Explore more
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
