"use client";

import { useState } from "react";

export default function AIStylist() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setResult("");

    setTimeout(() => {
      const text = input.toLowerCase();

      let output = "Everyday look: clean minimal outfit.";

      if (text.includes("party")) {
        output = "Party look: bold statement outfit with night energy.";
      }

      if (text.includes("work")) {
        output = "Work look: structured blazer, tailored pants, clean aesthetic.";
      }

      if (text.includes("date")) {
        output = "Date look: soft elegant outfit, minimal accessories.";
      }

      if (text.includes("grunge")) {
        output += " (Grunge aesthetic)";
      }

      if (text.includes("y2k")) {
        output += " (Y2K aesthetic)";
      }

      setResult(output);
      setLoading(false);
    }, 900);
  };

  return (
    <section style={{ padding: "80px 20px", textAlign: "center" }}>
      <h2>AI Stylist</h2>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. y2k party, grunge date..."
          style={{ padding: 12, width: 300 }}
        />

        <button onClick={generate} style={{ padding: "12px 18px" }}>
          Generate
        </button>
      </div>

      {loading && <p>Styling outfit...</p>}

      {result && (
        <p style={{ marginTop: 20, opacity: 0.8 }}>
          {result}
        </p>
      )}
    </section>
  );
}