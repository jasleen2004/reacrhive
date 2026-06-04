"use client";

import React, { useEffect, useState } from "react";

type SavedLook = { id: string; title: string; description?: string };
type PlannedDay = { lookId: string; lookTitle: string; occasion?: string };
type PlannerData = Record<string, PlannedDay>;

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function OutfitPlannerPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [planner, setPlanner] = useState<PlannerData>({});
  const [savedLooks, setSavedLooks] = useState<SavedLook[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [pickingLook, setPickingLook] = useState(false);

  // Step 1: choose a look, Step 2: name the occasion, Step 3: confirm
  const [selectedLook, setSelectedLook] = useState<SavedLook | null>(null);
  const [occasionInput, setOccasionInput] = useState("");
  const [step, setStep] = useState<"pick" | "confirm">("pick");

  useEffect(() => {
    const looks = JSON.parse(localStorage.getItem("rearchive-looks") || "[]");
    setSavedLooks(Array.isArray(looks) ? looks : []);
    const saved = JSON.parse(localStorage.getItem("rearchive-planner") || "{}");
    setPlanner(saved);
  }, []);

  const savePlanner = (updated: PlannerData) => {
    setPlanner(updated);
    localStorage.setItem("rearchive-planner", JSON.stringify(updated));
  };

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (y: number, m: number) => new Date(y, m, 1).getDay();

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const dateKey = (day: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const openPicker = (day: number) => {
    setSelectedDay(day);
    setPickingLook(true);
    setStep("pick");
    setSelectedLook(null);
    setOccasionInput("");
  };

  const handleSelectLook = (look: SavedLook) => {
    setSelectedLook(look);
    setStep("confirm");
  };

  const handleConfirm = () => {
    if (!selectedLook || selectedDay === null) return;
    const key = dateKey(selectedDay);
    const updated = {
      ...planner,
      [key]: {
        lookId: selectedLook.id,
        lookTitle: selectedLook.title,
        occasion: occasionInput.trim() || undefined,
      },
    };
    savePlanner(updated);
    setPickingLook(false);
    setSelectedDay(null);
    setSelectedLook(null);
    setOccasionInput("");
    setStep("pick");
  };

  const handleCancel = () => {
    setPickingLook(false);
    setSelectedDay(null);
    setSelectedLook(null);
    setOccasionInput("");
    setStep("pick");
  };

  const removeFromDay = (day: number) => {
    const key = dateKey(day);
    const updated = { ...planner };
    delete updated[key];
    savePlanner(updated);
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);
  const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  while (cells.length % 7 !== 0) cells.push(null);

  const isToday = (day: number) => day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <section style={{ maxWidth: 1100, margin: "60px auto 80px", padding: "0 20px" }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 40, margin: "0 0 8px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Outfit Planner</h1>
        <p style={{ margin: 0, opacity: 0.7, lineHeight: 1.7 }}>Pin saved looks to dates. Plan ahead, never wonder what to wear.</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>

        {/* CALENDAR */}
        <div style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: 24 }}>

          {/* MONTH NAV */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <button onClick={prevMonth} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "8px 14px", color: "inherit", cursor: "pointer", fontSize: 14 }}>←</button>
            <h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, letterSpacing: "0.08em" }}>
              {MONTHS[month]} {year}
            </h2>
            <button onClick={nextMonth} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "8px 14px", color: "inherit", cursor: "pointer", fontSize: 14 }}>→</button>
          </div>

          {/* DAY HEADERS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
            {DAYS.map((d) => (
              <div key={d} style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.4, padding: "4px 0" }}>{d}</div>
            ))}
          </div>

          {/* CALENDAR GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const key = dateKey(day);
              const planned = planner[key];
              const selected = selectedDay === day && pickingLook;
              return (
                <div key={i}
                  onClick={() => openPicker(day)}
                  style={{
                    minHeight: 72, borderRadius: 12, padding: 8, cursor: "pointer",
                    background: selected ? "rgba(214,179,111,0.12)" : planned ? "rgba(106,200,158,0.08)" : "rgba(255,255,255,0.02)",
                    border: selected ? "1px solid rgba(214,179,111,0.5)" : isToday(day) ? "1px solid rgba(214,179,111,0.3)" : "1px solid rgba(255,255,255,0.05)",
                    transition: "all 0.2s ease",
                    position: "relative",
                  }}
                  onMouseEnter={e => { if (!selected) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={e => { if (!selected) e.currentTarget.style.background = planned ? "rgba(106,200,158,0.08)" : "rgba(255,255,255,0.02)"; }}
                >
                  <div style={{ fontSize: 12, fontWeight: isToday(day) ? 700 : 400, color: isToday(day) ? "rgba(214,179,111,0.9)" : "inherit", marginBottom: 4 }}>{day}</div>
                  {planned && (
                    <>
                      <div style={{ fontSize: 10, color: "rgba(106,200,158,0.9)", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{planned.lookTitle}</div>
                      {planned.occasion && <div style={{ fontSize: 9, color: "rgba(214,179,111,0.7)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{planned.occasion}</div>}
                      <button onClick={(e) => { e.stopPropagation(); removeFromDay(day); }} style={{ position: "absolute", top: 4, right: 4, background: "transparent", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 10, cursor: "pointer", padding: 2 }}>×</button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* LOOK PICKER PANEL */}
          {pickingLook && selectedDay !== null && (
            <div style={{ borderRadius: 20, border: "1px solid rgba(214,179,111,0.2)", background: "rgba(10,11,14,0.92)", padding: 20 }}>

              {/* STEP 1 — PICK A LOOK */}
              {step === "pick" && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#f9f7f1" }}>
                      Pick a look for {MONTHS[month]} {selectedDay}
                    </p>
                    <button onClick={handleCancel} style={{ background: "transparent", border: "none", color: "inherit", opacity: 0.5, cursor: "pointer", fontSize: 16 }}>×</button>
                  </div>
                  {savedLooks.length === 0 ? (
                    <p style={{ fontSize: 12, opacity: 0.6, margin: 0 }}>No saved looks yet. Generate and save a look from AI Styling first.</p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {savedLooks.map((look) => (
                        <button key={look.id} onClick={() => handleSelectLook(look)}
                          style={{ textAlign: "left", padding: "10px 14px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "inherit", cursor: "pointer", fontSize: 13, transition: "background 0.2s" }}
                          onMouseEnter={e => e.currentTarget.style.background = "rgba(214,179,111,0.08)"}
                          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                        >
                          {look.title}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* STEP 2 — NAME OCCASION + CONFIRM */}
              {step === "confirm" && selectedLook && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#f9f7f1" }}>Confirm for {MONTHS[month]} {selectedDay}</p>
                    <button onClick={handleCancel} style={{ background: "transparent", border: "none", color: "inherit", opacity: 0.5, cursor: "pointer", fontSize: 16 }}>×</button>
                  </div>

                  {/* SELECTED LOOK */}
                  <div style={{ padding: "10px 14px", borderRadius: 12, background: "rgba(106,200,158,0.08)", border: "1px solid rgba(106,200,158,0.2)", marginBottom: 14 }}>
                    <p style={{ margin: 0, fontSize: 11, color: "rgba(106,200,158,0.8)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Selected look</p>
                    <p style={{ margin: 0, fontSize: 13, color: "#f9f7f1", fontWeight: 500 }}>{selectedLook.title}</p>
                  </div>

                  {/* OCCASION INPUT */}
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ margin: "0 0 8px", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5 }}>Occasion (optional)</p>
                    <input
                      value={occasionInput}
                      onChange={(e) => setOccasionInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
                      placeholder="e.g. Birthday dinner, Job interview…"
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "inherit", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>

                  {/* ACTION BUTTONS */}
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={handleConfirm} style={{ flex: 1, padding: "11px", borderRadius: 12, background: "rgba(214,179,111,0.15)", border: "1px solid rgba(214,179,111,0.35)", color: "#f5e0b8", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(214,179,111,0.25)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(214,179,111,0.15)"}
                    >
                      ✓ Pin to {MONTHS[month].slice(0, 3)} {selectedDay}
                    </button>
                    <button onClick={() => setStep("pick")} style={{ padding: "11px 14px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "inherit", fontSize: 13, cursor: "pointer" }}>
                      ←
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* UPCOMING THIS MONTH */}
          <div style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: 20 }}>
            <p style={{ margin: "0 0 14px", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5 }}>This Month</p>
            {Object.entries(planner).filter(([k]) => k.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)).length === 0 ? (
              <p style={{ fontSize: 12, opacity: 0.5, margin: 0 }}>No looks planned yet. Click a date to add one.</p>
            ) : (
              Object.entries(planner)
                .filter(([k]) => k.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`))
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([key, val]) => {
                  const day = parseInt(key.split("-")[2]);
                  return (
                    <div key={key} style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <span style={{ fontSize: 11, opacity: 0.4, display: "block", marginBottom: 2 }}>{MONTHS[month].slice(0, 3)} {day}</span>
                          <span style={{ fontSize: 13 }}>{val.lookTitle}</span>
                          {val.occasion && <span style={{ display: "block", fontSize: 11, color: "rgba(214,179,111,0.7)", marginTop: 2 }}>{val.occasion}</span>}
                        </div>
                        <button onClick={() => removeFromDay(day)} style={{ background: "transparent", border: "none", color: "inherit", opacity: 0.3, cursor: "pointer", fontSize: 14, flexShrink: 0 }}>×</button>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}