import { Barlow, Barlow_Condensed, Sour_Gummy } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import localFont from "next/font/local";

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
  title: "Wayne Gabule",
  description: "Wayne Gabule's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased relative overflow-hidden overflow-x-hidden`}
      >
        <div className="absolute w-full flex flex-col min-h-screen" style={{
          maxHeight: "100%",
          overflow: "hidden",
          gap: "40rem"
        }}>
          <img src="images/Curve_Line.svg" className="w-full" />
          <img src="images/Wave_Line.svg" className="w-full"/>
          <img src="images/Wave_Line_2.svg" className="w-full"/>
          <img src="images/Wave_Line_3.svg" className="w-full"/>
        </div>
        <img src="/images/grain.avif" className="w-screen h-screen fixed -z-50 object-cover mix-blend-normal opacity-15" />
        <div className="container mx-auto relative">
        < Header />
          {children}
        </div>
      </body>
    </html>
  );
}
