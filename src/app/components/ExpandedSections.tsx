"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell, Legend,
} from "recharts";

const wasteData = [
  { year: "2000", tonnes: 40 },
  { year: "2005", tonnes: 52 },
  { year: "2010", tonnes: 62 },
  { year: "2015", tonnes: 75 },
  { year: "2020", tonnes: 87 },
  { year: "2023", tonnes: 92 },
  { year: "2030 ▸", tonnes: 134 },
];

const emissionsSources = [
  { name: "Dyeing & Finishing", value: 36 },
  { name: "Yarn Preparation", value: 28 },
  { name: "Fibre Production", value: 15 },
  { name: "Transport", value: 11 },
  { name: "Other", value: 10 },
];

const wageData = [
  { country: "Bangladesh", minimum: 113, living: 302 },
  { country: "Cambodia", minimum: 204, living: 380 },
  { country: "Vietnam", minimum: 190, living: 360 },
  { country: "India", minimum: 140, living: 320 },
  { country: "Indonesia", minimum: 220, living: 400 },
];

const waterData = [
  { item: "1 T-Shirt", litres: 2700 },
  { item: "1 Dress", litres: 3500 },
  { item: "1 Pair Jeans", litres: 7500 },
  { item: "1 Kg Cotton", litres: 10000 },
];

const COLORS = ["#d6b36f", "#b48cc8", "#6ac89e", "#7eb8d4", "#e07b7b"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "rgba(10,11,14,0.97)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px", fontSize: 12 }}>
        <p style={{ margin: "0 0 4px", color: "rgba(245,243,238,0.5)", fontSize: 11 }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ margin: 0, color: p.color || "#f5e0b8", fontWeight: 600 }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

const labelStyle: React.CSSProperties = {
  fontSize: 11, letterSpacing: "0.42em", textTransform: "uppercase",
  color: "rgba(214,179,111,0.75)", margin: "0 0 16px", fontWeight: 600,
};
const headingStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 400,
  lineHeight: 1.2, margin: "0 0 12px", color: "#faf7ef",
};
const bodyStyle: React.CSSProperties = {
  fontSize: 14, color: "rgba(245,243,238,0.55)", lineHeight: 1.85, margin: 0,
};
const chartCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 20, padding: "32px 28px",
};
const srcStyle: React.CSSProperties = {
  fontSize: 10, color: "rgba(245,243,238,0.28)",
  letterSpacing: "0.05em", marginTop: 14,
};
const divider: React.CSSProperties = {
  height: 1, background: "linear-gradient(to right, transparent, rgba(214,179,111,0.15), transparent)",
  margin: "0 0 80px",
};

// Custom label renderer for donut chart — renders outside with a line
const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, name, value }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 28;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="rgba(245,243,238,0.65)" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={11}>
      {`${value}%`}
    </text>
  );
};

// ── OUTFIT PLANNER ─────────────────────────────────────────────────────────
export function OutfitPlannerPage() {
  const plans = [
    { date: "12 Jul", event: "Birthday Dinner", look: "Old Money Glow", notes: "Cream blazer, satin midi, gold hoops." },
    { date: "18 Aug", event: "Interview", look: "Quiet Luxury", notes: "Navy blazer, ivory blouse, loafers." },
    { date: "02 Sep", event: "Vacation", look: "Minimalist Escape", notes: "Light linen set, sunglasses, woven bag." },
  ];
  return (
    <section className="section-panel fade-in" style={{ padding: "0 18px 60px", maxWidth: 1180, margin: "0 auto" }}>
      <div className="glass-panel" style={{ padding: 30 }}>
        <p className="section-title">Outfit Planner</p>
        <h2 style={{ fontSize: 32, margin: "0 0 8px", color: "var(--text)" }}>Plan looks for every upcoming occasion.</h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.8, maxWidth: 760 }}>Select future dates, build looks from your wardrobe, and save event-ready outfits for the days that matter.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 18 }}>
          {plans.map((plan) => (
            <article key={plan.date} className="glass-card" style={{ minHeight: 160 }}>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.25, opacity: 0.72 }}>{plan.date}</div>
              <h3 style={{ fontSize: 20, margin: "8px 0 6px", color: "var(--text)" }}>{plan.event}</h3>
              <div style={{ color: "var(--accent)", fontWeight: 700, marginBottom: 6 }}>{plan.look}</div>
              <p style={{ color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{plan.notes}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── RENTAL MARKETPLACE ─────────────────────────────────────────────────────
export function RentalMarketplacePage() {
  const creators = [
    { name: "Jade Fiona", handle: "@jadeybird", aesthetic: "Quiet Luxury", bio: "Elevated feminine styling, timeless tailoring, and soft power dressing.", pieces: 24, accent: "#d6b36f" },
    { name: "Luisa Villafañe", handle: "@luisapiou", aesthetic: "Parisian Chic", bio: "Refined silhouettes, sculpted basics, and effortless city polish.", pieces: 18, accent: "#b7b0ff" },
    { name: "Madi Webb", handle: "@madiwebb", aesthetic: "Soft Editorial", bio: "Light layers, dreamy palettes, and luxury-ready everyday essentials.", pieces: 21, accent: "#ffb6d5" },
    { name: "Kiana", handle: "@kianaamn", aesthetic: "Y2K Revival", bio: "Playful textures, cool denim, and statement accessories with attitude.", pieces: 16, accent: "#7cd2ff" },
    { name: "Elianna Arvizu", handle: "@eliannaarvizu", aesthetic: "Modern Minimal", bio: "Clean lines, curated neutrals, and chic functional pieces for real life.", pieces: 19, accent: "#a8d5a2" },
  ];
  const wardrobeByCreator: Record<string, { name: string; category: string; size: string; price: string; available: string; condition: string; image: string }[]> = {
    "Jade Fiona": [
      { name: "Ivory Tailored Blazer", category: "Outerwear", size: "S / M", price: "$34/day", available: "Available now", condition: "Excellent", image: "🧥" },
      { name: "Satin Midi Dress", category: "Dresses", size: "M", price: "$28/day", available: "This weekend", condition: "Like new", image: "👗" },
      { name: "Structured Tote", category: "Accessories", size: "One size", price: "$16/day", available: "Ready to ship", condition: "Excellent", image: "👜" },
    ],
    "Luisa Villafañe": [
      { name: "Black Blazer Set", category: "Co-ord Sets", size: "S / M", price: "$39/day", available: "Available now", condition: "Excellent", image: "🖤" },
      { name: "Loafers", category: "Footwear", size: "38 / 39", price: "$18/day", available: "Instant booking", condition: "Very good", image: "👞" },
      { name: "Gold Chain Belt", category: "Accessories", size: "One size", price: "$12/day", available: "Ready to ship", condition: "Excellent", image: "🔗" },
    ],
    "Madi Webb": [
      { name: "Soft Knit Cardigan", category: "Knitwear", size: "S / M", price: "$22/day", available: "Available now", condition: "Excellent", image: "🧶" },
      { name: "Light Denim Skirt", category: "Skirts", size: "M", price: "$17/day", available: "This weekend", condition: "Very good", image: "🩳" },
      { name: "Round Sunglasses", category: "Accessories", size: "One size", price: "$10/day", available: "Instant booking", condition: "Excellent", image: "🕶️" },
    ],
    "Kiana": [
      { name: "Y2K Denim Jacket", category: "Jackets", size: "M / L", price: "$24/day", available: "Available now", condition: "Excellent", image: "🧥" },
      { name: "Graphic Top", category: "Tops", size: "S", price: "$14/day", available: "Ready to ship", condition: "Very good", image: "🖼️" },
      { name: "Chunky Loafers", category: "Footwear", size: "39", price: "$19/day", available: "This weekend", condition: "Excellent", image: "👟" },
    ],
    "Elianna Arvizu": [
      { name: "Minimal Blazer", category: "Blazers", size: "M", price: "$31/day", available: "Available now", condition: "Excellent", image: "🧥" },
      { name: "Wide-Leg Trousers", category: "Trousers", size: "M / L", price: "$23/day", available: "Ready to ship", condition: "Very good", image: "👖" },
      { name: "Leather Tote", category: "Accessories", size: "One size", price: "$15/day", available: "Instant booking", condition: "Excellent", image: "👜" },
    ],
  };
  const [activeCreator, setActiveCreator] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("rearchive-wishlist") || "[]");
    setWishlist(Array.isArray(savedWishlist) ? savedWishlist : []);
  }, []);
  const [itemName, setItemName] = useState("Oversized Beige Blazer");
  const [itemCategory, setItemCategory] = useState("Blazers");
  const [itemDescription, setItemDescription] = useState("A timeless oversized blazer with soft structure and everyday versatility.");
  const [aiDescription, setAiDescription] = useState("A sophisticated oversized blazer with timeless tailoring, perfect for workwear, networking, and elevated casual styling.");
  const generateDescription = () => {
    const base = itemDescription.trim() || "A refined statement piece with premium texture and polished wearability.";
    setAiDescription(`A ${itemCategory.toLowerCase()} inspired by ${itemName}, featuring ${base.toLowerCase()} and made for elevated, wearable styling.`);
  };
  const toggleWishlist = (name: string) => {
    setWishlist((prev) => {
      const next = prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name];
      localStorage.setItem("rearchive-wishlist", JSON.stringify(next));
      window.dispatchEvent(new Event("rearchive-profile-refresh"));
      return next;
    });
  };
  const rentNow = (name: string) => {
    const current = JSON.parse(localStorage.getItem("rearchive-rentals") || "[]");
    const next = current.includes(name) ? current : [...current, name];
    localStorage.setItem("rearchive-rentals", JSON.stringify(next));
    window.dispatchEvent(new Event("rearchive-profile-refresh"));
  };
  const publishListing = () => {
    const current = JSON.parse(localStorage.getItem("rearchive-rentals") || "[]");
    const next = current.includes(itemName) ? current : [...current, itemName];
    localStorage.setItem("rearchive-rentals", JSON.stringify(next));
    window.dispatchEvent(new Event("rearchive-profile-refresh"));
  };
  return (
    <section className="section-panel fade-in" style={{ padding: "0 18px 60px", maxWidth: 1240, margin: "0 auto" }}>
      <div className="glass-panel" style={{ padding: 30 }}>
        <p className="section-title">Rental Marketplace</p>
        <h2 style={{ fontSize: 32, margin: "0 0 8px", color: "var(--text)" }}>Rent from creator wardrobes, discover community picks, and list your own pieces.</h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.8, maxWidth: 860 }}>Curated wardrobes from fashion creators, premium rental copy, and a polished marketplace flow designed to feel like a luxury fashion platform.</p>
        <div style={{ marginTop: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <h3 style={{ margin: 0, fontSize: 20, color: "var(--text)" }}>✨ Rent From Their Wardrobe</h3>
            <button onClick={() => setActiveCreator(null)} style={chipStyle("var(--text)", "rgba(255,255,255,0.05)")}>Back to marketplace</button>
          </div>
          {!activeCreator ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 16 }}>
              {creators.map((creator) => (
                <article key={creator.handle} className="glass-card" style={{ padding: 18, borderRadius: 24, background: "rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 54, height: 54, borderRadius: 999, background: creator.accent, display: "grid", placeItems: "center", color: "#111", fontWeight: 800 }}>{creator.name.split(" ").map((part) => part[0]).join("")}</div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 18, color: "var(--text)" }}>{creator.name}</h4>
                      <div style={{ color: "var(--muted)", fontSize: 13 }}>{creator.handle}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.22, color: "var(--accent)" }}>{creator.aesthetic}</div>
                  <p style={{ color: "var(--muted)", lineHeight: 1.65, margin: "10px 0 0" }}>{creator.bio}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, color: "var(--text)", fontSize: 13 }}>
                    <span>{creator.pieces} available pieces</span>
                    <button onClick={() => setActiveCreator(creator.name)} style={chipStyle("var(--text)", "rgba(255,255,255,0.08)")}>View Wardrobe</button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ marginTop: 18, display: "grid", gap: 18 }}>
              <div className="glass-card" style={{ padding: 18, borderRadius: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <div style={{ textTransform: "uppercase", letterSpacing: 0.25, color: "var(--accent)", fontSize: 12 }}>Wardrobe</div>
                    <h3 style={{ margin: "6px 0", fontSize: 24, color: "var(--text)" }}>{activeCreator}</h3>
                    <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>Browse rentable items from this creator's curated closet.</p>
                  </div>
                  <button onClick={() => setActiveCreator(null)} style={chipStyle("var(--text)", "rgba(255,255,255,0.08)")}>Close wardrobe</button>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                {wardrobeByCreator[activeCreator]?.map((item) => (
                  <article key={item.name} className="glass-card" style={{ padding: 16, borderRadius: 24 }}>
                    <div style={{ minHeight: 92, borderRadius: 18, background: "rgba(255,255,255,0.08)", display: "grid", placeItems: "center", fontSize: 30 }}>{item.image}</div>
                    <h4 style={{ margin: "10px 0 4px", color: "var(--text)", fontSize: 18 }}>{item.name}</h4>
                    <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 6 }}>{item.category} · {item.size}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text)", fontSize: 13 }}>
                      <span>{item.price}</span><span>{item.available}</span>
                    </div>
                    <div style={{ color: "var(--accent)", fontSize: 12, marginTop: 6 }}>{item.condition}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <button onClick={() => rentNow(item.name)} style={chipStyle("#111", "#f5e0b8")}>Rent Now</button>
                      <button onClick={() => toggleWishlist(item.name)} style={chipStyle("var(--text)", wishlist.includes(item.name) ? "rgba(214,179,111,0.18)" : "rgba(255,255,255,0.06)")}>{wishlist.includes(item.name) ? "Saved" : "Save"}</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ marginTop: 28 }}>
          <h3 style={{ margin: 0, fontSize: 20, color: "var(--text)" }}>Community Rentals</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 14 }}>
            {[
              ["Trending Rentals", "Structured Linen Blazer", "$28/day", "Most saved this week"],
              ["New Arrivals", "Pearl Statement Earrings", "$12/day", "Fresh upload"],
              ["Most Rented", "Black Leather Mini Bag", "$19/day", "Booked 9 times this month"],
            ].map(([label, name, price, note]) => (
              <article key={name} className="glass-card" style={{ padding: 18, borderRadius: 24 }}>
                <div style={{ color: "var(--accent)", textTransform: "uppercase", letterSpacing: 0.25, fontSize: 12 }}>{label}</div>
                <h4 style={{ margin: "8px 0 6px", color: "var(--text)", fontSize: 18 }}>{name}</h4>
                <div style={{ color: "var(--text)", fontWeight: 700 }}>{price}</div>
                <p style={{ color: "var(--muted)", lineHeight: 1.6, marginBottom: 0 }}>{note}</p>
              </article>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 28 }}>
          <h3 style={{ margin: 0, fontSize: 20, color: "var(--text)" }}>List Your Item</h3>
          <div className="glass-card" style={{ padding: 18, borderRadius: 24, marginTop: 12, display: "grid", gap: 12 }}>
            <input value={itemName} onChange={(e) => setItemName(e.target.value)} style={inputStyle()} placeholder="Item name" />
            <input value={itemCategory} onChange={(e) => setItemCategory(e.target.value)} style={inputStyle()} placeholder="Category" />
            <textarea value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} style={{ ...inputStyle(), minHeight: 72 }} placeholder="Short description" />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={generateDescription} style={chipStyle("#111", "#f5e0b8")}>Generate AI rental description</button>
              <button onClick={publishListing} style={chipStyle("var(--text)", "rgba(255,255,255,0.06)")}>Publish Listing</button>
            </div>
            <div style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: 13 }}>{aiDescription}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── DISCOVER PAGE ──────────────────────────────────────────────────────────
export function DiscoverPage() {
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", paddingBottom: 120 }}>

      {/* HERO */}
      <div style={{ padding: "80px 24px 60px", textAlign: "center" }}>
        <p style={labelStyle}>The Real Cost of Fashion</p>
        <h1 style={{ ...headingStyle, fontSize: "clamp(2.4rem, 5vw, 3.8rem)", textAlign: "center", maxWidth: 700, margin: "0 auto 20px" }}>
          What the price tag doesn't tell you.
        </h1>
        <p style={{ ...bodyStyle, maxWidth: 580, margin: "0 auto", textAlign: "center", fontSize: 15 }}>
          Behind every £5 t-shirt is an ecosystem of environmental destruction and human exploitation. These are the numbers the industry doesn't want you to see.
        </p>
        <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, transparent, rgba(214,179,111,0.3))", margin: "40px auto 0" }} />
      </div>

      {/* HEADLINE STATS — fixed 3 columns, 3 top + 3 bottom */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20,
          overflow: "hidden",
        }}>
          {[
            { n: "10%", d: "of global carbon emissions", src: "UNEP" },
            { n: "92M", d: "tonnes of textile waste per year", src: "UNEP, 2025" },
            { n: "20%", d: "of industrial wastewater", src: "World Bank" },
            { n: "500K", d: "tonnes of microfibre in oceans yearly", src: "IUCN" },
            { n: "< 2%", d: "of garment workers earn a living wage", src: "Earth Day Org" },
            { n: "60M", d: "garment factory workers worldwide", src: "ILO" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "36px 28px",
              background: i % 2 === 0 ? "rgba(214,179,111,0.04)" : "transparent",
              borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
              borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 700, margin: "0 0 8px", color: "#f5e0b8", lineHeight: 1 }}>{s.n}</p>
              <p style={{ fontSize: 13, color: "rgba(245,243,238,0.55)", margin: "0 0 8px", lineHeight: 1.5 }}>{s.d}</p>
              <p style={{ fontSize: 10, color: "rgba(214,179,111,0.4)", margin: 0, letterSpacing: "0.05em" }}>Source: {s.src}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WASTE GROWTH */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={divider} />
        <p style={labelStyle}>Textile Waste</p>
        <h2 style={headingStyle}>Global textile waste is accelerating.</h2>
        <p style={{ ...bodyStyle, maxWidth: 580, marginBottom: 36 }}>
          The industry generated 92 million tonnes of waste in 2023. By 2030 that figure is projected to reach 134 million tonnes — a 46% increase in seven years. The Atacama Desert landfill in Chile is now visible from space.
        </p>
        <div style={chartCard}>
          <p style={{ fontSize: 11, color: "rgba(245,243,238,0.35)", margin: "0 0 20px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Textile Waste — Million Tonnes (2000–2030 projected)
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={wasteData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="year" stroke="rgba(245,243,238,0.3)" tick={{ fontSize: 11 }} />
              <YAxis stroke="rgba(245,243,238,0.3)" tick={{ fontSize: 11 }} unit="M" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="tonnes" name="Million Tonnes" radius={[4, 4, 0, 0]}>
                {wasteData.map((entry, index) => (
                  <Cell key={index} fill={entry.year.includes("▸") ? "rgba(214,179,111,0.35)" : "rgba(214,179,111,0.72)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p style={srcStyle}>Sources: UNEP 2025, Boston Consulting Group 2025, Apparel Impact Institute</p>
        </div>
      </section>

      {/* EMISSIONS — donut chart, clean labels */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={divider} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <p style={labelStyle}>Carbon Emissions</p>
            <h2 style={headingStyle}>More emissions than all flights and shipping combined.</h2>
            <p style={bodyStyle}>
              Fashion is responsible for 10% of annual global carbon emissions. The three biggest supply chain culprits — dyeing, yarn preparation and fibre production — account for 79% of the industry's pollution impact.
            </p>
            <p style={{ ...bodyStyle, marginTop: 14 }}>
              One pair of fast fashion jeans emits 16.2 kg CO₂ — equivalent to driving 58 miles. One cotton t-shirt requires 2,700 litres of water to produce.
            </p>
            {/* LEGEND BELOW COPY */}
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
              {emissionsSources.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS[i], flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "rgba(245,243,238,0.6)" }}>{s.name}</span>
                  <span style={{ fontSize: 12, color: "rgba(214,179,111,0.8)", marginLeft: "auto", fontWeight: 600 }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div style={chartCard}>
            <p style={{ fontSize: 11, color: "rgba(245,243,238,0.35)", margin: "0 0 20px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Emissions by Supply Chain Stage
            </p>
            {/* DONUT — no labels on chart, legend is beside */}
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={emissionsSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  dataKey="value"
                  paddingAngle={3}
                  label={false}
                  labelLine={false}
                >
                  {emissionsSources.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "rgba(10,11,14,0.96)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <p style={srcStyle}>Source: Quantis International / Earth.org</p>
          </div>
        </div>
      </section>

      {/* WATER */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={divider} />
        <p style={labelStyle}>Water Crisis</p>
        <h2 style={headingStyle}>Fashion is the world's second largest water polluter.</h2>
        <p style={{ ...bodyStyle, maxWidth: 600, marginBottom: 36 }}>
          The industry accounts for 20% of global industrial wastewater. Dyeing processes poison entire river systems across South and Southeast Asia. The Aral Sea — once the world's fourth largest lake — has shrunk by 90%, partly due to cotton irrigation.
        </p>
        <div style={chartCard}>
          <p style={{ fontSize: 11, color: "rgba(245,243,238,0.35)", margin: "0 0 20px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Water Required to Produce Common Garments (Litres)
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={waterData} layout="vertical" barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="rgba(245,243,238,0.3)" tick={{ fontSize: 11 }} />
              <YAxis dataKey="item" type="category" stroke="rgba(245,243,238,0.3)" tick={{ fontSize: 11 }} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="litres" name="Litres" fill="rgba(126,184,212,0.65)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p style={srcStyle}>Sources: UNECE, International Cotton Advisory Council, Earth.org</p>
        </div>
      </section>

      {/* LABOUR */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={divider} />
        <p style={labelStyle}>Labour & Human Rights</p>
        <h2 style={headingStyle}>The people making your clothes can't afford to eat.</h2>
        <p style={{ ...bodyStyle, maxWidth: 640, marginBottom: 14 }}>
          The global fashion industry employs approximately 60 million factory workers — 80% of them women. Less than 2% earn a living wage. In Bangladesh in 2023, workers striking for a wage increase from $75 to $209/month were met with violence. Four workers were killed. Over 100 were imprisoned.
        </p>
        <p style={{ ...bodyStyle, maxWidth: 640, marginBottom: 36 }}>
          Bangladesh's current minimum wage is $113/month. Labour unions say a living wage is $302/month. The Asia Floor Wage Alliance estimates it should be $450/month. Brands earning billions from these supply chains have consistently resisted price increases that would close the gap.
        </p>
        <div style={chartCard}>
          <p style={{ fontSize: 11, color: "rgba(245,243,238,0.35)", margin: "0 0 6px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Minimum Wage vs Living Wage — Major Garment-Producing Countries (USD/month)
          </p>
          <p style={{ fontSize: 11, color: "rgba(245,243,238,0.28)", margin: "0 0 24px" }}>
            The gap between what workers are paid and what they need to live is not a rounding error — it is policy.
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={wageData} barGap={4} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="country" stroke="rgba(245,243,238,0.3)" tick={{ fontSize: 11 }} />
              <YAxis stroke="rgba(245,243,238,0.3)" tick={{ fontSize: 11 }} unit="$" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "rgba(245,243,238,0.45)" }} />
              <Bar dataKey="minimum" name="Minimum Wage (USD)" fill="rgba(224,123,123,0.75)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="living" name="Living Wage (USD)" fill="rgba(106,200,158,0.75)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p style={srcStyle}>Sources: ILO, Asia Floor Wage Alliance, Cornell Global Labour Institute 2025, FEMNET</p>
        </div>
        <div style={{ marginTop: 28, padding: "28px 32px", borderRadius: 16, background: "rgba(224,123,123,0.06)", border: "1px solid rgba(224,123,123,0.15)" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(224,123,123,0.7)", margin: "0 0 10px", fontWeight: 600 }}>
            Rana Plaza — April 24, 2013
          </p>
          <p style={{ fontSize: 14, color: "rgba(245,243,238,0.7)", lineHeight: 1.8, margin: "0 0 10px" }}>
            The Rana Plaza building in Dhaka, Bangladesh collapsed killing 1,134 garment workers and injuring over 2,500. Workers had reported cracks in the building the day before and were forced back to work. The building housed factories producing for major Western brands.
          </p>
          <p style={{ fontSize: 13, color: "rgba(245,243,238,0.45)", lineHeight: 1.75, margin: 0 }}>
            It remains the deadliest garment factory accident in history. April 24th is now Fashion Revolution Day — a global campaign asking brands: <em style={{ color: "rgba(245,243,238,0.6)" }}>"Who made my clothes?"</em>
          </p>
        </div>
      </section>

      {/* WHAT REARCHIVE DOES */}
      <section style={{ padding: "0 24px 40px" }}>
        <div style={divider} />
        <p style={labelStyle}>What ReArchive Does About It</p>
        <h2 style={headingStyle}>The antidote starts with what you already own.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 36 }}>
          {[
            { icon: "♻️", title: "Reduce New Purchases", body: "Every outfit styled from your existing wardrobe is one less item produced in exploitative conditions." },
            { icon: "📦", title: "Rent, Don't Buy", body: "Our rental marketplace lets you access fashion without ownership — nothing new manufactured, nothing wasted." },
            { icon: "🧠", title: "Smarter Styling", body: "AI that makes your existing clothes feel new. The most sustainable purchase is the one you don't make." },
            { icon: "🌍", title: "Transparency First", body: "We surface the real cost of fashion so every wardrobe decision is an informed one." },
          ].map((c, i) => (
            <div key={i} style={{ padding: "28px 24px", borderRadius: 16, background: "rgba(214,179,111,0.04)", border: "1px solid rgba(214,179,111,0.1)" }}>
              <p style={{ fontSize: 24, margin: "0 0 14px" }}>{c.icon}</p>
              <h4 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 10px", color: "#faf7ef" }}>{c.title}</h4>
              <p style={{ fontSize: 12, color: "rgba(245,243,238,0.5)", lineHeight: 1.75, margin: 0 }}>{c.body}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 80 }}>
          <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, transparent, rgba(214,179,111,0.3))", margin: "0 auto 28px" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)", fontWeight: 300, fontStyle: "italic", color: "rgba(245,243,238,0.55)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 16px" }}>
            "Fashion is not just about clothing. It is about power — who has it, who makes it, and who pays the real price."
          </p>
          <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(214,179,111,0.4)" }}>ReArchive</p>
        </div>
      </section>
    </div>
  );
}

// ── PROFILE PAGE ───────────────────────────────────────────────────────────
export function ProfilePage() {
  const [selectedAesthetics, setSelectedAesthetics] = useState<string[]>(["Quiet Luxury", "Minimalist"]);
  const [selectedColors, setSelectedColors] = useState<string[]>(["Black", "Beige"]);
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [customColorInput, setCustomColorInput] = useState("");
  const [adventurous, setAdventurous] = useState(6);
  const [counts, setCounts] = useState({ looks: 0, plans: 0, rentals: 0, wishlist: 0 });
  const refreshCounts = () => {
    const savedLooks = JSON.parse(localStorage.getItem("rearchive-looks") || "[]");
    const planned = JSON.parse(localStorage.getItem("rearchive-plans") || "[]");
    const rentals = JSON.parse(localStorage.getItem("rearchive-rentals") || "[]");
    const wishlist = JSON.parse(localStorage.getItem("rearchive-wishlist") || "[]");
    setCounts({
      looks: Array.isArray(savedLooks) ? savedLooks.length : 0,
      plans: Array.isArray(planned) ? planned.length : 0,
      rentals: Array.isArray(rentals) ? rentals.length : 0,
      wishlist: Array.isArray(wishlist) ? wishlist.length : 0,
    });
  };
  useEffect(() => {
    refreshCounts();
    const savedPreferences = JSON.parse(localStorage.getItem("rearchive-profile-preferences") || "{}");
    if (Array.isArray(savedPreferences.aesthetics) && savedPreferences.aesthetics.length) setSelectedAesthetics(savedPreferences.aesthetics);
    if (Array.isArray(savedPreferences.colors) && savedPreferences.colors.length) setSelectedColors(savedPreferences.colors);
    if (Array.isArray(savedPreferences.customColors) && savedPreferences.customColors.length) setCustomColors(savedPreferences.customColors);
    if (typeof savedPreferences.adventurous === "number") setAdventurous(savedPreferences.adventurous);
    window.addEventListener("rearchive-profile-refresh", refreshCounts);
    window.addEventListener("storage", refreshCounts);
    return () => {
      window.removeEventListener("rearchive-profile-refresh", refreshCounts);
      window.removeEventListener("storage", refreshCounts);
    };
  }, []);
  useEffect(() => {
    localStorage.setItem("rearchive-profile-preferences", JSON.stringify({ aesthetics: selectedAesthetics, colors: selectedColors, customColors, adventurous }));
  }, [selectedAesthetics, selectedColors, customColors, adventurous]);
  const toggleChip = (list: string[], value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };
  const addCustomColor = () => {
    const nextColor = customColorInput.trim();
    if (!nextColor) return;
    setCustomColors((previous) => {
      const unique = Array.from(new Set([...(previous || []), nextColor]));
      setSelectedColors((current) => (current.includes(nextColor) ? current : [...current, nextColor]));
      return unique;
    });
    setCustomColorInput("");
  };
  const statCards = [
    { label: "Saved Looks", value: `${counts.looks} ${counts.looks === 1 ? "look" : "looks"}` },
    { label: "Planned Outfits", value: `${counts.plans} ${counts.plans === 1 ? "plan" : "plans"}` },
    { label: "Rental Listings", value: `${counts.rentals} ${counts.rentals === 1 ? "listing" : "listings"}` },
    { label: "Wishlist", value: `${counts.wishlist} ${counts.wishlist === 1 ? "piece" : "pieces"}` },
  ];
  return (
    <section className="section-panel fade-in" style={{ padding: "0 18px 60px", maxWidth: 1180, margin: "0 auto" }}>
      <div className="glass-panel" style={{ padding: 30 }}>
        <p className="section-title">Profile</p>
        <h2 style={{ fontSize: 32, margin: "0 0 8px", color: "var(--text)" }}>Your personal fashion identity center.</h2>
        <div style={{ display: "grid", gap: 18, marginTop: 18 }}>
          <article className="glass-card" style={{ padding: 18, borderRadius: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.25, color: "var(--accent)" }}>Current profile</div>
                <h3 style={{ fontSize: 22, margin: "6px 0", color: "var(--text)" }}>Editorial Minimalist</h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>Luxury neutral palette, elegant textures, and polished styling notes tailored to your wardrobe and preferences.</p>
              </div>
              <button style={chipStyle("var(--text)", "rgba(255,255,255,0.06)")}>Edit preferences</button>
            </div>
          </article>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {statCards.map(({ label, value }) => (
              <article key={label} className="glass-card" style={{ padding: 18, borderRadius: 24 }}>
                <div style={{ color: "var(--accent)", textTransform: "uppercase", letterSpacing: 0.25, fontSize: 12 }}>{label}</div>
                <h4 style={{ margin: "8px 0 0", color: "var(--text)", fontSize: 18 }}>{value}</h4>
              </article>
            ))}
          </div>
          <article className="glass-card" style={{ padding: 18, borderRadius: 24 }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.25, color: "var(--accent)" }}>✨ Tell us about your style</div>
            <h3 style={{ margin: "6px 0 4px", fontSize: 22, color: "var(--text)" }}>Edit Preferences</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: 0 }}>Select what fits your style so ReArchive can personalise styling, rentals, and future recommendations.</p>
            <div style={{ display: "grid", gap: 14, marginTop: 10 }}>
              <section>
                <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 0.2, color: "var(--text)", marginBottom: 8 }}>Which aesthetics describe you best?</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {['Old Money', 'Quiet Luxury', 'Minimalist', 'Streetwear', 'Y2K', 'Coquette', 'Dark Academia', 'Soft Feminine', 'Grunge'].map((item) => (
                    <button key={item} onClick={() => toggleChip(selectedAesthetics, item, setSelectedAesthetics)} style={chipStyle("var(--text)", selectedAesthetics.includes(item) ? "rgba(214,179,111,0.18)" : "rgba(255,255,255,0.06)")}>{item}</button>
                  ))}
                </div>
              </section>
              <section>
                <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 0.2, color: "var(--text)", marginBottom: 8 }}>Which colours make you feel confident?</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                  {['Black', 'White', 'Beige', 'Cream', 'Brown', 'Navy', 'Pink', 'Red', 'Olive', 'Gold', ...customColors].map((item) => (
                    <button key={item} onClick={() => toggleChip(selectedColors, item, setSelectedColors)} style={chipStyle("var(--text)", selectedColors.includes(item) ? "rgba(214,179,111,0.18)" : "rgba(255,255,255,0.06)")}>{item}</button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                  <input value={customColorInput} onChange={(e) => setCustomColorInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCustomColor()} placeholder="Add a custom colour" style={inputStyle()} />
                  <button onClick={addCustomColor} style={chipStyle("#111", "#f5e0b8")}>Save colour</button>
                </div>
              </section>
              <section>
                <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 0.2, color: "var(--text)", marginBottom: 8 }}>How adventurous are you with fashion?</div>
                <input type="range" min="1" max="10" value={adventurous} onChange={(e) => setAdventurous(Number(e.target.value))} style={{ width: "100%" }} />
                <div style={{ color: "var(--muted)", fontSize: 13 }}>Current setting: {adventurous}/10 — {adventurous <= 3 ? 'Classic and polished' : adventurous <= 7 ? 'Playful and trend-aware' : 'Experimental and bold'}</div>
              </section>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function chipStyle(color: string, background: string) {
  return { borderRadius: 999, border: "1px solid rgba(255,255,255,0.10)", background, color, padding: "8px 12px", cursor: "pointer", fontSize: 12 } as const;
}
function inputStyle() {
  return { width: "100%", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "var(--text)", padding: "10px 12px", fontSize: 13 } as const;
}