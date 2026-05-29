export const themes = {
  grunge: {
    name: "Archive Noir",
    bg: "#000000",
    bgGradient: "linear-gradient(180deg, #000000 0%, #0a0a0a 60%)",
    color: "#e9e9e9",
    textSecondary: "#bfbfbf",
    accentColor: "#7a1f24",
    font: "'Cinzel', serif",
    decorations: {
      description: "spider webs, chains, black roses, smoke overlays, grain textures",
      opacity: 0.08,
      elements: ["web", "chain", "rose", "smoke"],
    },
  },

  whimsical: {
    name: "Dreamstate",
    bg: "#e6f9ec",
    bgGradient: "linear-gradient(135deg, #e6f9ec 0%, #daf6e2 50%, #f0fff4 100%)",
    color: "#2f5d3a",
    textSecondary: "#4b6f54",
    accentColor: "#b7e0b5",
    font: "'Quicksand', sans-serif",
    decorations: {
      description: "butterflies, flowers, ladybugs, clouds, sparkles",
      opacity: 0.06,
      elements: ["butterfly", "flower", "cloud", "sparkle"],
    },
  },

  futuristic: {
    name: "Cyber Futuristic",
    bg: "#020410",
    bgGradient: "linear-gradient(135deg, #020410 0%, #0a1a4f 50%, #051030 100%)",
    color: "#59f3ff",
    textSecondary: "#a8ffff",
    accentColor: "#ff00ff",
    font: "'Orbitron', sans-serif",
    decorations: {
      description: "chrome stars, holographic textures, neon grids, metallic overlays",
      opacity: 0.1,
      elements: ["star", "hologram", "grid", "metallic"],
    },
  },

  luxury: {
    name: "Atelier",
    bg: "#efe6d8",
    bgGradient: "linear-gradient(180deg, #efe6d8 0%, #f5efe2 60%)",
    color: "#9c7b45",
    textSecondary: "#6c5a43",
    accentColor: "#c9a567",
    font: "'Cormorant Garamond', serif",
    decorations: {
      description: "paper textures, elegant typography, runway visuals, gold accents",
      opacity: 0.05,
      elements: ["paper", "typography", "runway", "gold"],
    },
  },

  y2k: {
    name: "Chrome Pop",
    bg: "#cfcfcf",
    bgGradient: "linear-gradient(90deg, #e6e6e6 0%, #cfcfcf 40%, #bdbdbd 100%)",
    color: "#0b0b0b",
    textSecondary: "#2b2b2b",
    accentColor: "#d0d0d0",
    font: "'Space Grotesk', sans-serif",
    style: {
      letterSpacing: "2px",
      textTransform: "uppercase",
    },
    accent: {
      primary: "#b8b8b8",
      secondary: "#2b2b2b",
      highlight: "#8a8a8a",
      neon: "#ff00ff",
    },
    decorations: {
      description: "chrome stars, glossy hearts, neon grids, holographic elements",
      opacity: 0.09,
      elements: ["chrome-star", "heart", "grid", "hologram"],
    },
  },
};