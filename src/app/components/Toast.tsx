"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

type Toast = { id: string; message: string; type: "success" | "error" | "info" };
type ToastContextType = { toast: (message: string, type?: Toast["type"]) => void };

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function useToast() { return useContext(ToastContext); }

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const icons = { success: "✓", error: "✕", info: "✦" };
  const colors = {
    success: "rgba(106,200,158,0.15)",
    error: "rgba(224,123,123,0.15)",
    info: "rgba(214,179,111,0.15)",
  };
  const borderColors = {
    success: "rgba(106,200,158,0.3)",
    error: "rgba(224,123,123,0.3)",
    info: "rgba(214,179,111,0.3)",
  };
  const iconColors = {
    success: "#6ac89e",
    error: "#e07b7b",
    info: "#d6b36f",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999, display: "flex", flexDirection: "column", gap: 10, pointerEvents: "none" }}>
        {toasts.map((t) => (
          <div key={t.id} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "12px 18px",
            borderRadius: 14,
            background: colors[t.type],
            border: `1px solid ${borderColors[t.type]}`,
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.24)",
            fontSize: 13,
            color: "#f5f3ee",
            fontWeight: 500,
            animation: "slideInToast 0.3s ease",
            minWidth: 220,
            maxWidth: 360,
          }}>
            <span style={{ color: iconColors[t.type], fontWeight: 700, fontSize: 14 }}>{icons[t.type]}</span>
            {t.message}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideInToast {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}