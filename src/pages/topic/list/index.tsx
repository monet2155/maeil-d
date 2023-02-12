import { useEffect, useState } from "react";
import Header from "@components/Header";
import Head from "next/head";
import { getTopicList } from "@apis/topics";
import { Topic } from "src/@types/topic";
import Link from "next/link";

export default function TopicListPage() {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    getTopicList()
      .then((res) => {
        setTopics(
          res.docs.map((data: any) => {
            return { ...data.data(), id: data.id };
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Head>
        <title>매일디</title>
        <meta name="description" content="매일디" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>주제 목록</div>
        <div>
          <ul className="flex flex-row flex-wrap gap-2 p-4">
            {topics.map((topic) => (
              <li key={topic.id} className="rounded-lg shadow-lg">
                <Link className="flex p-5" href={`/topic/detail/${topic.id}`}>
                  <div className="flex flex-col">
                    <h1>{topic.name}</h1>
                    <div className="my-4 h-[1px] bg-black" />
                    <div className="max-w-xs min-w-[20rem] ">
                      {topic.description}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
