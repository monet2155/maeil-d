import { useState, useEffect } from "react";
import Head from "next/head";
import { Theme } from "src/@types/theme";
import { getThemeDetail } from "@apis/themes";
import { getDesignListByThemeId } from "@apis/designs";
import { Design } from "src/@types/design";
import Link from "next/link";
import DesignItem from "@components/DesignItem";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function ThemeDetailPage({
  initialDesignList,
  currentTheme,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [designs, setDesigns] = useState<Design[]>(initialDesignList);

  const [uploaderCount, setUploaderCount] = useState(0);
  const [designCount, setDesignCount] = useState(0);

  useEffect(() => {
    const uploaderSet = new Set();
    initialDesignList.forEach((data: any) => {
      uploaderSet.add(data.uploader);
    });
    setUploaderCount(uploaderSet.size);
    setDesignCount(initialDesignList.length);
  }, [initialDesignList]);

  return (
    <>
      <Head>
        <title>매일디</title>
        <meta name="description" content="매일디" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen px-16 py-8 bg-white">
        <section className="w-full ">
          <h1 className="font-bold leading-none tracking-[0.04em] text-xl text-[#1d1d1d]">
            {currentTheme?.name}
          </h1>
          <section className="flex flex-col pt-8">
            <desc className="text-base leading-none tracking-[0.04em] flex flex-1 text-[#1d1d1d]">
              {currentTheme?.description}
            </desc>
          </section>
          <section className="flex flex-row items-center justify-between pt-16">
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
                className="py-4 px-8 rounded-lg font-bold bg-[#1D1D1D] text-white text-base leading-none tracking-[0.04em] flex items-center justify-center"
              >
                나도 디자인 해보기 &gt;
              </Link>
            )}
          </section>
          <section className="mt-8">
            <ul
              className="grid grid-cols-4 gap-9"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(336px, 1fr))",
              }}
            >
              {designs.map((design) => (
                <DesignItem key={design.id} design={design} />
              ))}
            </ul>
          </section>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  currentTheme: Theme;
  initialDesignList: Design[];
}> = async ({ query }) => {
  const currentTheme = await getThemeDetail(query.id as string);

  const designList = await getDesignListByThemeId(query.id as string);

  const initialDesignList = designList.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Design[];

  return {
    props: {
      currentTheme: JSON.parse(JSON.stringify(currentTheme.data())),
      initialDesignList: JSON.parse(JSON.stringify(initialDesignList)),
    },
  };
};
