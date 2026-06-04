"use client";

import { useState } from "react";
import type { WardrobeItem } from "./Wardrobe";

type OutfitItem = {
  id?: string;
  name: string;
  category: string;
  aesthetic: string;
  colors: string[];
  stylingNotes: string;
};

type Look = {
  id: string;
  title: string;
  description: string;
  occasion?: string;
  style?: string;
  mood?: string;
  fabric: string[];
  palette: string[];
  howToStyle: string[];
  items: { name: string; detail: string }[];
  wardrobeReferences?: string[];
  editorial: string;
};

type Props = {
  onSaveLook?: (look: Look) => void;
  wardrobeItems?: WardrobeItem[];
};

// Read from IndexedDB — where items are actually saved now
const getSavedWardrobe = (): Promise<WardrobeItem[]> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve([]);
    try {
      const request = indexedDB.open("rearchive-db", 1);
      request.onsuccess = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("digitalWardrobe")) return resolve([]);
        const tx = db.transaction("digitalWardrobe", "readonly");
        const store = tx.objectStore("digitalWardrobe");
        const all = store.getAll();
        all.onsuccess = () => resolve(all.result || []);
        all.onerror = () => resolve([]);
      };
      request.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
};

export default function AIStylist({ onSaveLook, wardrobeItems = [] }: Props) {
  const [prompt, setPrompt] = useState("");
  const [occasion, setOccasion] = useState("");
  const [style, setStyle] = useState("");
  const [intensity, setIntensity] = useState("");
  const [mood, setMood] = useState("");
  const [result, setResult] = useState<Look | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim() && !occasion) {
      setFeedback("Describe the look or choose an occasion to generate a styled edit.");
      return;
    }

    // Read from IndexedDB first, fall back to prop
    const savedWardrobe = await getSavedWardrobe();
    const sourceWardrobe = savedWardrobe.length ? savedWardrobe : wardrobeItems;

    if (!sourceWardrobe.length) {
      setFeedback("Save at least one piece to your Digital Wardrobe before generating.");
      return;
    }

    setLoading(true);
    setFeedback("");
    setResult(null);

    try {
      const wardrobePayload = sourceWardrobe.map(({ imageUrl, ...rest }: any) => rest);

      const res = await fetch("/api/style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, occasion, style, intensity, mood, wardrobe: wardrobePayload }),
      });

      const data = await res.json();

      if (data.error || !data.outfit?.length) {
        setFeedback(data.error || "The AI couldn't build an outfit. Try adding more pieces to your wardrobe.");
        setLoading(false);
        return;
      }

      const outfit: OutfitItem[] = data.outfit;
      const reasoning: string = data.reasoning || "";
      const alternates: { name: string; reason: string }[] = data.alternates || [];

      const palette = [...new Set(outfit.flatMap((i) => i.colors || []))].slice(0, 4);

      const fabric = outfit.map((i) => {
        if (i.category === "Outerwear") return "Wool Blend";
        if (i.category === "Tops") return "Soft Cotton";
        if (i.category === "Bottoms") return "Tailored Twill";
        if (i.category === "Shoes") return "Leather";
        if (i.category === "Accessories") return "Mixed Materials";
        return "Luxury Fabric";
      });

      const paletteStr = palette.join(", ").toLowerCase() || "tonal neutrals";
      const editorial = reasoning
        ? `${reasoning} The palette of ${paletteStr} ties the look together with a sense of considered restraint.`
        : `A look built around ${paletteStr} — each piece chosen for how it sits against the others.`;

      const promptContext = prompt.trim();
      const detectedOccasion = occasion || promptContext.match(/\b(picnic|party|date|festival|brunch|interview|wedding|office|vacation|travel|coffee)\b/i)?.[0] || "Everyday";
      const detectedStyle = style || promptContext.match(/\b(luxury|grunge|y2k|futuristic|minimal|streetwear|soft|editorial|chic|casual)\b/i)?.[0] || "Styled";

      const title = `${detectedOccasion.charAt(0).toUpperCase() + detectedOccasion.slice(1)} ${detectedStyle.charAt(0).toUpperCase() + detectedStyle.slice(1)} Look`;
      const description = promptContext
        ? `A ${detectedOccasion.toLowerCase()}-ready look inspired by "${promptContext}", built entirely from your saved wardrobe.`
        : `A polished ${detectedOccasion.toLowerCase()} look assembled from your Digital Wardrobe.`;

      const mappedItems = outfit.map((item) => ({
        name: item.name,
        detail: item.stylingNotes || `A ${item.category.toLowerCase()} piece in ${item.aesthetic.toLowerCase()} aesthetic.`,
      }));

      const howToStyle = alternates.length > 0
        ? ["Swap options suggested by the stylist:", ...alternates.slice(0, 2).map((a) => `${a.name} — ${a.reason}`)]
        : ["Balance the silhouette with intentional layering.", "Let one statement piece anchor the overall mood.", "Use subtle contrasts to elevate the final composition."];

      setResult({
        id: `${Date.now()}`, title, description, occasion, style, mood,
        fabric, palette, howToStyle, items: mappedItems,
        wardrobeReferences: outfit.map((i) => i.name), editorial,
      });
    } catch {
      setFeedback("Something went wrong. Check your connection and try again.");
    }

    setLoading(false);
  };

  const handleReset = () => {
    setPrompt(""); setOccasion(""); setStyle("");
    setIntensity(""); setMood(""); setResult(null); setFeedback("");
  };

  const handleSave = () => {
    if (result && onSaveLook) {
      onSaveLook(result);
      setFeedback("Look saved to your collection.");
    }
  };

  return (
    <section className="section-panel fade-in" style={{ padding: "42px 20px" }}>
      <div className="glass-panel" style={{ padding: "38px 36px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <p className="section-title">AI Styling</p>
            <h2 style={{ fontSize: 32, fontWeight: 600, margin: "0 0 14px", color: "#f9f7f1" }}>
              Curated outfit edits shaped by your wardrobe and your mood.
            </h2>
            <p style={{ maxWidth: 730, color: "var(--muted)", lineHeight: 1.9 }}>
              Describe the moment, set the atmosphere, and let the AI turn your saved pieces into elevated, editorial-ready styling direction.
            </p>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            <input className="input-field" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g. futuristic date night with elegant layering" />

            <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}>Occasion / Moment</p>
                <select className="select-field" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                  <option value="">Auto detect from prompt</option>
                  <option value="Party">Soirée</option>
                  <option value="Date">Date Night</option>
                  <option value="Interview">Executive Meeting</option>
                  <option value="Brunch">Weekend Brunch</option>
                  <option value="Festival">Festival Edit</option>
                  <option value="University">Campus Chic</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}>Editorial Direction</p>
                <select className="select-field" value={style} onChange={(e) => setStyle(e.target.value)}>
                  <option value="">Auto detect from prompt</option>
                  <option value="Luxury">Quiet Luxury</option>
                  <option value="Dark Academia">Dark Academia</option>
                  <option value="Y2K">Y2K Revival</option>
                  <option value="Futuristic">Cyber Futurism</option>
                  <option value="Grunge">Archive Grunge</option>
                  <option value="Whimsical">Soft Editorial</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}>Intensity</p>
                <select className="select-field" value={intensity} onChange={(e) => setIntensity(e.target.value)}>
                  <option value="">Auto detect from prompt</option>
                  <option value="Minimal">Minimal</option>
                  <option value="Maximal">Maximal</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}>Atmosphere</p>
                <select className="select-field" value={mood} onChange={(e) => setMood(e.target.value)}>
                  <option value="">Auto detect from prompt</option>
                  <option value="Soft">Velvet Soft</option>
                  <option value="Chill">Effortless Cool</option>
                  <option value="Edgy">Edge & Structure</option>
                  <option value="Clean">Clean Minimal</option>
                </select>
              </div>
            </div>

            <div className="action-row">
              <button className="premium-button" onClick={handleGenerate} disabled={loading}>
                {loading ? "Styling…" : "Generate"}
              </button>
              <button className="premium-button secondary-button" onClick={handleReset}>Reset</button>
            </div>

            {feedback && <p style={{ color: "#d9d9d9", opacity: 0.88 }}>{feedback}</p>}
            {loading && <p style={{ color: "var(--muted)" }}>Reading your wardrobe and building the look…</p>}
          </div>

          {result && (
            <div className="glass-card" style={{ marginTop: 12, padding: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 18 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 24, color: "#f9f7f1" }}>{result.title}</h3>
                  <p style={{ marginTop: 12, color: "var(--muted)", lineHeight: 1.85 }}>{result.description}</p>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {result.palette.map((color) => (
                    <span key={color} style={{ padding: "8px 14px", borderRadius: 999, background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 12 }}>{color}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gap: 20, marginTop: 24 }}>
                <div>
                  <h4 style={{ marginBottom: 10, color: "#f9f7f1" }}>Key pieces</h4>
                  <ul style={{ margin: 0, paddingLeft: 20, color: "var(--muted)", lineHeight: 1.8 }}>
                    {result.items.map((item) => (
                      <li key={item.name}><strong style={{ color: "#f9f7f1" }}>{item.name}</strong> — {item.detail}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 style={{ marginBottom: 10, color: "#f9f7f1" }}>Fabric notes</h4>
                  <ul style={{ margin: 0, paddingLeft: 20, color: "var(--muted)", lineHeight: 1.8 }}>
                    {result.fabric.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 style={{ marginBottom: 10, color: "#f9f7f1" }}>Styling notes</h4>
                  <ul style={{ margin: 0, paddingLeft: 20, color: "var(--muted)", lineHeight: 1.8 }}>
                    {result.howToStyle.map((tip, i) => <li key={i}>{tip}</li>)}
                  </ul>
                </div>
              </div>

              {result.wardrobeReferences?.length ? (
                <div style={{ marginTop: 24, padding: 20, borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p style={{ margin: 0, color: "#f9f7f1", fontWeight: 600 }}>✦ Wardrobe sync</p>
                  <p style={{ margin: "10px 0 0", color: "var(--muted)", lineHeight: 1.8 }}>
                    Styled from {result.wardrobeReferences.length} piece{result.wardrobeReferences.length !== 1 ? "s" : ""} in your Digital Wardrobe — {result.wardrobeReferences.join(", ")}.
                  </p>
                </div>
              ) : null}

              <p style={{ marginTop: 24, color: "rgba(245,243,238,0.75)", lineHeight: 1.95, fontStyle: "italic" }}>{result.editorial}</p>

              {onSaveLook && (
                <button className="premium-button" onClick={handleSave} style={{ marginTop: 18 }}>Save Look</button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}