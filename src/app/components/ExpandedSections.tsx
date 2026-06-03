"use client";

import React, { useEffect, useState } from "react";

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
                    <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>Browse rentable items from this creator’s curated closet.</p>
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
                      <span>{item.price}</span>
                      <span>{item.available}</span>
                    </div>
                    <div style={{ color: "var(--accent)", fontSize: 12, marginTop: 6 }}>{item.condition}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <button onClick={() => rentNow(item.name)} style={chipStyle("#111", "#f5e0b8")}>Rent Now</button>
                      <button onClick={() => toggleWishlist(item.name)} style={chipStyle("var(--text)", wishlist.includes(item.name) ? "rgba(214,179,111,0.18)" : "rgba(255,255,255,0.06)")}>{wishlist.includes(item.name) ? "Saved" : "Save To Wishlist"}</button>
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
            <textarea value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} style={inputStyle("min-height: 72px") } placeholder="Short description" />
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

export function DiscoverPage() {
  const moods = ["Quiet Luxury", "Coquette", "Old Money", "Streetwear", "Cottagecore", "Cyber Future"];
  return (
    <section className="section-panel fade-in" style={{ padding: "0 18px 60px", maxWidth: 1180, margin: "0 auto" }}>
      <div className="glass-panel" style={{ padding: 30 }}>
        <p className="section-title">Discover</p>
        <h2 style={{ fontSize: 32, margin: "0 0 8px", color: "var(--text)" }}>AI-powered inspiration for your next look.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 18 }}>
          {moods.map((mood) => (
            <article key={mood} className="glass-card">
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.25, opacity: 0.72 }}>Trending aesthetic</div>
              <h3 style={{ fontSize: 20, margin: "8px 0 6px", color: "var(--text)" }}>{mood}</h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>Fashion boards, seasonal notes, and outfit cues designed to inspire your next saved look.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    if (Array.isArray(savedPreferences.aesthetics) && savedPreferences.aesthetics.length) {
      setSelectedAesthetics(savedPreferences.aesthetics);
    }
    if (Array.isArray(savedPreferences.colors) && savedPreferences.colors.length) {
      setSelectedColors(savedPreferences.colors);
    }
    if (Array.isArray(savedPreferences.customColors) && savedPreferences.customColors.length) {
      setCustomColors(savedPreferences.customColors);
    }
    if (typeof savedPreferences.adventurous === "number") {
      setAdventurous(savedPreferences.adventurous);
    }

    window.addEventListener("rearchive-profile-refresh", refreshCounts);
    window.addEventListener("storage", refreshCounts);
    return () => {
      window.removeEventListener("rearchive-profile-refresh", refreshCounts);
      window.removeEventListener("storage", refreshCounts);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("rearchive-profile-preferences", JSON.stringify({
      aesthetics: selectedAesthetics,
      colors: selectedColors,
      customColors,
      adventurous,
    }));
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
            <p style={{ color: "var(--muted)", lineHeight: 1.7, marginTop: 0 }}>Select what fits your style so ReArchive can personalize styling, rentals, and future recommendations.</p>

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
                  <input
                    value={customColorInput}
                    onChange={(event) => setCustomColorInput(event.target.value)}
                    onKeyDown={(event) => event.key === "Enter" && addCustomColor()}
                    placeholder="Add a custom colour or palette note"
                    style={inputStyle()}
                  />
                  <button onClick={addCustomColor} style={chipStyle("#111", "#f5e0b8")}>Save colour</button>
                </div>
                <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 8 }}>Tip: add a tone like “soft saffron” or “stormy blue” to refine future styling suggestions.</p>
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
  return {
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.10)",
    background,
    color,
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: 12,
  } as const;
}

function inputStyle(extra = "") {
  return {
    width: "100%",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    color: "var(--text)",
    padding: "10px 12px",
    fontSize: 13,
    ...(extra ? { minHeight: 72 } : {}),
  } as const;
}
