import "../styles/globals.css";
import { getAnalytics } from "firebase/analytics";
import { useEffect } from "react";
import { app } from "src/utils/firebase";
import type { AppProps } from "next/app";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const analytics = getAnalytics(app);
  }, []);

  return (
    <>
      {!router.pathname.includes("error") && <Header />}
      <Component {...pageProps} />
      {!router.pathname.includes("error") && <Footer />}
    </>
  );
}
