"use client";

import React from "react";
import { ThemeDropdown } from "./ThemeDropdown";

type Props = {
  active: string;
  setActive: (s: string) => void;
  theme: string;
  setTheme: (t: string) => void;
};

export default function Navbar({ active, setActive, theme, setTheme }: Props) {
  const tabs = [
    { key: "home", label: "Home" },
    { key: "wardrobe", label: "Digital Wardrobe" },
    { key: "ai", label: "AI Styling" },
    { key: "saved", label: "Saved Looks" },
  ];

  return (
    <nav style={{ position: "sticky", top: 16, zIndex: 50, margin: "0 18px 24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderRadius: 28,
          background: "rgba(8, 9, 12, 0.74)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 22px 72px rgba(0,0,0,0.22)",
          maxWidth: 1120,
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", gap: 24, alignItems: "center", flex: 1, justifyContent: "center" }}>
          {tabs.map((t) => {
            const isActive = t.key === active;

            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                style={{
                  background: isActive ? "rgba(214, 179, 111, 0.14)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  padding: "12px 16px",
                  borderRadius: 999,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#fff" : "rgba(255,255,255,0.72)",
                  transition: "background 0.24s ease, transform 0.24s ease",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div style={{ marginLeft: 18 }}>
          <ThemeDropdown currentTheme={theme} setTheme={setTheme} />
        </div>
      </div>
    </nav>
  );
}
