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
  fontFamily: "Inter, sans-serif",
  fontSize: 16,
  fontWeight: 400,
  fontStyle: "normal",
  textDecoration: "none",
  letterSpacing: 0,
  lineHeight: 1.5,
  wallpaper: "solid",
  cursor: "default",
};

const presetPalettes = [
  { name: "Quiet Luxury", config: { ...defaultConfig, backgroundColor: "#efe6d8", textColor: "#3d2e1f", headingColor: "#3d2e1f", navTextColor: "#3d2e1f", buttonColor: "#c9a567", accentColor: "#b78b4c", cardColor: "rgba(255,255,255,0.72)", borderColor: "rgba(94, 74, 41, 0.18)", navColor: "rgba(255,255,255,0.74)", searchColor: "rgba(255,255,255,0.68)", hoverEffectColor: "rgba(201, 165, 103, 0.16)", fontFamily: "Cormorant Garamond, serif", wallpaper: "luxury" } },
  { name: "Cyber Future", config: { ...defaultConfig, backgroundColor: "#040816", textColor: "#8ffcff", headingColor: "#8ffcff", navTextColor: "#8ffcff", buttonColor: "#5c7cff", accentColor: "#ff4fd8", cardColor: "rgba(10, 18, 42, 0.88)", borderColor: "rgba(143, 252, 255, 0.20)", navColor: "rgba(4, 8, 22, 0.92)", searchColor: "rgba(17, 28, 58, 0.94)", hoverEffectColor: "rgba(92, 124, 255, 0.18)", fontFamily: "Orbitron, sans-serif", wallpaper: "holographic" } },
  { name: "Coquette", config: { ...defaultConfig, backgroundColor: "#fff4f8", textColor: "#7a465f", headingColor: "#7a465f", navTextColor: "#7a465f", buttonColor: "#ffb6d5", accentColor: "#ff8fc2", cardColor: "rgba(255,255,255,0.82)", borderColor: "rgba(122, 70, 95, 0.18)", navColor: "rgba(255,255,255,0.88)", searchColor: "rgba(255,240,247,0.92)", hoverEffectColor: "rgba(255, 182, 213, 0.22)", fontFamily: "Pacifico, cursive", wallpaper: "floral" } },
  { name: "Dark Academia", config: { ...defaultConfig, backgroundColor: "#24170f", textColor: "#efe0cb", headingColor: "#efe0cb", navTextColor: "#efe0cb", buttonColor: "#8d5b3b", accentColor: "#b77f52", cardColor: "rgba(49, 35, 24, 0.86)", borderColor: "rgba(255,255,255,0.12)", navColor: "rgba(32, 24, 17, 0.92)", searchColor: "rgba(59, 42, 29, 0.92)", hoverEffectColor: "rgba(139, 91, 59, 0.16)", fontFamily: "Lora, serif", wallpaper: "vintage" } },
];

const fontOptions = [
  "Inter", "Poppins", "Montserrat", "Playfair Display", "Lora", "Roboto", "Open Sans", "Merriweather", "Bebas Neue", "Raleway", "Outfit", "DM Sans", "Space Grotesk", "Orbitron", "Cinzel", "Dancing Script", "Pacifico", "Cormorant Garamond",
];

const decorationCatalog = [
  { category: "Nature", items: ["🌸 Flowers", "🌹 Roses", "🌼 Daisies", "🌻 Sunflowers", "🍃 Leaves", "🦋 Butterflies", "⭐ Stars"] },
  { category: "Luxury", items: ["💎 Diamonds", "✨ Sparkles", "👑 Crown", "🏆 Gold Frames", "🪩 Crystal"] },
  { category: "Gothic", items: ["🕯️ Black Roses", "💀 Skulls", "⛓️ Chains", "🕷️ Spiders", "🌙 Moon"] },
  { category: "Cyber", items: ["⚡ Neon Circles", "💫 Holographic", "🔷 Neon Rings", "📡 Data Nodes", "🧬 AI Symbols"] },
];

export default function MySpaceStudio({ open, setOpen, config, setConfig, decorations, setDecorations }: { open: boolean; setOpen: (value: boolean) => void; config: StudioConfig; setConfig: (value: StudioConfig) => void; decorations: DecorationItem[]; setDecorations: React.Dispatch<React.SetStateAction<DecorationItem[]>>; }) {
  const [profileName, setProfileName] = useState("My Quiet Luxury");
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

  const applyPreset = (preset: { config: StudioConfig }) => setConfig({ ...preset.config });

  const updateConfig = (key: keyof StudioConfig, value: string | number) => setConfig({ ...config, [key]: value });

  const saveProfile = () => {
    if (!profileName.trim()) return;
    const next = [...profiles.filter((entry) => entry.name !== profileName), { name: profileName, config: { ...config } }];
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

  const exportProfile = () => {
    const blob = new Blob([JSON.stringify({ config, decorations, profiles }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rearchive-space-studio.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importProfile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const imported = JSON.parse(text);
    if (imported.config) setConfig(imported.config);
    if (imported.decorations) setDecorations(imported.decorations);
    if (imported.profiles) setProfiles(imported.profiles);
    event.target.value = "";
  };

  return (
    <>
      {open && (
        <aside style={{ position: "fixed", right: 18, bottom: 88, width: 360, maxHeight: "82vh", overflowY: "auto", zIndex: 80, borderRadius: 28, border: "1px solid " + config.borderColor, background: config.cardColor, color: config.textColor, boxShadow: "0 26px 90px rgba(0,0,0,0.35)", padding: 18, backdropFilter: "blur(22px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.25, opacity: 0.78 }}>My Space Studio</div>
              <h3 style={{ fontSize: 18, margin: "4px 0 0" }}>Customize your room</h3>
            </div>
            <button onClick={() => setOpen(false)} style={{ border: "1px solid " + config.borderColor, background: "rgba(255,255,255,0.04)", color: config.textColor, borderRadius: 999, padding: "6px 10px" }}>Close</button>
          </div>

          <div style={{ display: "grid", gap: 10, marginBottom: 12 }}>
            {presetPalettes.map((preset) => (
              <button key={preset.name} onClick={() => applyPreset(preset)} style={{ textAlign: "left", padding: "10px 12px", borderRadius: 16, background: "rgba(255,255,255,0.05)", border: "1px solid " + config.borderColor, color: config.textColor }}>
                <strong>{preset.name}</strong>
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            <label style={{ display: "grid", gap: 4, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.2 }}>
              Background color
              <input type="color" value={config.backgroundColor} onChange={(e) => updateConfig("backgroundColor", e.target.value)} style={{ width: "100%", borderRadius: 10, border: "1px solid " + config.borderColor, background: "transparent", padding: 4 }} />
            </label>
            <label style={{ display: "grid", gap: 4, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.2 }}>
              Main heading color
              <input type="color" value={config.headingColor} onChange={(e) => updateConfig("headingColor", e.target.value)} style={{ width: "100%", borderRadius: 10, border: "1px solid " + config.borderColor, background: "transparent", padding: 4 }} />
            </label>
            <label style={{ display: "grid", gap: 4, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.2 }}>
              Navigation text color
              <input type="color" value={config.navTextColor} onChange={(e) => updateConfig("navTextColor", e.target.value)} style={{ width: "100%", borderRadius: 10, border: "1px solid " + config.borderColor, background: "transparent", padding: 4 }} />
            </label>
            <label style={{ display: "grid", gap: 4, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.2 }}>
              Content text color
              <input type="color" value={config.textColor} onChange={(e) => updateConfig("textColor", e.target.value)} style={{ width: "100%", borderRadius: 10, border: "1px solid " + config.borderColor, background: "transparent", padding: 4 }} />
            </label>
            <label style={{ display: "grid", gap: 4, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.2 }}>
              Button color
              <input type="color" value={config.buttonColor} onChange={(e) => updateConfig("buttonColor", e.target.value)} style={{ width: "100%", borderRadius: 10, border: "1px solid " + config.borderColor, background: "transparent", padding: 4 }} />
            </label>
            <label style={{ display: "grid", gap: 4, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.2 }}>
              Accent color
              <input type="color" value={config.accentColor} onChange={(e) => updateConfig("accentColor", e.target.value)} style={{ width: "100%", borderRadius: 10, border: "1px solid " + config.borderColor, background: "transparent", padding: 4 }} />
            </label>
          </div>

          <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
            <label style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.2 }}>Font family</label>
            <select value={config.fontFamily} onChange={(e) => updateConfig("fontFamily", e.target.value)} style={{ width: "100%", borderRadius: 12, border: "1px solid " + config.borderColor, background: "rgba(255,255,255,0.04)", color: config.textColor, padding: "10px 12px" }}>
              {fontOptions.map((font) => <option key={font} value={font + ", sans-serif"}>{font}</option>)}
            </select>
            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.2 }}>Font size</label>
              <input type="range" min="12" max="24" value={config.fontSize} onChange={(e) => updateConfig("fontSize", Number(e.target.value))} />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => updateConfig("fontSize", Math.max(12, config.fontSize - 1))} style={chipStyle(config)}>A-</button>
                <button onClick={() => updateConfig("fontSize", Math.min(24, config.fontSize + 1))} style={chipStyle(config)}>A+</button>
                <button onClick={() => updateConfig("fontWeight", config.fontWeight === 700 ? 400 : 700)} style={chipStyle(config)}>{config.fontWeight === 700 ? "Remove bold" : "Bold"}</button>
                <button onClick={() => updateConfig("fontStyle", config.fontStyle === "italic" ? "normal" : "italic")} style={chipStyle(config)}>{config.fontStyle === "italic" ? "Remove italic" : "Italic"}</button>
                <button onClick={() => updateConfig("textDecoration", config.textDecoration === "underline" ? "none" : "underline")} style={chipStyle(config)}>{config.textDecoration === "underline" ? "Remove underline" : "Underline"}</button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
            <label style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.2 }}>Wallpaper style</label>
            <select value={config.wallpaper} onChange={(e) => updateConfig("wallpaper", e.target.value)} style={{ width: "100%", borderRadius: 12, border: "1px solid " + config.borderColor, background: "rgba(255,255,255,0.04)", color: config.textColor, padding: "10px 12px" }}>
              {['solid', 'gradient', 'luxury', 'marble', 'satin', 'silk', 'glass', 'holographic', 'cyberpunk', 'floral', 'vintage', 'fashion'].map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Tip: your wallpaper and palette updates stream instantly.</div>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.2, marginBottom: 6 }}>Decoration library</div>
            {decorationCatalog.map((group) => (
              <div key={group.category} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 12, opacity: 0.82, marginBottom: 4 }}>{group.category}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {group.items.map((item) => (
                    <button key={item} onClick={() => addDecoration(item)} style={chipStyle(config)}>{item}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12, borderRadius: 18, padding: 10, border: "1px solid " + config.borderColor, background: "rgba(255,255,255,0.04)" }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.2, marginBottom: 6 }}>Live preview</div>
            <div style={{ position: "relative", minHeight: 140, borderRadius: 18, border: "1px dashed " + config.borderColor, background: liveBackground, overflow: "hidden" }}>
              {decorations.map((item) => (
                <div key={item.id} onMouseDown={(event) => handlePointerDown(event, item)} style={{ position: "absolute", left: item.x, top: item.y, cursor: "grab", transform: "rotate(" + item.rotate + "deg)", padding: "6px 8px", borderRadius: 12, background: "rgba(255,255,255,0.82)", color: "#111", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 10px 30px rgba(0,0,0,0.15)", userSelect: "none" }}>
                  {item.emoji} <button onClick={() => removeDecoration(item.id)} style={{ marginLeft: 6, border: "none", background: "transparent", color: "#111", fontWeight: 700 }}>×</button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
            <input value={profileName} onChange={(e) => setProfileName(e.target.value)} style={{ width: "100%", borderRadius: 12, border: "1px solid " + config.borderColor, background: "rgba(255,255,255,0.04)", color: config.textColor, padding: "10px 12px" }} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={saveProfile} style={chipStyle(config)}>Save profile</button>
              <button onClick={() => setConfig({ ...defaultConfig })} style={chipStyle(config)}>Reset</button>
              <button onClick={exportProfile} style={chipStyle(config)}>Export</button>
              <label style={chipStyle(config)}>
                Import
                <input type="file" accept="application/json" onChange={importProfile} style={{ display: "none" }} />
              </label>
            </div>
            <div style={{ display: "grid", gap: 4 }}>
              {profiles.map((entry) => (
                <button key={entry.name} onClick={() => loadProfile(entry)} style={{ textAlign: "left", padding: "8px 10px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid " + config.borderColor, color: config.textColor }}>
                  {entry.name}
                </button>
              ))}
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

function chipStyle(config: StudioConfig) {
  return {
    borderRadius: 999,
    border: "1px solid " + config.borderColor,
    background: "rgba(255,255,255,0.05)",
    color: config.textColor,
    padding: "8px 10px",
    cursor: "pointer",
    fontSize: 12,
  } as const;
}
