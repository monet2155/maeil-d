import { useEffect, useState } from "react";
import Header from "@components/Header";
import Head from "next/head";
import { getThemeList } from "@apis/themes";
import { Theme } from "src/@types/theme";
import Link from "next/link";
import { getDesignListByThemeId } from "@apis/designs";

export default function ThemeListPage() {
  const [themeList, setThemeList] = useState<Theme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const [uploaderCount, setUploaderCount] = useState(0);
  const [designCount, setDesignCount] = useState(0);

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

  useEffect(() => {
    if (themeList.length > 0) {
      setSelectedTheme(themeList[0]);
    }
  }, [themeList]);

  useEffect(() => {
    if (!selectedTheme) return;
    getDesignListByThemeId(selectedTheme.id).then((res) => {
      const uploaderSet = new Set();
      res.docs.forEach((doc) => {
        uploaderSet.add(doc.data().uploader);
      });
      setUploaderCount(uploaderSet.size);
      setDesignCount(res.docs.length);
    });
  }, [selectedTheme]);

  return (
    <>
      <Head>
        <title>매일디</title>
        <meta name="description" content="매일디" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-[1000px] flex flex-row pb-8">
        <section
          className="w-[1280px] bg-cover bg-center bg-no-repeat p-8"
          style={{
            backgroundImage: `url(${
              selectedTheme ? selectedTheme.thumbnailUrl : ""
            })`,
          }}
        >
          <h1 className="text-white font-bold text-[40px] leading-none tracking-[0.02em]">
            {selectedTheme?.name}
          </h1>
          <h2 className="text-white text-[20px] leading-none tracking-[0.02em] my-2">
            현재 제출자 {uploaderCount}명
          </h2>
          <h2 className="text-white text-[20px] leading-none tracking-[0.02em]">
            현재 등록된 디자인 {designCount > 99 ? "99+" : designCount} 개
          </h2>
          <h3 className="text-white text-[24px] leading-normal tracking-[0.04em] max-w-[691px] mt-4">
            {selectedTheme?.description}
          </h3>
        </section>
      </main>
    </>
  );
}
