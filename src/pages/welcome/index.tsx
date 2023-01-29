import { createUser } from "@apis/users";
import { userAtom } from "@store";
import { useAtom } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MyPage() {
  const router = useRouter();

  const [, setUser] = useAtom(userAtom);
  const [displayName, setDisplayName] = useState("");

  const onClickSubmit = () => {
    if (displayName == "") {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (!router.query.uid) {
      return;
    }

    let uid = router.query.uid.toString();

    createUser(router.query.uid.toString(), displayName)
      .then((result) => {
        setUser({
          uid,
          displayName: displayName,
        });
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
        <section>환영합니다!</section>
        <section className="flex flex-col mt-4">
          매일디에서 사용할 닉네임을 설정해주세요.
          <input
            type="text"
            className="w-1/2 border"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </section>
        <button onClick={onClickSubmit}>확인</button>
      </main>
    </>
  );
}
