"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export type StudioConfig = {
  backgroundColor: string;
  textColor: string;
  headingColor: string;
  navTextColor: string;
  buttonColor: string;
  accentColor: string;
  cardColor: string;
  borderColor: string;
  navColor: string;
  searchColor: string;
  hoverEffectColor: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fontStyle: "normal" | "italic";
  textDecoration: "none" | "underline";
  letterSpacing: number;
  lineHeight: number;
  wallpaper: string;
  cursor: string;
};

type Profile = { name: string; config: StudioConfig };

export type DecorationItem = {
  id: string;
  name: string;
  emoji: string;
  category: string;
  x: number;
  y: number;
  rotate: number;
};

export const defaultConfig: StudioConfig = {
  backgroundColor: "#09090f",
  textColor: "#f7f3ee",
  headingColor: "#faf7ef",
  navTextColor: "#f7f3ee",
  buttonColor: "#d6b36f",
  accentColor: "#c38b5a",
  cardColor: "rgba(13, 14, 18, 0.88)",
  borderColor: "rgba(255,255,255,0.14)",
  navColor: "rgba(10, 11, 14, 0.82)",
  searchColor: "rgba(255,255,255,0.08)",
  hoverEffectColor: "rgba(214, 179, 111, 0.18)",
  fontFamily: "Quicksand, sans-serif",
  fontSize: 16,
  fontWeight: 400,
  fontStyle: "normal",
  textDecoration: "none",
  letterSpacing: 0,
  lineHeight: 1.5,
  wallpaper: "solid",
  cursor: "default",
};

const presetPalettes: { name: string; config: StudioConfig }[] = [];

const decorationCatalog = [
  { category: "Nature", items: ["🌸 Flowers", "🌹 Roses", "🌼 Daisies", "🌻 Sunflowers", "🍃 Leaves", "🦋 Butterflies", "⭐ Stars"] },
  { category: "Luxury", items: ["💎 Diamonds", "✨ Sparkles", "👑 Crown", "🏆 Gold Frames", "🪩 Crystal"] },
  { category: "Gothic", items: ["🕯️ Black Roses", "💀 Skulls", "⛓️ Chains", "🕷️ Spiders", "🌙 Moon"] },
  { category: "Cyber", items: ["⚡ Neon Circles", "💫 Holographic", "🔷 Neon Rings", "📡 Data Nodes", "🧬 AI Symbols"] },
];

export default function MySpaceStudio({ open, setOpen, config, setConfig, decorations, setDecorations }: {
  open: boolean;
  setOpen: (value: boolean) => void;
  config: StudioConfig;
  setConfig: (value: StudioConfig) => void;
  decorations: DecorationItem[];
  setDecorations: React.Dispatch<React.SetStateAction<DecorationItem[]>>;
}) {
  const [profileName, setProfileName] = useState("My Profile");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  useEffect(() => {
    const savedProfiles = localStorage.getItem("my-space-profiles");
    if (savedProfiles) setProfiles(JSON.parse(savedProfiles));
  }, []);

  useEffect(() => {
    localStorage.setItem("my-space-profiles", JSON.stringify(profiles));
  }, [profiles]);

  const liveBackground = useMemo(() => {
    switch (config.wallpaper) {
      case "gradient": return "linear-gradient(135deg, " + config.backgroundColor + " 0%, #21283b 50%, " + config.accentColor + " 100%)";
      case "luxury": return "linear-gradient(135deg, rgba(255,255,255,0.32), rgba(201,165,103,0.16)), radial-gradient(circle at top, rgba(255,255,255,0.32), transparent 30%), " + config.backgroundColor;
      case "marble": return "linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02)), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.14), transparent 20%), " + config.backgroundColor;
      case "holographic": return "linear-gradient(130deg, #121a2e 0%, #0d1530 30%, #1d244b 70%, " + config.accentColor + " 100%)";
      case "cyberpunk": return "linear-gradient(135deg, #04040b 0%, #111827 45%, #0b1020 100%)";
      case "floral": return "radial-gradient(circle at top, rgba(255,182,213,0.16), transparent 25%), linear-gradient(135deg, #fffafc 0%, " + config.backgroundColor + " 100%)";
      case "vintage": return "linear-gradient(135deg, rgba(245,230,210,0.25), rgba(72,47,30,0.12)), " + config.backgroundColor;
      default: return config.backgroundColor;
    }
  }, [config]);

  const updateConfig = (key: keyof StudioConfig, value: string | number) => setConfig({ ...config, [key]: value });
  const saveProfile = () => {
    if (!profileName.trim()) return;
    const next = [...profiles.filter((e) => e.name !== profileName), { name: profileName, config: { ...config } }];
    setProfiles(next);
  };
  const loadProfile = (entry: Profile) => setConfig({ ...entry.config });
  const addDecoration = (label: string) => {
    const piece = label.split(" ")[0] || "✨";
    setDecorations((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: label, emoji: piece, category: "Studio", x: 90 + prev.length * 28, y: 120 + prev.length * 28, rotate: (prev.length % 4) * 8 },
    ]);
  };
  const removeDecoration = (id: string) => setDecorations((prev) => prev.filter((item) => item.id !== id));
  const handlePointerDown = (event: React.MouseEvent<HTMLDivElement>, decoration: DecorationItem) => {
    event.preventDefault();
    dragRef.current = { id: decoration.id, offsetX: event.clientX - decoration.x, offsetY: event.clientY - decoration.y };
  };

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      if (!dragRef.current) return;
      setDecorations((prev) => prev.map((item) => item.id === dragRef.current?.id ? { ...item, x: event.clientX - dragRef.current!.offsetX, y: event.clientY - dragRef.current!.offsetY } : item));
    };
    const handleUp = () => { dragRef.current = null; };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  if (!open) return null;

  return (
    <aside style={{ position: "fixed", right: 18, bottom: 88, width: 340, maxHeight: "80vh", overflowY: "auto", zIndex: 80, borderRadius: 24, border: "1px solid " + config.borderColor, background: config.cardColor, color: config.textColor, boxShadow: "0 26px 90px rgba(0,0,0,0.35)", padding: 18, backdropFilter: "blur(22px)" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>✦ My Space Studio</h3>
        <button onClick={() => setOpen(false)} style={{ border: "1px solid " + config.borderColor, background: "rgba(255,255,255,0.04)", color: config.textColor, borderRadius: 999, padding: "5px 10px", fontSize: 12, cursor: "pointer" }}>Close</button>
      </div>

      {/* BACKGROUND COLOR — medium to dark range only */}
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5, margin: "0 0 10px" }}>Background</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginBottom: 8 }}>
          {[
            "#09090f", "#0f0f1a", "#1a1209", "#0a1a0f", "#0d0a1a",
            "#1c1409", "#1a0d0d", "#0a141a", "#141414", "#1a1a0a",
            "#2a1f0e", "#1a2a1a", "#0e1a2a", "#2a0e1a", "#1a1a2a",
            "#3d2a14", "#142a14", "#14243d", "#3d1428", "#2a2a3d",
          ].map((color) => (
            <button
              key={color}
              onClick={() => updateConfig("backgroundColor", color)}
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: 8,
                background: color,
                border: config.backgroundColor === color ? "2px solid rgba(214,179,111,0.8)" : "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              title={color}
            />
          ))}
        </div>
        <p style={{ fontSize: 10, opacity: 0.35, margin: 0, letterSpacing: "0.05em" }}>Custom: <input type="color" value={config.backgroundColor} onChange={(e) => updateConfig("backgroundColor", e.target.value)} style={{ width: 32, height: 20, borderRadius: 4, border: "none", background: "transparent", cursor: "pointer", verticalAlign: "middle" }} /></p>
      </div>

      {/* WALLPAPER */}
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5, margin: "0 0 8px" }}>Wallpaper</p>
        <select value={config.wallpaper} onChange={(e) => updateConfig("wallpaper", e.target.value)} style={{ width: "100%", borderRadius: 10, border: "1px solid " + config.borderColor, background: "rgba(255,255,255,0.04)", color: config.textColor, padding: "10px 12px", fontSize: 13 }}>
          {['solid', 'gradient', 'luxury', 'marble', 'satin', 'silk', 'glass', 'holographic', 'cyberpunk', 'floral', 'vintage', 'fashion'].map((o) => (
            <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* DECORATIONS */}
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5, margin: "0 0 8px" }}>Decorations</p>
        {decorationCatalog.map((group) => (
          <div key={group.category} style={{ marginBottom: 8 }}>
            <p style={{ fontSize: 11, opacity: 0.6, margin: "0 0 6px" }}>{group.category}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {group.items.map((item) => (
                <button key={item} onClick={() => addDecoration(item)} style={{ borderRadius: 999, border: "1px solid " + config.borderColor, background: "rgba(255,255,255,0.04)", color: config.textColor, padding: "6px 10px", cursor: "pointer", fontSize: 11 }}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* LIVE PREVIEW */}
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5, margin: "0 0 8px" }}>Preview</p>
        <div style={{ position: "relative", minHeight: 120, borderRadius: 14, border: "1px dashed " + config.borderColor, background: liveBackground, overflow: "hidden" }}>
          {decorations.map((item) => (
            <div key={item.id} onMouseDown={(e) => handlePointerDown(e, item)} style={{ position: "absolute", left: item.x, top: item.y, cursor: "grab", transform: "rotate(" + item.rotate + "deg)", padding: "5px 7px", borderRadius: 10, background: "rgba(255,255,255,0.82)", color: "#111", userSelect: "none", fontSize: 14 }}>
              {item.emoji}
              <button onClick={() => removeDecoration(item.id)} style={{ marginLeft: 4, border: "none", background: "transparent", color: "#111", fontWeight: 700, cursor: "pointer", fontSize: 11 }}>×</button>
            </div>
          ))}
        </div>
      </div>

      {/* SAVE / LOAD */}
      <div>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.5, margin: "0 0 8px" }}>Profiles</p>
        <input value={profileName} onChange={(e) => setProfileName(e.target.value)} style={{ width: "100%", borderRadius: 10, border: "1px solid " + config.borderColor, background: "rgba(255,255,255,0.04)", color: config.textColor, padding: "9px 12px", fontSize: 13, marginBottom: 8 }} placeholder="Profile name" />
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <button onClick={saveProfile} style={{ flex: 1, borderRadius: 999, border: "1px solid " + config.borderColor, background: "rgba(255,255,255,0.05)", color: config.textColor, padding: "8px", cursor: "pointer", fontSize: 12 }}>Save</button>
          <button onClick={() => setConfig({ ...defaultConfig })} style={{ flex: 1, borderRadius: 999, border: "1px solid " + config.borderColor, background: "rgba(255,255,255,0.05)", color: config.textColor, padding: "8px", cursor: "pointer", fontSize: 12 }}>Reset</button>
        </div>
        {profiles.map((entry) => (
          <button key={entry.name} onClick={() => loadProfile(entry)} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid " + config.borderColor, color: config.textColor, cursor: "pointer", fontSize: 12, marginBottom: 4 }}>
            {entry.name}
          </button>
        ))}
      </div>
    </aside>
  );
}