import { useState, useEffect } from "react";
import Header from "@components/Header";
import Head from "next/head";
import { Design } from "src/@types/design";
import { useRouter } from "next/router";
import { getDesignDetail } from "@apis/designs";
import { convertFigmaIframeUrl } from "@utils/figma";

export default function DesignDetailPage() {
  const [currentDesign, setCurrentDesign] = useState<Design | null>(null);

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    getDesignDetail(id.toString())
      .then((res: any) => {
        setCurrentDesign({ ...res.data(), id: res.id });
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
      <main>
        <div>
          <h1>{currentDesign?.userName}님의 디자인</h1>
          <div className="relative">
            {currentDesign?.figmaUrl && (
              <iframe
                src={convertFigmaIframeUrl(currentDesign.figmaUrl)}
                height="450"
                width="800"
              />
            )}
            <div className="h-[48px] absolute bottom-0 w-full bg-white" />
          </div>
          <h1>후기</h1>
          <div>{currentDesign?.description}</div>
        </div>
      </main>
    </>
  );
}
