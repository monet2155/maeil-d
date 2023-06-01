import { useEffect, useState } from "react";
import Head from "next/head";
import { getThemeList } from "@apis/themes";
import { Theme } from "src/@types/theme";

export default function ThemeListPage() {
  const [themeList, setThemeList] = useState<Theme[]>([]);

  useEffect(() => {
    getThemeList()
      .then((res) => {
        setThemeList(
          res.docs.map((data: any) => {
            return { ...data.data(), id: data.id };
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Head>
        <title>매일디</title>
        <meta name="description" content="매일디" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[1000px] flex flex-row pb-8">
        <section className=""></section>
      </main>
    </>
  );
}
