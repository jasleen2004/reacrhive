"use client";

import React, { useEffect, useRef, useState } from "react";

import Navbar from "./components/Navbar";
import AIStylist from "./components/AIStylist";

import Wardrobe, { WardrobeItem } from "./components/Wardrobe";
import DigitalWardrobe from "./components/DigitalWardrobe";
import SavedLooks from "./components/SavedLooks";
import MySpaceStudio, { DecorationItem, defaultConfig, StudioConfig } from "./components/MySpaceStudio";

import { HeroSection } from "./components/HeroSection";
import { About } from "./components/About";
import { Features } from "./components/Features";
import { DiscoverPage, OutfitPlannerPage, ProfilePage, RentalMarketplacePage } from "./components/ExpandedSections";

function getWallpaperBackground(config: StudioConfig) {
  switch (config.wallpaper) {
    case "gradient":
      return `linear-gradient(140deg, ${config.backgroundColor} 0%, #141c30 45%, ${config.accentColor} 100%)`;
    case "luxury":
      return `linear-gradient(145deg, rgba(255,255,255,0.28), rgba(201,165,103,0.14)), radial-gradient(circle at top, rgba(255,255,255,0.22), transparent 24%), ${config.backgroundColor}`;
    case "marble":
      return `linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.14), transparent 18%), ${config.backgroundColor}`;
    case "holographic":
      return `linear-gradient(135deg, #1a1f37 0%, #0f1728 35%, #121c30 70%, ${config.accentColor} 100%)`;
    case "cyberpunk":
      return `linear-gradient(135deg, #05070b 0%, #111827 45%, #0b1020 100%)`;
    case "floral":
      return `radial-gradient(circle at top, rgba(255,182,213,0.18), transparent 22%), linear-gradient(135deg, #fffafc 0%, ${config.backgroundColor} 100%)`;
    case "vintage":
      return `linear-gradient(135deg, rgba(245,230,210,0.26), rgba(72,47,30,0.12)), ${config.backgroundColor}`;
    case "glass":
      return `linear-gradient(145deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06)), ${config.backgroundColor}`;
    case "satin":
      return `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02)), ${config.backgroundColor}`;
    case "silk":
      return `linear-gradient(140deg, rgba(255,255,255,0.16), rgba(201,165,103,0.08)), ${config.backgroundColor}`;
    case "fashion":
      return `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03)), ${config.backgroundColor}`;
    default:
      return config.backgroundColor;
  }
}

export default function Home() {
  // ⭐ Added "digital" to the union type
  const [section, setSection] = useState<
    "home" | "upload" | "wardrobe" | "ai" | "saved" | "planner" | "rental" | "discover" | "studio" | "profile"
  >("home");

  const [savedLooks, setSavedLooks] = useState<any[]>([]);
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([]);
  const [decorations, setDecorations] = useState<DecorationItem[]>([]);
  const [studioOpen, setStudioOpen] = useState(false);
  const [selectedDecorationId, setSelectedDecorationId] = useState<string | null>(null);
  const [studioConfig, setStudioConfig] = useState<StudioConfig>(defaultConfig);
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  /* ================================
     LOAD DATA FROM LOCALSTORAGE
  ================================= */
  useEffect(() => {
    const savedWardrobe = localStorage.getItem("rearchive-wardrobe");
    const savedDigital = localStorage.getItem("digitalWardrobe");
    const savedLooksData = localStorage.getItem("rearchive-looks");
    const savedStudio = localStorage.getItem("my-space-studio-config");
    const savedDecorations = localStorage.getItem("my-space-decorations");

    const parsedUpload = savedWardrobe ? JSON.parse(savedWardrobe) : [];
    const parsedDigital = savedDigital ? JSON.parse(savedDigital) : [];
    const mergedWardrobe = [...new Map([...(Array.isArray(parsedUpload) ? parsedUpload : []), ...(Array.isArray(parsedDigital) ? parsedDigital : [])].map((item) => [item.id, item])).values()];

    setWardrobeItems(mergedWardrobe);

    if (savedLooksData) {
      setSavedLooks(JSON.parse(savedLooksData));
    }

    if (savedStudio) {
      setStudioConfig(JSON.parse(savedStudio));
    }

    if (savedDecorations) {
      const parsedDecorations = JSON.parse(savedDecorations);
      setDecorations(Array.isArray(parsedDecorations)
        ? parsedDecorations.map((item: DecorationItem) => ({
            ...item,
            x: Math.max(80, Math.min(window.innerWidth - 100, item.x || 80)),
            y: Math.max(90, Math.min(window.innerHeight - 100, item.y || 90)),
          }))
        : []);
    }
  }, []);

  /* ================================
     SAVE WARDROBE TO LOCALSTORAGE
  ================================= */
  useEffect(() => {
    localStorage.setItem("rearchive-wardrobe", JSON.stringify(wardrobeItems));
    localStorage.setItem("digitalWardrobe", JSON.stringify(wardrobeItems));
  }, [wardrobeItems]);

  /* ================================
     SAVE LOOKS TO LOCALSTORAGE
  ================================= */
  useEffect(() => {
    localStorage.setItem(
      "rearchive-looks",
      JSON.stringify(savedLooks)
    );
  }, [savedLooks]);

  useEffect(() => {
    localStorage.setItem("my-space-studio-config", JSON.stringify(studioConfig));
    localStorage.setItem("my-space-decorations", JSON.stringify(decorations));
    document.documentElement.style.setProperty("--bg", studioConfig.backgroundColor);
    document.documentElement.style.setProperty("--text", studioConfig.textColor);
    document.documentElement.style.setProperty("--heading", studioConfig.headingColor || studioConfig.textColor);
    document.documentElement.style.setProperty("--nav-text", studioConfig.navTextColor || studioConfig.textColor);
    document.documentElement.style.setProperty("--muted", `${hexToRgba(studioConfig.textColor, 0.72)}`);
    document.documentElement.style.setProperty("--accent", studioConfig.accentColor);
    document.documentElement.style.setProperty("--surface", studioConfig.cardColor);
    document.documentElement.style.setProperty("--border", studioConfig.borderColor);
    document.documentElement.style.setProperty("--nav", studioConfig.navColor);
  }, [studioConfig, decorations]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-decoration-id]")) return;
      setSelectedDecorationId(null);
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      if (!dragRef.current) return;
      setDecorations((previous) => previous.map((item) => item.id === dragRef.current?.id ? {
        ...item,
        x: Math.max(8, Math.min(window.innerWidth - 64, event.clientX - dragRef.current!.offsetX)),
        y: Math.max(8, Math.min(window.innerHeight - 64, event.clientY - dragRef.current!.offsetY)),
      } : item));
    };
    const handleUp = () => {
      dragRef.current = null;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  const liveBackground = getWallpaperBackground(studioConfig);

  const handleSaveLook = (look: any) => {
    setSavedLooks((previous) => {
      const next = [look, ...previous];
      localStorage.setItem("rearchive-looks", JSON.stringify(next));
      window.dispatchEvent(new Event("rearchive-profile-refresh"));
      return next;
    });
  };

  const handleRemoveLook = (id: string) => {
    setSavedLooks((previous) =>
      previous.filter((look) => look.id !== id)
    );
  };

  const handleDecorationPointerDown = (event: React.MouseEvent<HTMLDivElement>, decoration: DecorationItem) => {
    dragRef.current = { id: decoration.id, offsetX: event.clientX - decoration.x, offsetY: event.clientY - decoration.y };
  };

  const duplicateDecoration = (item: DecorationItem) => {
    setDecorations((previous) => [
      ...previous,
      { ...item, id: crypto.randomUUID(), x: Math.min(item.x + 18, window.innerWidth - 64), y: Math.min(item.y + 18, window.innerHeight - 64) },
    ]);
  };

  const removeDecoration = (id: string) => {
    setDecorations((previous) => previous.filter((item) => item.id !== id));
  };

  function hexToRgba(hex: string, alpha: number) {
    const sanitized = hex.replace("#", "");
    const full = sanitized.length === 3
      ? sanitized.split("").map((char) => char + char).join("")
      : sanitized;
    const value = Number.parseInt(full, 16);
    const r = (value >> 16) & 255;
    const g = (value >> 8) & 255;
    const b = value & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return (
    <main
      style={{
        background: liveBackground,
        color: studioConfig.textColor,
        minHeight: "100vh",
        fontFamily: studioConfig.fontFamily,
        fontSize: studioConfig.fontSize,
        lineHeight: studioConfig.lineHeight,
        letterSpacing: studioConfig.letterSpacing,
        fontWeight: studioConfig.fontWeight,
        fontStyle: studioConfig.fontStyle,
        textDecoration: studioConfig.textDecoration,
      }}
    >
      <Navbar
        active={section}
        setActive={(s) => setSection(s as any)}
        onOpenStudio={() => setStudioOpen(true)}
        navColor={studioConfig.navColor}
        textColor={studioConfig.navTextColor || studioConfig.textColor}
        accentColor={studioConfig.hoverEffectColor}
      />

      <button
        onClick={() => setStudioOpen((prev) => !prev)}
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
          zIndex: 90,
          borderRadius: 999,
          border: "1px solid " + studioConfig.borderColor,
          background: studioConfig.buttonColor,
          color: studioConfig.textColor,
          padding: "12px 14px",
          boxShadow: "0 16px 36px rgba(0,0,0,0.28)",
          fontWeight: 700,
        }}
      >
        ✨ My Space Studio
      </button>

      <MySpaceStudio open={studioOpen} setOpen={setStudioOpen} config={studioConfig} setConfig={setStudioConfig} decorations={decorations} setDecorations={setDecorations} />

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 45, overflow: "visible" }}>
        {decorations.map((item) => {
          const isSelected = selectedDecorationId === item.id;
          return (
            <div
              key={item.id}
              data-decoration-id={item.id}
              onClick={(event) => {
                event.stopPropagation();
                setSelectedDecorationId(item.id);
              }}
              onMouseDown={(event) => handleDecorationPointerDown(event, item)}
              style={{
                position: "fixed",
                left: item.x,
                top: item.y,
                transform: "rotate(" + item.rotate + "deg)",
                fontSize: 28,
                filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.24))",
                pointerEvents: "auto",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: isSelected ? "10px 12px" : "8px 10px",
                minHeight: 42,
                borderRadius: 16,
                background: isSelected ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.06)",
                color: isSelected ? "#111" : "inherit",
                border: isSelected ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.08)",
                cursor: "grab",
                userSelect: "none",
                touchAction: "none",
              }}
            >
              <span>{item.emoji}</span>
              {isSelected && (
                <span
                  onClick={(event) => event.stopPropagation()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    marginLeft: 4,
                    padding: "2px 4px",
                    borderRadius: 999,
                    background: "rgba(17,17,17,0.92)",
                    color: "#fff",
                    fontSize: 11,
                    lineHeight: 1,
                  }}
                >
                  <button onClick={(event) => { event.stopPropagation(); }} style={{ border: "none", background: "transparent", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "grab" }}>Drag</button>
                  <button onClick={(event) => { event.stopPropagation(); duplicateDecoration(item); }} style={{ border: "none", background: "transparent", color: "#fff", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>＋</button>
                  <button onClick={(event) => { event.stopPropagation(); removeDecoration(item.id); }} style={{ border: "none", background: "transparent", color: "#fff", fontSize: 12, fontWeight: 800, cursor: "pointer" }}>×</button>
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* HOME */}
      {section === "home" && (
        <div>
          <HeroSection />
          <About />
          <Features />
        </div>
      )}

      {/* UPLOAD */}
      {section === "upload" && (
        <Wardrobe
          items={wardrobeItems}
          onItemsChange={setWardrobeItems}
        />
      )}

      {/* WARDROBE */}
      {section === "wardrobe" && (
        <DigitalWardrobe />
      )}

      {/* AI STYLING */}
      {section === "ai" && (
        <section
          className="section-panel fade-in"
          style={{
            maxWidth: 980,
            margin: "40px auto 80px",
            padding: "0 18px",
          }}
        >
          <div
            className="glass-panel"
            style={{ padding: "40px 36px" }}
          >
            <div style={{ maxWidth: 760, margin: "0 auto 32px" }}>
              <p className="section-title">AI Styling</p>
              <h2
                style={{
                  fontSize: 34,
                  fontWeight: 600,
                  margin: 0,
                  color: "#f9f7f1",
                  lineHeight: 1.08,
                }}
              >
                Luxury-inspired styling, built from your archive.
              </h2>
              <p
                style={{
                  marginTop: 16,
                  color: "var(--muted)",
                  lineHeight: 1.85,
                }}
              >
                Generate elevated outfit direction from your saved wardrobe with
                cinematic polish, personality, and premium editorial precision.
              </p>
            </div>

            <AIStylist
              onSaveLook={handleSaveLook}
              wardrobeItems={wardrobeItems}
            />
          </div>
        </section>
      )}

      {/* OUTFIT PLANNER */}
      {section === "planner" && <OutfitPlannerPage />}

      {/* RENTAL MARKETPLACE */}
      {section === "rental" && <RentalMarketplacePage />}

      {/* DISCOVER */}
      {section === "discover" && <DiscoverPage />}

      {/* PROFILE */}
      {section === "profile" && <ProfilePage />}

      {/* SAVED LOOKS */}
      {section === "saved" && (
        <SavedLooks
          looks={savedLooks}
          onRemove={handleRemoveLook}
        />
      )}
    </main>
  );
}
