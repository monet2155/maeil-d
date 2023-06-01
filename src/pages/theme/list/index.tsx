import { useState } from "react";
import Head from "next/head";
import { getThemeList } from "@apis/themes";
import { Theme } from "src/@types/theme";
import ThemeListItem from "@components/ThemeListItem";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function ThemeListPage({
  initialThemeList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [themeList, setThemeList] = useState<Theme[]>(initialThemeList);

  return (
    <>
      <Head>
        <title>매일디</title>
        <meta name="description" content="매일디" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen px-16 py-8 bg-white">
        <section>
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

export const getServerSideProps: GetServerSideProps<{
  initialThemeList: Theme[];
}> = async () => {
  const designList = await getThemeList();

  const initialThemeList = designList.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Theme[];

  return {
    props: {
      initialThemeList: JSON.parse(JSON.stringify(initialThemeList)),
    },
  };
};
