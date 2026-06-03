"use client";

import React from "react";

type Props = {
  active: string;
  setActive: (s: string) => void;
  onOpenStudio?: () => void;
  navColor?: string;
  textColor?: string;
  accentColor?: string;
};

export default function Navbar({ active, setActive, onOpenStudio, navColor = "rgba(8, 9, 12, 0.74)", textColor = "#fff", accentColor = "rgba(214, 179, 111, 0.18)" }: Props) {
  const tabs = [
    { key: "home", label: "Home" },
    { key: "upload", label: "Upload" },
    { key: "wardrobe", label: "Wardrobe" },
    { key: "ai", label: "AI Styling" },
    { key: "saved", label: "Saved Looks" },
    { key: "planner", label: "Outfit Planner" },
    { key: "rental", label: "Rental Marketplace" },
    { key: "discover", label: "Discover" },
    { key: "profile", label: "Profile" },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 16,
        zIndex: 50,
        margin: "0 18px 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 22px",
          borderRadius: 28,
          background: navColor,
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 22px 72px rgba(0,0,0,0.22)",
          maxWidth: 1120,
          margin: "0 auto",
        }}
      >
        {/* TABS */}
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
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
                  background: isActive
                    ? accentColor
                    : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  padding: "10px 16px",
                  borderRadius: 999,
                  fontWeight: isActive ? 700 : 500,
                  color: textColor,
                  opacity: isActive ? 1 : 0.82,
                  transition: "all 0.25s ease",
                  transform: isActive ? "translateY(-1px)" : "none",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={onOpenStudio}
          style={{
            marginLeft: 18,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.12)",
            background: accentColor,
            color: textColor,
            padding: "10px 14px",
            fontWeight: 700,
          }}
        >
          My Space Studio
        </button>
      </div>
    </nav>
  );
}
