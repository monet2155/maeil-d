import { subscribeDesignCount } from "@apis/designs";
import { getThemeList, subscribeThemeCount } from "@apis/themes";
import Header from "@components/Header";
import MainThemeItem from "@components/MainThemeItem";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Theme } from "src/@types/theme";

export default function Home() {
  const [designCount, setDesignCount] = useState(0);
  const [themeCount, setThemeCount] = useState(0);

  const [weeklyThemeList, setWeeklyThemeList] = useState<Theme[]>([]);

  useEffect(() => {
    const unsubscribeDesignCount = subscribeDesignCount((designs) => {
      setDesignCount(designs);
    });

    const unsubscribeThemeCount = subscribeThemeCount((themes) => {
      setThemeCount(themes);
    });

    getThemeList().then((res) => {
      setWeeklyThemeList(
        res.docs.map((data: any) => {
          return { ...data.data(), id: data.id };
        })
      );
    });

    return () => {
      unsubscribeDesignCount();
      unsubscribeThemeCount();
    };
  }, []);
  return (
    <>
      <Head>
        <title>매일디</title>
        <meta name="description" content="매일디" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pb-8 bg-[#fcfcfc]">
        {/* title section */}
        <section className="flex flex-col bg-[#fcfcfc] px-8 pt-8 pb-5 gap-8">
          <section className="flex flex-row items-end gap-4">
            <h1 className=" text-[64px] leading-none gap-1 tracking-[0.08em]">
              <span className="font-black ">매일</span>
              <span
                className="font-black text-[#fcfcfc]"
                style={{ WebkitTextStroke: "1px #1D1D1D" }}
              >
                새로운
              </span>
              <span className="font-black ">디</span>
              <span
                className="font-black text-[#fcfcfc]"
                style={{ WebkitTextStroke: "1px #1D1D1D" }}
              >
                자인주제
              </span>
            </h1>
            <h2 className="font-normal text-[32px] leading-none tracking-[0.04em] text-[#1d1d1d]">
              {designCount} designs and {themeCount} themes in 매일디
            </h2>
          </section>
          {/* scroll bar */}
          <section>
            <div className="bg-[#f0f0f0] w-full h-1">
              <div className="bg-[#1d1d1d] w-8 h-full" />
            </div>
          </section>
        </section>
        <section className="flex flex-row overflow-x-scroll scrollbar-hide">
          {weeklyThemeList.map((theme, index) => (
            <MainThemeItem key={theme.id} data={theme} isFocused={index == 0} />
          ))}
        </section>
      </main>
    </>
  );
}
