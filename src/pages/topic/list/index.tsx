import { useEffect, useState } from "react";
import Header from "@components/Header";
import Head from "next/head";
import { getTopicList } from "@apis/topics";
import { Topic } from "src/@types/topic";

export default function TopicListPage() {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    getTopicList().then((res) => {
      setTopics(
        res.docs.map((data: any) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
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
        <Header />
        <div>주제 목록</div>
        <div>
          <ul>
            {topics.map((topic) => (
              <li key={topic.id}>
                <div>{topic.name}</div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
