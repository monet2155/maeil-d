import Header from "@components/Header";
import { getAnalytics } from "firebase/analytics";
import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";
import { app } from "src/utils/firebase";

export default function Document() {
  useEffect(() => {
    const analytics = getAnalytics(app);
  }, []);
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
