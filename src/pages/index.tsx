import { subscribeDesignCount } from "@apis/designs";
import { getThemeList, subscribeThemeCount } from "@apis/themes";
import Header from "@components/Header";
import MainThemeItem from "@components/MainThemeItem";
import SignatureToken from "@components/SignatureToken";
import cn from "classnames";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Theme } from "src/@types/theme";

export default function Home() {
  const [designCount, setDesignCount] = useState(0);
  const [themeCount, setThemeCount] = useState(0);

  const [weeklyThemeList, setWeeklyThemeList] = useState<Theme[]>([]);

  const themeListRef = useRef<HTMLDivElement>(null);
  const [scrollBarPosition, setScrollBarPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollBarWidth, setScrollBarWidth] = useState(-1);

  useEffect(() => {
    const unsubscribeDesignCount = subscribeDesignCount((designs) => {
      setDesignCount(designs);
    });

    const unsubscribeThemeCount = subscribeThemeCount((themes) => {
      setThemeCount(themes);
    });

    getThemeList().then((res) => {
      setWeeklyThemeList(
        res.docs
          .slice(0, Math.floor(res.docs.length / 3) * 3)
          .map((data: any) => {
            return { ...data.data(), id: data.id };
          })
      );
    });

    return () => {
      unsubscribeDesignCount();
      unsubscribeThemeCount();
    };
  }, []);

  useEffect(() => {
    if (!themeListRef.current) return;

    themeListRef.current.onwheel = (e) => {
      if (e.shiftKey) {
        e.preventDefault();
      }
    };

    themeListRef.current.onscroll = (e) => {
      const target = e.target as HTMLDivElement;

      let newPercentage =
        (target.scrollLeft / (target.scrollWidth - target.clientWidth)) * 100;

      if (scrollBarWidth === -1) {
        setScrollBarWidth(window.innerWidth - target.clientWidth);
      }

      if (newPercentage === 0 || target.scrollLeft % 640 === 0) {
        setIsScrolling(false);
      }

      newPercentage -= (32 / target.clientWidth) * 100;

      setScrollBarPosition(newPercentage < 0 ? 0 : newPercentage);
    };

    return () => {
      if (!themeListRef.current) return;

      themeListRef.current.onwheel = null;
      themeListRef.current.onscroll = null;
    };
  }, [themeListRef, scrollBarWidth]);

  const onClickScrollButton = (direction: "left" | "right") => {
    if (!themeListRef.current || isScrolling) return;

    const target = themeListRef.current;

    let scrollAmount = 640 * 3;
    if (target.scrollLeft === (weeklyThemeList.length - 5) * 640) {
      scrollAmount -= scrollBarWidth;
    }
    setIsScrolling(true);

    if (direction === "left") {
      target.scroll({
        left: target.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    } else {
      target.scroll({
        left: target.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
        <section className="flex flex-col bg-[#fcfcfc] ">
          <section className="flex flex-row items-center gap-8 px-8 my-2 ">
            <SignatureToken
              type="cross"
              alt="main title icon"
              width="12"
              height="12"
            />
            <h1 className="text-[#1d1d1d] text-[24px] font-bold leading-none tracking-[0.08em]">
              매일 새로운 디자인 주제
            </h1>
            <SignatureToken
              type="cross"
              alt="main title icon"
              width="12"
              height="12"
            />
            <h2 className="text-[#1d1d1d] text-[24px] font-medium leading-none tracking-[0.04em]">
              {designCount} designs and {themeCount} themes in 매일디
            </h2>
            <SignatureToken
              type="cross"
              alt="main title icon"
              width="12"
              height="12"
            />
            <Link
              href="/theme/list"
              className="text-[#1d1d1d] text-[24px] font-bold leading-none tracking-[0.04em] underline"
            >
              주제 목록으로 이동&gt;
            </Link>
          </section>
          {/* scroll bar */}
          <section>
            <div
              className="bg-[#f0f0f0] h-1 w-full"
              style={{
                paddingLeft: `${scrollBarPosition}%`,
              }}
            >
              <div className="bg-[#1d1d1d] w-8 h-full" />
            </div>
          </section>
        </section>
        <section className="relative">
          <section
            className="flex flex-row overflow-x-scroll scrollbar-hide"
            ref={themeListRef}
          >
            {weeklyThemeList.map((theme, index) => (
              <MainThemeItem key={theme.id} data={theme} />
            ))}
          </section>
          <button
            className={cn(
              `absolute flex items-center justify-center w-20 h-40 
              bg-white text-[32px] leading-none tracking-[0.04em] 
              font-bold text-[#1d1d1d] top-[50%] left-0 transform -translate-y-1/2`,
              { "text-[#c4c4c4]": scrollBarPosition == 0 }
            )}
            disabled={scrollBarPosition == 0}
            onClick={() => onClickScrollButton("left")}
          >
            &lt;
          </button>
          <button
            className={cn(
              `absolute flex items-center justify-center w-20 h-40 
              bg-white text-[32px] leading-none tracking-[0.04em] 
              font-bold text-[#1d1d1d] top-[50%]  right-0  transform -translate-y-1/2`,
              { "text-[#c4c4c4]": scrollBarPosition >= 95 }
            )}
            disabled={scrollBarPosition >= 95}
            onClick={() => onClickScrollButton("right")}
          >
            &gt;
          </button>
        </section>
      </main>
    </>
  );
}
