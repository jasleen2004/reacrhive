"use client";

import React, { useState, useEffect } from "react";

type Props = {
  active: string;
  setActive: (s: string) => void;
  onOpenStudio?: () => void;
  navColor?: string;
  textColor?: string;
  accentColor?: string;
};

const primaryTabs = [
  { key: "home", label: "Home" },
  { key: "upload", label: "Archive" },
  { key: "wardrobe", label: "Wardrobe" },
  { key: "ai", label: "Styling" },
  { key: "rental", label: "Marketplace" },
  { key: "discover", label: "Discover" },
];

const secondaryTabs = [
  { key: "saved", label: "Saved Looks" },
  { key: "planner", label: "Planner" },
  { key: "profile", label: "Profile" },
];

export default function Navbar({ active, setActive, onOpenStudio, navColor = "rgba(8, 9, 12, 0.82)", textColor = "#f7f3ee", accentColor = "rgba(214, 179, 111, 0.18)" }: Props) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isSecondaryActive = secondaryTabs.some((t) => t.key === active);
  const allTabs = [...primaryTabs, ...secondaryTabs];

  const handleNav = (key: string) => {
    setActive(key);
    setMoreOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      <nav style={{ position: "sticky", top: 16, zIndex: 50, margin: "0 18px 24px" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 24px", borderRadius: 999,
          background: navColor,
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)",
          maxWidth: 1120, margin: "0 auto",
        }}>

          {/* WORDMARK */}
          <button onClick={() => handleNav("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(214,179,111,0.12)", border: "1px solid rgba(214,179,111,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontWeight: 700, color: "rgba(214,179,111,0.9)" }}>R</span>
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: textColor, lineHeight: 1 }}>
              ReArchive
            </span>
          </button>

          {/* DESKTOP TABS */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 2, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
              {primaryTabs.map((t) => {
                const isActive = t.key === active;
                return (
                  <button key={t.key} onClick={() => handleNav(t.key)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, padding: "8px 14px", borderRadius: 999, fontWeight: isActive ? 600 : 400, color: isActive ? textColor : `${textColor}99`, letterSpacing: "0.02em", transition: "all 0.2s ease", position: "relative", whiteSpace: "nowrap" }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = textColor; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = `${textColor}99`; }}
                  >
                    {t.label}
                    {isActive && <span style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: 16, height: 1, background: "rgba(214,179,111,0.7)", borderRadius: 999 }} />}
                  </button>
                );
              })}

              {/* MORE DROPDOWN */}
              <div style={{ position: "relative" }}>
                <button onClick={() => setMoreOpen((p) => !p)} style={{ background: isSecondaryActive ? accentColor : "none", border: isSecondaryActive ? "1px solid rgba(214,179,111,0.2)" : "none", cursor: "pointer", fontSize: 13, padding: "8px 14px", borderRadius: 999, fontWeight: isSecondaryActive ? 600 : 400, color: isSecondaryActive ? textColor : `${textColor}99`, letterSpacing: "0.02em", transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: 4 }}>
                  More <span style={{ fontSize: 9, opacity: 0.6, transform: moreOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease", display: "inline-block" }}>▼</span>
                </button>
                {moreOpen && (
                  <div style={{ position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", background: "rgba(10,11,14,0.96)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "6px", minWidth: 160, backdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(0,0,0,0.4)", zIndex: 100 }}>
                    {secondaryTabs.map((t) => {
                      const isActive = t.key === active;
                      return (
                        <button key={t.key} onClick={() => handleNav(t.key)} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", borderRadius: 10, background: isActive ? accentColor : "transparent", border: "none", cursor: "pointer", fontSize: 13, color: textColor, fontWeight: isActive ? 600 : 400, letterSpacing: "0.02em", transition: "background 0.15s ease" }}
                          onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                          onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                        >{t.label}</button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* RIGHT — Studio + Mobile Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            {!isMobile && (
              <button onClick={onOpenStudio} style={{ borderRadius: 999, border: "1px solid rgba(214,179,111,0.2)", background: "rgba(214,179,111,0.08)", color: "rgba(214,179,111,0.9)", padding: "8px 16px", fontWeight: 600, fontSize: 12, letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.2s ease", whiteSpace: "nowrap" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(214,179,111,0.16)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(214,179,111,0.08)"}
              >✦ Studio</button>
            )}
            {isMobile && (
              <button onClick={() => setMobileOpen((p) => !p)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 12px", color: textColor, cursor: "pointer", fontSize: 16 }}>
                {mobileOpen ? "✕" : "☰"}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMobile && mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 49, background: "rgba(6,6,8,0.96)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", padding: "100px 32px 40px", gap: 8 }}>
          {allTabs.map((t) => {
            const isActive = t.key === active;
            return (
              <button key={t.key} onClick={() => handleNav(t.key)} style={{ background: isActive ? "rgba(214,179,111,0.1)" : "transparent", border: isActive ? "1px solid rgba(214,179,111,0.2)" : "1px solid transparent", borderRadius: 14, padding: "16px 20px", textAlign: "left", color: isActive ? "#f5e0b8" : "rgba(245,243,238,0.7)", fontSize: 16, fontWeight: isActive ? 600 : 400, cursor: "pointer", letterSpacing: "0.04em" }}>
                {t.label}
              </button>
            );
          })}
          <button onClick={() => { onOpenStudio?.(); setMobileOpen(false); }} style={{ marginTop: 16, borderRadius: 14, border: "1px solid rgba(214,179,111,0.2)", background: "rgba(214,179,111,0.08)", color: "rgba(214,179,111,0.9)", padding: "16px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer", textAlign: "left" }}>
            ✦ My Space Studio
          </button>
        </div>
      )}
    </>
  );
}