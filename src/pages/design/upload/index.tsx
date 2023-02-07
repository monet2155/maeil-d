import { useState, useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { getTopicList } from "@apis/topics";
import { Topic } from "src/@types/topic";
import { uploadDesign } from "@apis/designs";
import { useAtom } from "jotai";
import { userAtom } from "@store";
import { convertFigmaIframeUrl } from "@utils/figma";

export default function DesignUploadPage() {
  const router = useRouter();
  const { topic } = router.query;

  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>(
    topic ? topic.toString() : ""
  );
  const [figmaUrl, setFigmaUrl] = useState("");
  const [description, setDescription] = useState("");
  const [user] = useAtom(userAtom);

  const [isPublic, setIsPublic] = useState(true);

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

  const onClickUpload = () => {
    if (selectedTopic == "") {
      alert("토픽을 선택해주세요.");
      return;
    }

    if (figmaUrl == "") {
      alert("Figma Url을 입력해주세요.");
      return;
    }

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    uploadDesign({
      description,
      topicId: selectedTopic,
      userId: user.uid,
      userName: user.displayName,
      figmaUrl,
      isPublic,
    })
      .then((res) => {
        alert("업로드 되었습니다.");
        console.log(res);
      })
      .catch((err) => console.log(err));
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
        <section className="flex flex-row gap-8">
          <section className="flex flex-col flex-1">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option value="">토픽</option>
              {topics.map((ele) => (
                <option key={ele.id} value={ele.id}>
                  {ele.name}
                </option>
              ))}
            </select>

            <h3>후기</h3>
            <textarea
              className="w-1/2 border"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <h3>Figma 주소</h3>
            <textarea
              className="w-1/2 border"
              value={figmaUrl}
              onChange={(e) => setFigmaUrl(e.target.value)}
            />
          </section>
          <section className="flex-1">
            <div className="relative max-h-[402px] overflow-hidden">
              미리보기
              {figmaUrl && (
                <iframe
                  src={convertFigmaIframeUrl(figmaUrl)}
                  height="450"
                  width="800"
                />
              )}
            </div>
          </section>
        </section>
        <section>
          <fieldset className="flex flex-row gap-4">
            <div>
              <label>
                <input
                  type="radio"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                공개
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  checked={!isPublic}
                  onChange={(e) => setIsPublic(!e.target.checked)}
                />
                비공개
              </label>
            </div>
          </fieldset>
        </section>

        <button className="p-5 rounded-lg shadow-lg" onClick={onClickUpload}>
          업로드
        </button>
      </main>
    </>
  );
}
