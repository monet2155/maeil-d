import { useState, useEffect } from "react";
import Header from "@components/Header";
import Head from "next/head";
import { Topic } from "src/@types/topic";
import { getTopicDetail } from "@apis/topics";
import { useRouter } from "next/router";
import { getDesignListByTopicId } from "@apis/designs";
import { Design } from "src/@types/design";
import Link from "next/link";

export default function TopicDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [designs, setDesigns] = useState<Design[]>([]);

  const getDesigns = () => {
    if (!id) return;
    getDesignListByTopicId(id.toString()).then((res) => {
      setDesigns(
        res.docs.map((data: any) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  };

  useEffect(() => {
    if (!id) return;
    getTopicDetail(id.toString())
      .then((res) => {
        setCurrentTopic(res.data() as Topic);
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
            <h1>{currentTopic?.name}</h1>
            <div>{currentTopic?.description}</div>
          </div>
          <Link href="/design/upload">
            <button className="p-5 rounded-lg shadow-lg">
              이 주제로 디자인 업로드 하기
            </button>
          </Link>
        </div>
        <h1>이 주제의 디자인 작업물</h1>
        <div>
          <ul className="flex flex-row flex-wrap gap-2 p-4">
            {designs.map((design) => (
              <li
                key={design.id}
                className="flex flex-col rounded-lg shadow-lg"
              >
                <Link className="p-5" href={`/design/detail/${design.id}`}>
                  <div>{design.userName}</div>
                  <div>{design.description}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
