import "../styles/globals.css";
import { getAnalytics } from "firebase/analytics";
import { useEffect } from "react";
import { app } from "src/utils/firebase";
import type { AppContext, AppProps } from "next/app";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { useRouter } from "next/router";
import { getUserDetail } from "@apis/users";
import { User } from "src/@types/user";
import { useAtom } from "jotai";
import { userAtom } from "@store";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { userData } = pageProps as { userData: User | undefined };
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (!user && userData) {
      setUser(userData);
    }
  }, [user, setUser, userData]);

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

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (ctx.req && ctx.req.headers.cookie) {
    const cookies = ctx.req.headers.cookie;
    const [, splitedCookie] = cookies.split("uid=");
    if (splitedCookie) {
      const uid = splitedCookie.split(";")[0];

      const userDoc = await getUserDetail(uid);
      if (userDoc.exists()) {
        const userData = {
          uid: userDoc.id,
          ...userDoc.data(),
        };
        pageProps = { ...pageProps, userData };
      }
    }
  }

  return { pageProps };
};

export default App;
