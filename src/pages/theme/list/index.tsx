import { useEffect, useState } from "react";
import Head from "next/head";
import { getThemeList } from "@apis/themes";
import { Theme } from "src/@types/theme";
import ThemeListItem from "@components/ThemeListItem";

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
      <main className="min-h-screen px-16 py-8 bg-white">
        <section className="">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr>
                <th className="p-2 border w-36">주제 코드</th>
                <th className="p-2 border">주제 제목</th>
                <th className="p-2 border w-36">디자인 수</th>
              </tr>
            </thead>
            <tbody>
              {themeList.map((theme) => (
                <ThemeListItem key={theme.id} theme={theme} />
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
