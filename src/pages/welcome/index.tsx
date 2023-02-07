import { createUser } from "@apis/users";
import { userAtom } from "@store";
import { useAtom } from "jotai";
import Head from "next/head";
import Link from "next/link";
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

    if (!router.query.uid || !router.query.email) {
      return;
    }

    let uid = router.query.uid.toString();
    let email = router.query.email.toString();

    createUser(uid, displayName, email)
      .then((result) => {
        setUser({
          uid,
          displayName: displayName,
          email,
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
        <section className="my-4">
          <p>닉네임은 한번 설정하면 변경할 수 없습니다.</p>
          <p>닉네임은 2~10자 사이로 설정해주세요.</p>
        </section>
        <section className="my-4">
          <p>
            확인 버튼을 누르면 매일디의{" "}
            <Link
              href="/terms"
              target="_blank"
              className="text-blue-700 underline"
            >
              이용약관
            </Link>
            ,{" "}
            <Link
              href="https://plip.kr/html/78f76b2b-01ee-4d54-b724-9520a5d34a60.html"
              target="_blank"
              className="text-blue-700 underline"
            >
              개인정보처리방침
            </Link>
            에 동의하게 됩니다.
          </p>
        </section>
        <button onClick={onClickSubmit} className="p-4 border rounded">
          확인
        </button>
      </main>
    </>
  );
}
