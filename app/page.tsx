"use client";

import React, { useState } from "react";

import { themes } from "./context/themes";

import Navbar from "./components/Navbar";
import LoginGate from "./components/LoginGate";
import AIStylist from "./components/AIStylist";

import Wardrobe from "./components/Wardrobe";
import SavedLooks from "./components/SavedLooks";

import { HeroSection } from "./components/HeroSection";
import { About } from "./components/About";
import { Features } from "./components/Features";

export default function Home() {
  const [theme, setTheme] = useState("grunge");
  const [authenticated, setAuthenticated] = useState(false);

  const [section, setSection] = useState<
    "home" | "wardrobe" | "ai" | "saved"
  >("home");

  const [savedLooks, setSavedLooks] = useState<any[]>([]);

  const current = themes[theme as keyof typeof themes];

  const handleSaveLook = (look: any) => {
    setSavedLooks((previous) => [look, ...previous]);
  };

  const handleRemoveLook = (id: string) => {
    setSavedLooks((previous) => previous.filter((look) => look.id !== id));
  };

  if (!authenticated) {
    return (
      <LoginGate
        themeKey={theme}
        setTheme={setTheme}
        onAuth={() => setAuthenticated(true)}
      />
    );
  }

  return (
    <main
      style={{
        background: (current as any).bgGradient || current.bg,
        color: current.color,
        minHeight: "100vh",
        fontFamily: current.font,
      }}
    >
      <Navbar
        active={section}
        setActive={(s) => setSection(s as any)}
        theme={theme}
        setTheme={setTheme}
      />

      {/* HOME */}
      {section === "home" && (
        <div>
          <HeroSection />
          <About />
          <Features />
        </div>
      )}

      {/* AI SECTION */}
      {section === "ai" && (
        <section className="section-panel fade-in" style={{ maxWidth: 980, margin: "40px auto 80px", padding: "0 18px" }}>
          <div className="glass-panel" style={{ padding: "40px 36px" }}>
            <div style={{ maxWidth: 760, margin: "0 auto 32px" }}>
              <p className="section-title">AI Styling</p>
              <h2 style={{ fontSize: 34, fontWeight: 600, margin: 0, color: "#f9f7f1", lineHeight: 1.08 }}>
                Fashion-forward outfit direction for every modern moment.
              </h2>
              <p style={{ marginTop: 16, color: "var(--muted)", lineHeight: 1.85 }}>
                Use the prompt field below to generate premium outfit guidance from your personalized ReArchive styling system.
                The AI stylist blends futuristic runway energy with editorial polish.
              </p>
            </div>

            <AIStylist onSaveLook={handleSaveLook} />
          </div>
        </section>
      )}

      {section === "wardrobe" && <Wardrobe />}

      {section === "saved" && (
        <SavedLooks looks={savedLooks} onRemove={handleRemoveLook} />
      )}
    </main>
  );
}