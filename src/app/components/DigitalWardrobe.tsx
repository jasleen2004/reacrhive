"use client";

import React, { useEffect, useMemo, useState } from "react";
import { WardrobeItem } from "./Wardrobe";
import { getAllItems, deleteItem, saveItem } from "../lib/wardrobeDB";

const categories = ["All", "Outerwear", "Tops", "Bottoms", "Shoes", "Accessories"];
const aesthetics = ["All", "Casual", "Classic", "Trendy", "Grunge", "Y2K", "Luxury Minimal", "Quiet Luxury", "Cyber Futuristic", "Streetwear", "Soft Editorial", "Minimalist", "Sporty", "Bohemian", "Preppy"];

function normalizeCategory(category: string): string {
  const lower = category?.toLowerCase() || "";
  if (lower.includes("access") || lower.includes("jewel") || lower.includes("watch") || lower.includes("bag") || lower.includes("hat") || lower.includes("glass") || lower.includes("scarf") || lower.includes("belt")) return "Accessories";
  if (lower.includes("shoe") || lower.includes("boot") || lower.includes("sneaker") || lower.includes("heel") || lower.includes("sandal")) return "Shoes";
  if (lower.includes("top") || lower.includes("shirt") || lower.includes("blouse") || lower.includes("tee") || lower.includes("sweater") || lower.includes("knit")) return "Tops";
  if (lower.includes("bottom") || lower.includes("pant") || lower.includes("jean") || lower.includes("skirt") || lower.includes("short") || lower.includes("trouser")) return "Bottoms";
  if (lower.includes("outer") || lower.includes("jacket") || lower.includes("coat") || lower.includes("blazer")) return "Outerwear";
  return category || "Accessories";
}

const categoryColor: Record<string, string> = {
  Tops: "#dbeafe", Bottoms: "#fce7f3", Outerwear: "#d1fae5",
  Shoes: "#fef3c7", Accessories: "#ede9fe",
};

type WardrobeItemWithWears = WardrobeItem & { wears?: number };

export default function DigitalWardrobe() {
  const [items, setItems] = useState<WardrobeItemWithWears[]>([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterAesthetic, setFilterAesthetic] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllItems().then(setItems).catch(console.error);
  }, []);

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleWear = async (item: WardrobeItemWithWears) => {
    const updated = { ...item, wears: (item.wears || 0) + 1 };
    await saveItem(updated);
    setItems((prev) => prev.map((i) => i.id === item.id ? updated : i));
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const cat = normalizeCategory(item.category);
      if (filterCategory !== "All" && cat !== filterCategory) return false;
      if (filterAesthetic !== "All" && !item.aesthetic?.toLowerCase().includes(filterAesthetic.toLowerCase())) return false;
      if (search && !item.name?.toLowerCase().includes(search.toLowerCase()) && !item.colors?.join(" ").toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [items, filterCategory, filterAesthetic, search]);

  return (
    <section style={{ maxWidth: 1200, margin: "60px auto 80px", padding: "0 20px" }}>
      <header style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
        <h1 style={{ fontSize: 40, margin: 0, letterSpacing: "0.12em", textTransform: "uppercase" }}>Digital Wardrobe</h1>
        <p style={{ margin: 0, opacity: 0.8, maxWidth: 520, lineHeight: 1.7 }}>
          All your saved clothing pieces live here. Filter, search, and reuse them to build new outfits.
        </p>
      </header>

      {/* SEARCH + FILTERS */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 18, justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", flex: 1 }}>
          {/* SEARCH */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or colour…"
            style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.4)", color: "inherit", fontSize: 13, minWidth: 200, outline: "none" }}
          />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.5)", color: "inherit", fontSize: 13 }}>
            {categories.map((c) => <option key={c} value={c}>{c === "All" ? "All categories" : c}</option>)}
          </select>
          <select value={filterAesthetic} onChange={(e) => setFilterAesthetic(e.target.value)} style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.5)", color: "inherit", fontSize: 13 }}>
            {aesthetics.map((a) => <option key={a} value={a}>{a === "All" ? "All aesthetics" : a}</option>)}
          </select>
        </div>
        <div style={{ fontSize: 13, opacity: 0.6 }}>{filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}</div>
      </div>

      {/* EMPTY STATE */}
      {filteredItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 24px", opacity: 0.6 }}>
          <p style={{ fontSize: 32, marginBottom: 16 }}>🗂️</p>
          <p style={{ fontSize: 18, fontFamily: "'Cormorant Garamond', serif", marginBottom: 8 }}>
            {search || filterCategory !== "All" || filterAesthetic !== "All" ? "No items match your search." : "Your archive is empty."}
          </p>
          <p style={{ fontSize: 13, opacity: 0.7 }}>
            {search || filterCategory !== "All" || filterAesthetic !== "All" ? "Try adjusting your filters." : "Go to Archive to upload and save your first piece."}
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
          {filteredItems.map((item) => {
            const cat = normalizeCategory(item.category);
            const bgColor = categoryColor[cat] || "#f0f0f0";
            return (
              <div key={item.id} style={{ borderRadius: 16, padding: "18px 16px", background: "#ffffff", color: "#111", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: 10, position: "relative", border: "1px solid #f0f0f0", transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.14)"; e.currentTarget.style.borderColor = "rgba(214,179,111,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = "#f0f0f0"; }}
              >
                <button onClick={() => handleDelete(item.id)} style={{ position: "absolute", top: 10, right: 10, background: "transparent", border: "none", cursor: "pointer", fontSize: 15, opacity: 0.35 }} title="Delete">🗑️</button>

                <span style={{ display: "inline-block", width: "fit-content", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, background: bgColor, color: "#333" }}>
                  {cat}
                </span>

                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, lineHeight: 1.3, paddingRight: 20 }}>{item.name}</h3>

                <div style={{ fontSize: 11, opacity: 0.5, fontStyle: "italic" }}>{item.aesthetic}</div>

                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {item.colors.map((c) => (
                    <span key={c} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 999, background: "#f5f5f5", color: "#444", border: "1px solid #e8e8e8" }}>{c}</span>
                  ))}
                </div>

                {item.stylingNotes && (
                  <div style={{ fontSize: 11, opacity: 0.6, lineHeight: 1.6, borderTop: "1px solid #f0f0f0", paddingTop: 8 }}>{item.stylingNotes}</div>
                )}

                {/* WEAR TRACKER */}
                <button onClick={() => handleWear(item)} style={{ marginTop: 4, padding: "6px 10px", borderRadius: 999, background: "#f5f5f5", border: "1px solid #e8e8e8", color: "#555", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontWeight: 500, transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#ede9fe"}
                  onMouseLeave={e => e.currentTarget.style.background = "#f5f5f5"}
                >
                  👗 Worn {item.wears || 0}×
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}