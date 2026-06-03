"use client";

import { useState } from "react";
import type { WardrobeItem } from "./Wardrobe";

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

const getStoredWardrobe = () => {
  if (typeof window === "undefined") return [] as WardrobeItem[];

  const savedWardrobe = window.localStorage.getItem("rearchive-wardrobe");
  const savedDigital = window.localStorage.getItem("digitalWardrobe");

  const parsedUpload = savedWardrobe ? JSON.parse(savedWardrobe) : [];
  const parsedDigital = savedDigital ? JSON.parse(savedDigital) : [];

  return [...new Map([...(Array.isArray(parsedUpload) ? parsedUpload : []), ...(Array.isArray(parsedDigital) ? parsedDigital : [])].map((item) => [item.id, item])).values()] as WardrobeItem[];
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

  const generateDetail = (item: WardrobeItem, occ: string) => {
    const safeOcc = occ || "this occasion";
    return `A refined ${item.category.toLowerCase()} choice that enhances the ${item.aesthetic.toLowerCase()} mood while grounding the look for ${safeOcc.toLowerCase()}.`;
  };

  const extractPalette = (outfit: WardrobeItem[]) => {
    const colors = outfit.flatMap((i) => i.colors || []);
    return [...new Set(colors)].slice(0, 3);
  };

  const inferFabrics = (outfit: WardrobeItem[]) => {
    return outfit.map((i) => {
      if (i.category === "Outerwear") return "Wool Blend";
      if (i.category === "Tops") return "Soft Cotton";
      if (i.category === "Bottoms") return "Tailored Twill";
      if (i.category === "Shoes") return "Leather";
      return "Mixed Textures";
    });
  };

  const generateStylingTips = () => {
    return [
      "Balance the silhouette with intentional layering.",
      "Let one statement piece anchor the overall mood.",
      "Use subtle contrasts to elevate the final composition.",
    ];
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !occasion) {
      setFeedback("Describe the look or choose an occasion to generate a styled edit.");
      return;
    }

    const sourceWardrobe = wardrobeItems.length ? wardrobeItems : getStoredWardrobe();

    if (!sourceWardrobe.length) {
      setFeedback("Upload and save at least one piece to your wardrobe before generating.");
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      const res = await fetch("/api/style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          occasion,
          style,
          intensity,
          mood,
          wardrobe: sourceWardrobe,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setFeedback("Something went wrong. Try again.");
        setLoading(false);
        return;
      }

      const outfit: WardrobeItem[] = data.outfit || [];
      const reasoning: string = data.reasoning || "";

      if (!outfit.length) {
        setFeedback("The AI couldn't build an outfit from your current wardrobe.");
        setResult(null);
        setLoading(false);
        return;
      }

      const palette = extractPalette(outfit);
      const fabrics = inferFabrics(outfit);
      const stylingTips = generateStylingTips();

      const editorial = `This look blends ${palette
        .join(", ")
        .toLowerCase()} with clean structure and a naturally styled finish. ${reasoning}`;

      const promptContext = prompt.trim();
      const detectedOccasion = occasion || promptContext.match(/\b(picnic|party|date|festival|brunch|interview|wedding|office|vacation|travel|coffee)\b/i)?.[0] || "day";
      const detectedStyle = style || promptContext.match(/\b(luxury|grunge|y2k|futuristic|minimal|streetwear|soft|editorial|chic|casual)\b/i)?.[0] || "styled";

      const title = `${detectedOccasion.charAt(0).toUpperCase() + detectedOccasion.slice(1)} ${detectedStyle.charAt(0).toUpperCase() + detectedStyle.slice(1)} Look`;
      const description = promptContext
        ? `A ${detectedOccasion.toLowerCase()}-ready look inspired by “${promptContext}”, styled to feel effortless, wearable, and put together.`
        : `A polished ${detectedOccasion.toLowerCase()} look built from your saved wardrobe.`;

      const mappedItems = outfit.map((item) => ({
        name: item.name,
        detail: generateDetail(item, occasion),
      }));

      const look: Look = {
        id: `${Date.now()}`,
        title,
        description,
        occasion,
        style,
        mood,
        fabric: fabrics,
        palette,
        howToStyle: stylingTips,
        items: mappedItems,
        wardrobeReferences: outfit.map((i) => i.name),
        editorial,
      };

      setResult(look);
    } catch (err) {
      setFeedback("Error generating look.");
    }

    setLoading(false);
  };

  const handleReset = () => {
    setPrompt("");
    setOccasion("");
    setStyle("");
    setIntensity("");
    setMood("");
    setResult(null);
    setFeedback("");
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
            <h2
              style={{
                fontSize: 32,
                fontWeight: 600,
                margin: "0 0 14px",
                color: "#f9f7f1",
              }}
            >
              Curated outfit edits shaped by your wardrobe and your mood.
            </h2>
            <p style={{ maxWidth: 730, color: "var(--muted)", lineHeight: 1.9 }}>
              Describe the moment, set the atmosphere, and let the AI turn your saved pieces into elevated, editorial-ready styling direction.
            </p>
          </div>

          {/* INPUTS */}
          <div style={{ display: "grid", gap: 18 }}>
            <input
              className="input-field"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. futuristic date night with elegant layering"
            />

            <div
              className="feature-grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p
                  style={{
                    margin: 0,
                    color: "var(--muted)",
                    fontSize: 13,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Occasion / Moment
                </p>
                <select
                  className="select-field"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                >
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
                <p
                  style={{
                    margin: 0,
                    color: "var(--muted)",
                    fontSize: 13,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Editorial Direction
                </p>
                <select
                  className="select-field"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                >
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
                <p
                  style={{
                    margin: 0,
                    color: "var(--muted)",
                    fontSize: 13,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Intensity
                </p>
                <select
                  className="select-field"
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value)}
                >
                  <option value="">Auto detect from prompt</option>
                  <option value="Minimal">Minimal</option>
                  <option value="Maximal">Maximal</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p
                  style={{
                    margin: 0,
                    color: "var(--muted)",
                    fontSize: 13,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Atmosphere
                </p>
                <select
                  className="select-field"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                >
                  <option value="">Auto detect from prompt</option>
                  <option value="Soft">Velvet Soft</option>
                  <option value="Chill">Effortless Cool</option>
                  <option value="Edgy">Edge & Structure</option>
                  <option value="Clean">Clean Minimal</option>
                </select>
              </div>
            </div>

            <div className="action-row">
              <button className="premium-button" onClick={handleGenerate}>
                Generate
              </button>
              <button className="premium-button secondary-button" onClick={handleReset}>
                Reset
              </button>
            </div>

            {feedback && (
              <p style={{ color: "#d9d9d9", opacity: 0.88 }}>{feedback}</p>
            )}
            {loading && (
              <p style={{ color: "var(--muted)" }}>Thinking through the edit …</p>
            )}
          </div>

          {/* RESULT */}
          {result && (
            <div className="glass-card" style={{ marginTop: 12, padding: 28 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 18,
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 24,
                      color: "#f9f7f1",
                    }}
                  >
                    {result.title}
                  </h3>
                  <p
                    style={{
                      marginTop: 12,
                      color: "var(--muted)",
                      lineHeight: 1.85,
                    }}
                  >
                    {result.description}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {result.palette.map((color) => (
                    <span
                      key={color}
                      style={{
                        padding: "8px 14px",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.08)",
                        color: "#fff",
                        fontSize: 12,
                      }}
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gap: 20, marginTop: 24 }}>
                <div>
                  <h4
                    style={{
                      marginBottom: 10,
                      color: "#f9f7f1",
                    }}
                  >
                    Fabric
                  </h4>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 20,
                      color: "var(--muted)",
                      lineHeight: 1.8,
                    }}
                  >
                    {result.fabric.map((fabric) => (
                      <li key={fabric}>{fabric}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4
                    style={{
                      marginBottom: 10,
                      color: "#f9f7f1",
                    }}
                  >
                    How to style
                  </h4>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 20,
                      color: "var(--muted)",
                      lineHeight: 1.8,
                    }}
                  >
                    {result.howToStyle.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4
                    style={{
                      marginBottom: 10,
                      color: "#f9f7f1",
                    }}
                  >
                    Key pieces
                  </h4>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 20,
                      color: "var(--muted)",
                      lineHeight: 1.8,
                    }}
                  >
                    {result.items.map((item) => (
                      <li key={item.name}>
                        <strong>{item.name}</strong> — {item.detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {result.wardrobeReferences?.length ? (
                <div
                  style={{
                    marginTop: 24,
                    padding: 20,
                    borderRadius: 20,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#f9f7f1",
                      fontWeight: 600,
                    }}
                  >
                    Wardrobe sync
                  </p>
                  <p
                    style={{
                      margin: "10px 0 0",
                      color: "var(--muted)",
                      lineHeight: 1.8,
                    }}
                  >
                    Uses saved items from your wardrobe.
                  </p>
                </div>
              ) : null}

              <p
                style={{
                  marginTop: 24,
                  color: "rgba(245,243,238,0.75)",
                  lineHeight: 1.95,
                }}
              >
                {result.editorial}
              </p>

              {onSaveLook && (
                <button
                  className="premium-button"
                  onClick={handleSave}
                  style={{ marginTop: 18 }}
                >
                  Save Look
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
