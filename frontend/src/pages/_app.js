import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "../components/Navbar.js";
export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Navbar />
      <Component {...pageProps} />{" "}
    </NextUIProvider>
  );
}
