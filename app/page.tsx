"use client";

import React, { useState } from "react";

import { themes } from "./context/themes";

import Navbar from "./components/Navbar";
import LoginGate from "./components/LoginGate";

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

  // TRUE EMPTY STATE
  const [occasion, setOccasion] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [intensity, setIntensity] = useState<string>("");
  const [mood, setMood] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const [savedLooks, setSavedLooks] = useState<any[]>([]);

  const current = themes[theme as keyof typeof themes];

  const canGenerate =
    occasion !== "" &&
    style !== "" &&
    intensity !== "" &&
    mood !== "";

  if (!authenticated) {
    return (
      <LoginGate
        themeKey={theme}
        setTheme={setTheme}
        onAuth={() => setAuthenticated(true)}
      />
    );
  }

  const resetSelections = () => {
    setOccasion("");
    setStyle("");
    setIntensity("");
    setMood("");
    setResult(null);
    setLoading(false);
  };

  const generateOutfit = () => {
    if (!canGenerate) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult({
        title: `${occasion} · ${style} Edit`,
        stylingNote: `A curated ${style} look for ${occasion}`,
        fabric: ["Cotton", "Wool", "Denim"],
        howToStyle: ["Balanced styling", "Clean silhouette", "Intentional layering"],
        items: [
          { name: `${style} Top` },
          { name: `${style} Bottom` },
          { name: `${style} Shoes` },
        ],
        editorial: `${style} styling for ${occasion}`,
      });

      setLoading(false);
    }, 500);
  };

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

          {/* EMPTY STATE */}
          {!canGenerate && !loading && !result && (
            <p style={{ opacity: 0.6 }}>
              Select all options to generate your outfit.
            </p>
          )}

          {/* =========================
              CONFIGURATOR GRID
          ========================= */}
          <div
            style={{
              display: "grid",
              gap: 18,
              marginTop: 20,
            }}
          >
            {/* OCCASION */}
            <div>
              <p style={{ margin: "0 0 6px", opacity: 0.7 }}>Occasion</p>
              <select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                <option value="">Select option</option>
                <option>Party</option>
                <option>University</option>
                <option>Date</option>
                <option>Interview</option>
              </select>
            </div>

            {/* STYLE */}
            <div>
              <p style={{ margin: "0 0 6px", opacity: 0.7 }}>Style</p>
              <select value={style} onChange={(e) => setStyle(e.target.value)}>
                <option value="">Select option</option>
                <option>Luxury</option>
                <option>Dark Academia</option>
                <option>Y2K</option>
                <option>Futuristic</option>
              </select>
            </div>

            {/* INTENSITY */}
            <div>
              <p style={{ margin: "0 0 6px", opacity: 0.7 }}>Intensity</p>
              <select
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
              >
                <option value="">Select option</option>
                <option>Minimal</option>
                <option>Maximal</option>
              </select>
            </div>

            {/* MOOD */}
            <div>
              <p style={{ margin: "0 0 6px", opacity: 0.7 }}>Mood</p>
              <select value={mood} onChange={(e) => setMood(e.target.value)}>
                <option value="">Select option</option>
                <option>Soft</option>
                <option>Chill</option>
                <option>Edgy</option>
                <option>Clean</option>
              </select>
            </div>
          </div>

          {/* BUTTONS */}
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button onClick={generateOutfit} disabled={!canGenerate}>
              Generate
            </button>

            <button onClick={resetSelections}>Reset</button>
          </div>

          {loading && <p>Generating...</p>}

          {result && (
            <div style={{ marginTop: 30 }}>
              <h3>{result.title}</h3>
              <p>{result.stylingNote}</p>

              <h4>Fabric</h4>
              <ul>
                {result.fabric.map((f: string, i: number) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <h4>Styling</h4>
              <ul>
                {result.howToStyle.map((h: string, i: number) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>

              <h4>Items</h4>
              <ul>
                {result.items.map((it: any, i: number) => (
                  <li key={i}>{it.name}</li>
                ))}
              </ul>

              <button>Save Look</button>
            </div>
          )}
        </section>
      )}

      {section === "wardrobe" && <Wardrobe />}

      {section === "saved" && (
        <SavedLooks looks={savedLooks} onRemove={() => {}} />
      )}
    </main>
  );
}