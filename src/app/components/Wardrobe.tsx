"use client";

import React, { useEffect, useMemo, useState } from "react";
import { saveItem } from "../lib/wardrobeDB";

export type WardrobeItem = {
  id: string;
  name: string;
  category: string;
  aesthetic: string;
  occasion: string;
  colors: string[];
  stylingNotes: string;
  imageUrl: string;
};

type Props = {
  items: WardrobeItem[];
  onItemsChange: (items: WardrobeItem[]) => void;
};

const categories = ["Outerwear", "Tops", "Bottoms", "Shoes", "Accessories"];
const aesthetics = [
  "Grunge",
  "Y2K",
  "Luxury Minimal",
  "Cyber Futuristic",
  "Streetwear",
  "Soft Editorial",
];

export default function Wardrobe({ items, onItemsChange }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterAesthetic, setFilterAesthetic] = useState("All");

  // PREVIEW
  useEffect(() => {
    if (!file) { setPreview(""); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // SAVE TO DIGITAL WARDROBE — uses IndexedDB
  const saveToWardrobe = async (item: WardrobeItem) => {
    try {
      await saveItem(item);
    } catch (err) {
      alert("Failed to save item. Please try again.");
      return;
    }

    setSavedIds((prev) => new Set(prev).add(item.id));

    setTimeout(() => {
      onItemsChange(items.filter((i) => i.id !== item.id));
      setSavedIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 600);
  };

  // ANALYZE IMAGE
  const analyzeImage = async () => {
    if (!file) return;
    setError(null);
    try {
      setLoading(true);

      const imageBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const formData = new FormData();
      formData.append("image", file);
      formData.append("description", description);

      const res = await fetch("/api/analyze", { method: "POST", body: formData });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to analyze image");
      }

      const data = await res.json();

      if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
        throw new Error("No clothing items detected in this image.");
      }

      const newItems: WardrobeItem[] = data.items.map((it: any, index: number) => ({
        id: `${Date.now()}-${index}`,
        name: it.name || "Item",
        category: it.category || (Array.isArray(it.accessories) && it.accessories.length ? "Accessories" : "Tops"),
        aesthetic: it.aesthetic || "Luxury Minimal",
        occasion: it.occasion || "Auto-detected",
        colors: Array.isArray(it.colors) ? it.colors : ["Unknown"],
        stylingNotes: [
          it.stylingNotes,
          Array.isArray(it.accessories) && it.accessories.length
            ? `Accessories: ${it.accessories.join(", ")}`
            : "",
        ].filter(Boolean).join(" • "),
        imageUrl: imageBase64,
      }));

      onItemsChange([...items, ...newItems]);
      setFile(null);
      setPreview("");
      setDescription("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // FILTERING
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filterCategory !== "All" && item.category !== filterCategory) return false;
      if (filterAesthetic !== "All" && item.aesthetic !== filterAesthetic) return false;
      return true;
    });
  }, [items, filterCategory, filterAesthetic]);

  return (
    <section style={{ maxWidth: 1200, margin: "60px auto 80px", padding: "0 20px" }}>
      <header style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
        <h1 style={{ fontSize: 40, margin: 0, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Upload
        </h1>
        <p style={{ margin: 0, opacity: 0.8, maxWidth: 520, lineHeight: 1.7 }}>
          Upload any outfit photo — mirror selfies, street shots, editorials. The AI detects
          individual pieces and adds them as separate wardrobe items you can reuse in future looks.
        </p>
      </header>

      {/* UPLOAD + PREVIEW */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)", gap: 24, marginBottom: 32 }}>
        <div style={{ borderRadius: 20, padding: 20, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.35)", backdropFilter: "blur(16px)" }}>
          <h3 style={{ marginTop: 0, marginBottom: 10, fontSize: 18 }}>Upload outfit image</h3>

          <label style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 16px", borderRadius: 999, border: "1px dashed rgba(255,255,255,0.35)", cursor: "pointer", fontSize: 14, gap: 8 }}>
            <span>Choose image</span>
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>

          {file && <div style={{ marginTop: 10, fontSize: 13, opacity: 0.85 }}>Selected: <strong>{file.name}</strong></div>}

          <textarea
            placeholder="Optional: describe the vibe or aesthetic"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", marginTop: 16, minHeight: 80, borderRadius: 14, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.04)", color: "inherit", padding: 12, outline: "none" }}
          />

          <button
            onClick={analyzeImage}
            disabled={loading || !file}
            style={{ marginTop: 16, padding: "12px 20px", borderRadius: 999, border: "none", cursor: loading || !file ? "not-allowed" : "pointer", opacity: loading || !file ? 0.6 : 1, background: "#f5e0b8", color: "#111", fontWeight: 600, fontSize: 14 }}
          >
            {loading ? "Analyzing outfit..." : "Upload & detect pieces"}
          </button>

          {error && <div style={{ marginTop: 10, fontSize: 13, color: "#ffb3b3" }}>{error}</div>}
        </div>

        <div style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.35)", backdropFilter: "blur(16px)", padding: 16, minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          {preview ? (
            <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 16 }} />
          ) : (
            <div style={{ opacity: 0.8, fontSize: 14 }}>Outfit preview will appear here.</div>
          )}
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 18, justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.5)", color: "inherit", fontSize: 13 }}>
            <option value="All">All categories</option>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={filterAesthetic} onChange={(e) => setFilterAesthetic(e.target.value)} style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.5)", color: "inherit", fontSize: 13 }}>
            <option value="All">All aesthetics</option>
            {aesthetics.map((a) => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div style={{ fontSize: 13, opacity: 0.8 }}>{filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""} in view</div>
      </div>

      {/* GRID */}
      {loading && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ borderRadius: 18, padding: 12, background: "#ffffff", boxShadow: "0 14px 40px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ borderRadius: 14, background: "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", minHeight: 180 }} />
              <div style={{ height: 16, borderRadius: 8, background: "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", width: "70%" }} />
              <div style={{ height: 12, borderRadius: 8, background: "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", width: "50%" }} />
            </div>
          ))}
          <style>{`@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`}</style>
        </div>
      )}

      {!loading && filteredItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 24px", opacity: 0.7 }}>
          <p style={{ fontSize: 32, marginBottom: 12 }}>📸</p>
          <p style={{ fontSize: 18, fontFamily: "'Cormorant Garamond', serif", marginBottom: 8 }}>No items detected yet.</p>
          <p style={{ fontSize: 13, opacity: 0.6 }}>Upload an outfit photo above to start building your wardrobe.</p>
        </div>
      ) : !loading && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          {filteredItems.map((item) => {
            const isSaved = savedIds.has(item.id);
            return (
              <div key={item.id} style={{ borderRadius: 18, padding: 12, background: "#ffffff", color: "#111", boxShadow: "0 14px 40px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", gap: 10, opacity: isSaved ? 0.5 : 1, transition: "opacity 0.4s ease" }}>
                <div style={{ borderRadius: 14, background: "#f5f5f5", padding: 10, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 180, overflow: "hidden" }}>
                  <img src={item.imageUrl} alt={item.name} style={{ maxWidth: "100%", maxHeight: 220, objectFit: "contain" }} />
                </div>

                <h3 style={{ margin: "6px 0 2px", fontSize: 15, fontWeight: 600 }}>{item.name}</h3>

                <div style={{ fontSize: 12, opacity: 0.8, display: "flex", gap: 8 }}>
                  <span>{item.category}</span><span>·</span><span>{item.aesthetic}</span>
                </div>

                <div style={{ fontSize: 12, opacity: 0.85, lineHeight: 1.6 }}>{item.stylingNotes}</div>

                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {item.colors.map((c) => (
                    <span key={c} style={{ fontSize: 11, padding: "4px 8px", borderRadius: 999, background: "#f0f0f0" }}>{c}</span>
                  ))}
                </div>

                <button
                  onClick={() => saveToWardrobe(item)}
                  disabled={isSaved}
                  style={{ marginTop: 4, padding: "8px 12px", borderRadius: 999, background: isSaved ? "#4caf50" : "#111", color: "#fff", border: "none", cursor: isSaved ? "default" : "pointer", fontSize: 13, fontWeight: 600, transition: "background 0.3s ease" }}
                >
                  {isSaved ? "✓ Saved!" : "Save to Digital Wardrobe"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}