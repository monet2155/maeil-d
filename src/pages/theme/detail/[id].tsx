import { useState, useEffect } from "react";
import Header from "@components/Header";
import Head from "next/head";
import { Theme } from "src/@types/theme";
import { getThemeDetail } from "@apis/themes";
import { useRouter } from "next/router";
import { getDesignListByThemeId } from "@apis/designs";
import { Design } from "src/@types/design";
import Link from "next/link";
import DesignItem from "@components/DesignItem";

export default function ThemeDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [designs, setDesigns] = useState<Design[]>([]);

  const getDesigns = () => {
    if (!id) return;
    getDesignListByThemeId(id.toString()).then((res) => {
      setDesigns(
        res.docs.map((data: any) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  };

  useEffect(() => {
    if (!id) return;
    getThemeDetail(id.toString())
      .then((res) => {
        setCurrentTheme({ ...res.data(), id: res.id } as Theme);
        getDesigns();
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <Head>
        <title>매일디</title>
        <meta name="description" content="매일디" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-5">
        <div className="flex flex-row justify-between">
          <div>
            <h1>{currentTheme?.name}</h1>
            <div>{currentTheme?.description}</div>
          </div>

          {currentTheme && (
            <Link href={`/design/upload?theme=${currentTheme.id}`}>
              <button className="p-5 rounded-lg shadow-lg">
                이 주제로 디자인 업로드 하기
              </button>
            </Link>
          )}
        </div>
        <h1>이 주제의 디자인 작업물</h1>
        <div>
          <ul className="flex flex-row flex-wrap gap-2 p-4">
            {designs.map((design) => (
              <DesignItem key={design.id} design={design} />
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
