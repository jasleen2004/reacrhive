"use client";

import React, { useEffect, useMemo, useState } from "react";
import { WardrobeItem } from "./Wardrobe";

const categories = ["Outerwear", "Tops", "Bottoms", "Shoes", "Accessories"];
const aesthetics = [
  "Grunge",
  "Y2K",
  "Luxury Minimal",
  "Cyber Futuristic",
  "Streetwear",
  "Soft Editorial",
];

export default function DigitalWardrobe() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterAesthetic, setFilterAesthetic] = useState("All");

  // LOAD SAVED ITEMS
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("digitalWardrobe") || "[]");
    setItems(saved);
  }, []);

  // DELETE ITEM
  const deleteItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem("digitalWardrobe", JSON.stringify(updated));
  };

  // FILTER LOGIC
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filterCategory !== "All" && item.category !== filterCategory)
        return false;

      if (filterAesthetic !== "All" && item.aesthetic !== filterAesthetic)
        return false;

      return true;
    });
  }, [items, filterCategory, filterAesthetic]);

  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "60px auto 80px",
        padding: "0 20px",
      }}
    >
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 28,
        }}
      >
        <h1
          style={{
            fontSize: 40,
            margin: 0,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Digital Wardrobe
        </h1>

        <p
          style={{
            margin: 0,
            opacity: 0.8,
            maxWidth: 520,
            lineHeight: 1.7,
          }}
        >
          All your saved clothing pieces live here. Filter, browse, and reuse
          them to build new outfits.
        </p>
      </header>

      {/* FILTERS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          marginBottom: 18,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.5)",
              color: "inherit",
              fontSize: 13,
            }}
          >
            <option value="All">All categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={filterAesthetic}
            onChange={(e) => setFilterAesthetic(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.5)",
              color: "inherit",
              fontSize: 13,
            }}
          >
            <option value="All">All aesthetics</option>
            {aesthetics.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: 13, opacity: 0.8 }}>
          {filteredItems.length} item
          {filteredItems.length !== 1 ? "s" : ""} in view
        </div>
      </div>

      {/* GRID */}
      {filteredItems.length === 0 ? (
        <div style={{ opacity: 0.8, fontSize: 14 }}>
          No saved items yet. Go to the Upload page and save pieces.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                borderRadius: 18,
                padding: 16,
                background: "#ffffff",
                color: "#111",
                boxShadow: "0 14px 40px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                position: "relative",
              }}
            >
              {/* SMALL DUSTBIN DELETE BUTTON */}
              <button
                onClick={() => deleteItem(item.id)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 18,
                  opacity: 0.6,
                }}
                title="Delete"
              >
                🗑️
              </button>

              <h3
                style={{
                  margin: "6px 0 2px",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                {item.name}
              </h3>

              <div
                style={{
                  fontSize: 12,
                  opacity: 0.8,
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <span>{item.category}</span>
                <span>·</span>
                <span>{item.aesthetic}</span>
              </div>

              <div
                style={{
                  fontSize: 12,
                  opacity: 0.85,
                  lineHeight: 1.6,
                }}
              >
                {item.stylingNotes}
              </div>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {item.colors.map((c) => (
                  <span
                    key={c}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#e0e0e0",
                      display: "inline-block",
                    }}
                  ></span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
