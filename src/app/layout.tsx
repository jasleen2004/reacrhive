import "./globals.css";

export const metadata = {
  title: "Digital Wardrobe",
  description: "Analyze clothing using AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
