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
        <section style={{ maxWidth: 900, margin: "40px auto" }}>
          <h2>AI Styling Engine</h2>

          <AIStylist onSaveLook={handleSaveLook} />
        </section>
      )}

      {section === "wardrobe" && <Wardrobe />}

      {section === "saved" && (
        <SavedLooks looks={savedLooks} onRemove={handleRemoveLook} />
      )}
    </main>
  );
}