import { useEffect, useState } from "react";
import Header from "@components/Header";
import Head from "next/head";
import { getThemeList } from "@apis/themes";
import { Theme } from "src/@types/theme";
import Link from "next/link";

export default function ThemeListPage() {
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    getThemeList()
      .then((res) => {
        setThemes(
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
      <main>
        <div>주제 목록</div>
        <div>
          <ul className="flex flex-row flex-wrap gap-2 p-4">
            {themes.map((theme) => (
              <li key={theme.id} className="rounded-lg shadow-lg">
                <Link className="flex p-5" href={`/theme/detail/${theme.id}`}>
                  <div className="flex flex-col">
                    <h1>{theme.name}</h1>
                    <div className="my-4 h-[1px] bg-black" />
                    <div className="max-w-xs min-w-[20rem] ">
                      {theme.description}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
