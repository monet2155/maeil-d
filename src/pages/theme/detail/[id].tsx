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
import ThemeCard from "@components/ThemeCard";

export default function ThemeDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [designs, setDesigns] = useState<Design[]>([]);

  const [uploaderCount, setUploaderCount] = useState(0);
  const [designCount, setDesignCount] = useState(0);

  const getDesigns = () => {
    if (!id) return;
    getDesignListByThemeId(id.toString()).then((res) => {
      const uploaderSet = new Set();
      setDesigns(
        res.docs.map((data: any) => {
          uploaderSet.add(data.data().uploader);
          return { ...data.data(), id: data.id };
        })
      );
      setUploaderCount(uploaderSet.size);
      setDesignCount(res.docs.length);
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
      <main className="min-h-[1000px] flex flex-row pb-8">
        <ThemeCard
          selectedTheme={currentTheme}
          uploaderCount={uploaderCount}
          designCount={designCount}
        />
        <section className="w-full ">
          <h1 className="h-[55px] bg-[#1d1d1d] pl-6 flex items-center text-white font-bold text-2xl leading-none tracking-[0.04em]">
            {currentTheme?.name}
          </h1>
          <section className="p-6 h-[216px] max-h-[216px] flex flex-col">
            <desc className="text-base leading-none tracking-[0.04em] flex flex-1 text-[#1d1d1d]">
              {currentTheme?.description}
            </desc>
            <div className="flex flex-row items-baseline gap-4">
              <h2 className="font-bold leading-none tracking-[0.04em] text-xl text-[#1d1d1d]">
                현재 이 주제의 디자인 작업물
              </h2>
              <h3 className="leading-none tracking-[0.02em] text-base text-[#1d1d1d]">
                현재 제출자 {uploaderCount > 99 ? "99+" : uploaderCount}명
              </h3>
              <h3 className="leading-none tracking-[0.02em] text-base text-[#1d1d1d]">
                현재 등록된 디자인 {designCount > 99 ? "99+" : designCount}개
              </h3>
            </div>
            {currentTheme && (
              <Link
                href={`/design/upload?theme=${currentTheme.id}`}
                className="h-[56px] mt-6 font-bold text-white text-base leading-none tracking-[0.04em] flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(90.51deg, #1D1D1D 0%, rgba(29, 29, 29, 0.81) 100%)",
                }}
              >
                나도 디자인 해보기 &gt;
              </Link>
            )}
          </section>
          <section className="relative h-[729px]">
            <ul className=" grid grid-cols-2 p-6 border-t border-[#1d1d1d] gap-6 max-h-[729px] overflow-auto scrollbar-hide">
              {designs.map((design) => (
                <DesignItem key={design.id} design={design} />
              ))}
            </ul>
            {/* {designCount > 1 && (
              <div
                className="absolute bottom-0 w-full h-8"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.2) 100%)",
                }}
              />
            )} */}
          </section>
        </section>
      </main>
    </>
  );
}
