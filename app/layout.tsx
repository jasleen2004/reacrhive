import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ReArchive",
  description:
    "AI-powered sustainable fashion platform with digital wardrobe, AI styling, and circular fashion marketplace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>ReArchive</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#000",
        }}
      >
        {children}
      </body>
    </html>
  );
}