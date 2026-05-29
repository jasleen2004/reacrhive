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
    <nav
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "14px 0",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* TABS */}
        <div
          style={{
            display: "flex",
            gap: 24,
            flex: 1,
            justifyContent: "center",
          }}
        >
          {tabs.map((t) => {
            const isActive = t.key === active;

            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  padding: "8px 10px",
                  borderRadius: 8,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                  backgroundColor: isActive
                    ? "rgba(255,255,255,0.08)"
                    : "transparent",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* THEME */}
        <div style={{ marginLeft: 20 }}>
          <ThemeDropdown currentTheme={theme} setTheme={setTheme} />
        </div>
      </div>
    </nav>
  );
}