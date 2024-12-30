import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wayne Gabule",
  description: "Wayne Gabule's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <div className="absolute w-full flex flex-col dbg" style={{
          maxHeight: "100%",
          overflow: "hidden",
          gap: "40rem"
        }}>
          <img src="images/Curve Line.svg" className="w-full" />
          <img src="images/Wave Line.svg" className="w-full"/>
          <img src="images/Wave Line 2.svg" className="w-full"/>
          <img src="images/Wave Line 3.svg" className="w-full"/>
        </div>
        <div className="container mx-auto relative">
        <Header />
        {children}
        </div>
      </body>
    </html>
  );
}
