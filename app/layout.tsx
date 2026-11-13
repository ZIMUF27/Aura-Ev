import type { Metadata } from "next";
import { Prompt, Caveat } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
});

const caveat = Caveat({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Aura EV | แพลตฟอร์มรถยนต์ไฟฟ้าและบริการครบวงจร",
  description: "ตลาดซื้อ-ขายรถ EV มือสองคัดเกรด ตรวจเช็กสุขภาพแบตเตอรี่ (SoH) และหน่วยบริการ Mobile Service 24 ชม.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <body className={`${prompt.variable} ${caveat.variable} font-sans bg-[#f8fbff] text-slate-800 antialiased selection:bg-pastel-200 selection:text-pastel-900 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
