"use client";

import { useState } from "react";

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
  editorial: string;
};

type Props = {
  onSaveLook?: (look: Look) => void;
};

const OCCASION_KEYS: Record<string, string> = {
  party: "Party",
  date: "Date",
  interview: "Interview",
  university: "University",
  brunch: "Brunch",
  street: "Streetwear",
  festival: "Festival",
};

const STYLE_KEYS: Record<string, string> = {
  luxury: "Luxury",
  "dark academia": "Dark Academia",
  y2k: "Y2K",
  futuristic: "Futuristic",
  grunge: "Grunge",
  whimsical: "Whimsical",
  minimalist: "Minimalist",
  retro: "Retro",
};

const INTENSITY_KEYS: Record<string, string> = {
  minimal: "Minimal",
  maximal: "Maximal",
  bold: "Bold",
  soft: "Soft",
};

const MOOD_KEYS: Record<string, string> = {
  chill: "Chill",
  edgy: "Edgy",
  clean: "Clean",
  romantic: "Romantic",
  polished: "Polished",
  dramatic: "Dramatic",
};

const optionList = {
  occasion: ["Party", "University", "Date", "Interview", "Brunch", "Festival"],
  style: ["Luxury", "Dark Academia", "Y2K", "Futuristic", "Grunge", "Whimsical"],
  intensity: ["Minimal", "Maximal"],
  mood: ["Soft", "Chill", "Edgy", "Clean"],
};

function extractFromPrompt(prompt: string) {
  const text = prompt.toLowerCase();
  const result: Record<string, string> = {};

  Object.entries(OCCASION_KEYS).forEach(([key, label]) => {
    if (text.includes(key)) result.occasion = label;
  });

  Object.entries(STYLE_KEYS).forEach(([key, label]) => {
    if (text.includes(key)) result.style = label;
  });

  Object.entries(INTENSITY_KEYS).forEach(([key, label]) => {
    if (text.includes(key)) result.intensity = label;
  });

  Object.entries(MOOD_KEYS).forEach(([key, label]) => {
    if (text.includes(key)) result.mood = label;
  });

  return result;
}

function buildLook(values: {
  prompt: string;
  occasion: string;
  style: string;
  intensity: string;
  mood: string;
}): Look {
  const promptValues = extractFromPrompt(values.prompt);
  const occasion = values.occasion || promptValues.occasion || "Everyday";
  const style = values.style || promptValues.style || "Modern";
  const intensity = values.intensity || promptValues.intensity || "Balanced";
  const mood = values.mood || promptValues.mood || "Casual";

  const title = `${occasion} · ${style} Edit`;
  const description = `A ${intensity.toLowerCase()} ${style.toLowerCase()} outfit for ${occasion.toLowerCase()} with a ${mood.toLowerCase()} edge.`;

  const palette = [
    style === "Y2K"
      ? "Iridescent Silver"
      : style === "Grunge"
      ? "Charcoal Black"
      : style === "Luxury"
      ? "Champagne Gold"
      : style === "Futuristic"
      ? "Neon Cyan"
      : style === "Whimsical"
      ? "Mint Green"
      : "Midnight Blue",
    style === "Y2K"
      ? "Bubblegum Pink"
      : style === "Grunge"
      ? "Blood Red"
      : style === "Luxury"
      ? "Ivory"
      : style === "Futuristic"
      ? "Graphite"
      : style === "Whimsical"
      ? "Lavender"
      : "Soft Beige",
    style === "Futuristic" ? "Neon Purple" : "Satin Silver",
  ];

  const fabrics = [
    intensity === "Maximal" ? "Leather" : "Silk",
    style === "Grunge" ? "Distressed Denim" : "Tailored Wool",
    "Satin",
  ];

  const howToStyle = [
    `${intensity} layering with contrast textures`,
    `Anchor the look with a statement ${style.toLowerCase()} piece`,
    `Balance bold details with clean silhouettes`,
  ];

  const items = [
    { name: `${style} Blazer`, detail: `A polished layer for ${occasion.toLowerCase()}` },
    { name: `${style} Top`, detail: `Textured fabric that enhances the mood` },
    { name: `${style} Bottom`, detail: `A silhouette that supports the overall energy` },
  ];

  const editorial = `This edit blends ${palette[0].toLowerCase()}, ${palette[1].toLowerCase()}, and ${palette[2].toLowerCase()} into a ${mood.toLowerCase()} statement piece set designed for ${occasion.toLowerCase()}.`;

  return {
    id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    title,
    description,
    occasion,
    style,
    mood,
    fabric: fabrics,
    palette,
    howToStyle,
    items,
    editorial,
  };
}

export default function AIStylist({ onSaveLook }: Props) {
  const [prompt, setPrompt] = useState("");
  const [occasion, setOccasion] = useState("");
  const [style, setStyle] = useState("");
  const [intensity, setIntensity] = useState("");
  const [mood, setMood] = useState("");
  const [result, setResult] = useState<Look | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleGenerate = () => {
    if (!prompt.trim() && !occasion && !style && !intensity && !mood) {
      setFeedback("Use the prompt or select a few options to generate a styled look.");
      return;
    }

    setLoading(true);
    setFeedback("");

    setTimeout(() => {
      const look = buildLook({ prompt, occasion, style, intensity, mood });
      setResult(look);
      setLoading(false);
    }, 800);
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
            <h2 style={{ fontSize: 32, fontWeight: 600, margin: "0 0 14px", color: "#f9f7f1" }}>
              Fashion-forward smart edits in a cinematic styling interface.
            </h2>
            <p style={{ maxWidth: 730, color: "var(--muted)", lineHeight: 1.9 }}>
              Describe a look, set the mood, and watch the AI create runway-inspired outfit guidance with premium editorial detail.
            </p>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            <input
              className="input-field"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. futuristic date night with elegant layering"
            />

            <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {[
                { label: "Occasion", value: occasion, setter: setOccasion, options: optionList.occasion },
                { label: "Style", value: style, setter: setStyle, options: optionList.style },
                { label: "Intensity", value: intensity, setter: setIntensity, options: optionList.intensity },
                { label: "Mood", value: mood, setter: setMood, options: optionList.mood },
              ].map((field) => (
                <div key={field.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {field.label}
                  </p>
                  <select
                    className="select-field"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                  >
                    <option value="">Auto detect from prompt</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="action-row">
              <button className="premium-button" onClick={handleGenerate}>
                Generate
              </button>
              <button className="premium-button secondary-button" onClick={handleReset}>
                Reset
              </button>
            </div>

            {feedback && <p style={{ color: "#d9d9d9", opacity: 0.88 }}>{feedback}</p>}

            {loading && <p style={{ color: "var(--muted)" }}>Thinking through the edit...</p>}
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
                    <span key={color} style={{ padding: "8px 14px", borderRadius: 999, background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 12 }}>
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gap: 20, marginTop: 24 }}>
                <div>
                  <h4 style={{ marginBottom: 10, color: "#f9f7f1" }}>Fabric</h4>
                  <ul style={{ margin: 0, paddingLeft: 20, color: "var(--muted)", lineHeight: 1.8 }}>
                    {result.fabric.map((fabric) => (
                      <li key={fabric}>{fabric}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{ marginBottom: 10, color: "#f9f7f1" }}>How to style</h4>
                  <ul style={{ margin: 0, paddingLeft: 20, color: "var(--muted)", lineHeight: 1.8 }}>
                    {result.howToStyle.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{ marginBottom: 10, color: "#f9f7f1" }}>Key pieces</h4>
                  <ul style={{ margin: 0, paddingLeft: 20, color: "var(--muted)", lineHeight: 1.8 }}>
                    {result.items.map((item) => (
                      <li key={item.name}>
                        <strong>{item.name}</strong> — {item.detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p style={{ marginTop: 24, color: "rgba(245,243,238,0.75)", lineHeight: 1.95 }}>{result.editorial}</p>

              {onSaveLook && (
                <button className="premium-button" onClick={handleSave} style={{ marginTop: 18 }}>
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
