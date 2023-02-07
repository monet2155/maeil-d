import Header from "@components/Header";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>매일디</title>
        <meta name="description" content="매일디" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-[80vh]">
        <div>매일디에 오신 것을 환영합니다.</div>
      </main>
    </>
  );
}
