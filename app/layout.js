import { Barlow, Barlow_Condensed, Sour_Gummy } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Header from "./components/header";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const sourGummy = Sour_Gummy({
  variable: "--font-sour-gummy",
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: "Wen Portfolio",
  description: "Wen's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased relative`}
      >
        <div className="absolute w-full flex flex-col min-h-screen" style={{
          maxHeight: "100%",
          overflow: "hidden",
          gap: "40rem"
        }}>
          <Image src="/images/Curve_Line.svg" alt="" width={1200} height={200} className="w-full" unoptimized />
          <Image src="/images/Wave_Line.svg" alt="" width={1200} height={200} className="w-full" unoptimized />
          <Image src="/images/Wave_Line_2.svg" alt="" width={1200} height={200} className="w-full" unoptimized />
          <Image src="/images/Wave_Line_3.svg" alt="" width={1200} height={200} className="w-full" unoptimized />
        </div>
        <Image src="/images/grain.avif" alt="" fill className="w-screen h-screen fixed -z-50 object-cover mix-blend-normal opacity-15 dark:opacity-5 select-none" unoptimized />
        <div className="mx-auto relative">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
