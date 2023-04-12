import { useEffect, useState } from "react";
import Head from "next/head";
import { getThemeList } from "@apis/themes";
import { Theme } from "src/@types/theme";
import { getDesignListByThemeId } from "@apis/designs";
import cn from "classnames";
import Link from "next/link";

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
          className="min-w-[1280px] bg-cover bg-center bg-no-repeat p-8"
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
        <section className="max-h-[1000px] w-full overflow-auto scrollbar-hide">
          {themeList.map((theme, index) => (
            <>
              {selectedTheme?.id !== theme.id ? (
                <div
                  key={theme.id}
                  className={cn(
                    "h-[128px] p-6 border-t border-[#1d1d1d] cursor-pointer",
                    {
                      "border-b": index === themeList.length - 1,
                    }
                  )}
                  onClick={() => setSelectedTheme(theme)}
                >
                  <h1 className=" font-bold text-[24px] leading-none tracking-[0.04em] text-[#1d1d1d]">
                    {theme.name}
                  </h1>
                  <h3 className="mt-2 text-[16px] leading-normal tracking-[0.04em] text-[#1d1d1d]">
                    {theme.description}
                  </h3>
                </div>
              ) : (
                <Link
                  key={theme.id}
                  className="h-[128px] bg-[#1d1d1d] cursor-pointer flex items-center justify-center"
                  href={`/theme/detail/${theme.id}`}
                >
                  <h1 className="text-white font-bold text-[24px] leading-none tracking-[0.04em]">
                    상세 확인 &gt;
                  </h1>
                </Link>
              )}
            </>
          ))}
        </section>
      </main>
    </>
  );
}
