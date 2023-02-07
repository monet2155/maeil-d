import "../styles/globals.css";
import { getAnalytics } from "firebase/analytics";
import { useEffect } from "react";
import { app } from "src/utils/firebase";
import type { AppProps } from "next/app";
import Header from "@components/Header";
import Footer from "@components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const analytics = getAnalytics(app);
  }, []);

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
