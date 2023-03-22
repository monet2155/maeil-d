import { useState, useEffect } from "react";
import Header from "@components/Header";
import Head from "next/head";
import { Design } from "src/@types/design";
import { useRouter } from "next/router";
import { getDesignDetail } from "@apis/designs";
import { convertFigmaIframeUrl } from "@utils/figma";
import { User } from "src/@types/user";
import { getUserDetail } from "@apis/users";

export default function DesignDetailPage() {
  const [currentDesign, setCurrentDesign] = useState<Design | null>(null);
  const [designOwner, setDesignOwner] = useState<User | null>(null);

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

  useEffect(() => {
    if (!currentDesign) return;

    getUserDetail(currentDesign.userId)
      .then((res: any) => {
        setDesignOwner({ ...res.data(), id: res.id });
      })
      .catch((err) => console.log(err));
  }, [currentDesign]);

  const onClickReport = () => {};

  return (
    <>
      <Head>
        <title>매일디</title>
        <meta name="description" content="매일디" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-3">
        <h1>{designOwner?.displayName}님의 디자인</h1>
        <section className="relative max-h-[402px] overflow-hidden">
          {currentDesign?.figmaUrl && (
            <iframe
              src={convertFigmaIframeUrl(currentDesign.figmaUrl)}
              height="450"
              width="800"
            />
          )}
        </section>
        <h1>후기</h1>
        <section>{currentDesign?.description}</section>
        <section className="my-4">
          <button onClick={onClickReport} className="p-4 shadow-lg">
            신고하기
          </button>
        </section>
      </main>
    </>
  );
}
