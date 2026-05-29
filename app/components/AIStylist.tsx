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
    <section style={{ padding: "40px 20px", maxWidth: 900, margin: "auto" }}>
      <h2>AI Styling Agent</h2>
      <p style={{ opacity: 0.75, maxWidth: 680, margin: "10px auto 24px" }}>
        Describe the mood or occasion and let the agent build a styled edit. Use prompt keywords like "y2k party," "grunge date," or "futuristic interview."
      </p>

      <div style={{ display: "grid", gap: 16 }}>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the outfit you want..."
          style={{ padding: 14, width: "100%", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "inherit" }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <div>
            <p style={{ margin: "0 0 6px", opacity: 0.7 }}>Occasion</p>
            <select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
              <option value="">Auto detect from prompt</option>
              {optionList.occasion.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p style={{ margin: "0 0 6px", opacity: 0.7 }}>Style</p>
            <select value={style} onChange={(e) => setStyle(e.target.value)}>
              <option value="">Auto detect from prompt</option>
              {optionList.style.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p style={{ margin: "0 0 6px", opacity: 0.7 }}>Intensity</p>
            <select value={intensity} onChange={(e) => setIntensity(e.target.value)}>
              <option value="">Auto detect from prompt</option>
              {optionList.intensity.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p style={{ margin: "0 0 6px", opacity: 0.7 }}>Mood</p>
            <select value={mood} onChange={(e) => setMood(e.target.value)}>
              <option value="">Auto detect from prompt</option>
              {optionList.mood.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={handleGenerate} style={{ padding: "13px 20px", minWidth: 120 }}>
            Generate
          </button>
          <button onClick={handleReset} style={{ padding: "13px 20px", minWidth: 120 }}>
            Reset
          </button>
        </div>

        {feedback && <p style={{ color: "#d9d9d9", opacity: 0.85 }}>{feedback}</p>}

        {loading && <p>Thinking through the edit...</p>}

        {result && (
          <div style={{ marginTop: 24, padding: 24, borderRadius: 18, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h3 style={{ marginTop: 0 }}>{result.title}</h3>
            <p style={{ opacity: 0.8 }}>{result.description}</p>

            <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
              <div>
                <h4 style={{ marginBottom: 10 }}>Palette</h4>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {result.palette.map((color) => (
                    <span key={color} style={{ padding: "8px 12px", borderRadius: 999, background: "rgba(255,255,255,0.08)", fontSize: 12 }}>
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: 10 }}>Fabric</h4>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {result.fabric.map((fabric) => (
                    <li key={fabric}>{fabric}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{ marginBottom: 10 }}>How to style</h4>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {result.howToStyle.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{ marginBottom: 10 }}>Key pieces</h4>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {result.items.map((item) => (
                    <li key={item.name}>
                      <strong>{item.name}</strong> — {item.detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p style={{ marginTop: 20, opacity: 0.75 }}>{result.editorial}</p>

            {onSaveLook && (
              <button onClick={handleSave} style={{ marginTop: 16, padding: "12px 18px" }}>
                Save Look
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
