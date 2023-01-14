import { useState, useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { getTopicList } from "@apis/topics";
import { Topic } from "src/@types/topic";

export default function DesignUploadPage() {
  const router = useRouter();
  const { topic } = router.query;

  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>(
    topic ? topic.toString() : ""
  );

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

  const onChangeTopic = (id: string) => {
    setSelectedTopic(id);
  };

  return (
    <>
      <Head>
        <title>매일디</title>
        <meta name="description" content="매일디" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <select onChange={(e) => onChangeTopic(e.target.value)}>
          <option>토픽</option>
          {topics.map((ele) => (
            <option
              key={ele.id}
              value={ele.id}
              selected={ele.id == selectedTopic}
            >
              {ele.name}
            </option>
          ))}
        </select>
      </main>
    </>
  );
}
