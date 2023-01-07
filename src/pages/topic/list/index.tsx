import Header from "@components/Header";
import Head from "next/head";

export default function TopicListPage() {
  return (
    <>
      <Head>
        <title>매일디</title>
        <meta name="description" content="매일디" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div>주제 목록</div>
      </main>
    </>
  );
}
