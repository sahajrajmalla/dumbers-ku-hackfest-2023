import Navbar from "@/components/layout/Navbar/Navbar";
import "@/styles/globals.css";

import { Oxygen, Montserrat } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import Footer from "@/components/layout/footer/Footer";

const oxygen = Oxygen({
  subsets: ["latin"],
  variable: "--font-oxygen",
  weight: ["400", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${oxygen.variable} ${montserrat.variable}`}>
      <Navbar />
      <Component {...pageProps} />{" "}
      <Footer />
    </div>
  );
}
