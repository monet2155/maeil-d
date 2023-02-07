import { getDesignListByUserId } from "@apis/designs";
import DesignItem from "@components/DesignItem";
import { userAtom } from "@store";
import { useAtom } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Design } from "src/@types/design";

export default function MyPage() {
  const [user] = useAtom(userAtom);
  const router = useRouter();
  const [myDesignList, setMyDesignList] = useState<Design[]>([]);

  useEffect(() => {
    if (!user || !user.uid) {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/");
      return;
    }

    getDesignListByUserId(user.uid)
      .then((designs) => {
        setMyDesignList(
          designs.docs.map((data: any) => {
            return { ...data.data(), id: data.id };
          })
        );
      })
      .catch((err) => console.log(err));
  }, [user, router]);

  return (
    <>
      <Head>
        <title>매일디</title>
        <meta name="description" content="매일디" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-[80vh]">
        <h1>마이페이지</h1>
        <section className="my-8">
          <table>
            <tr>
              <th>닉네임</th>
              <td>{user?.displayName}</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>{user?.email}</td>
            </tr>
          </table>
        </section>
        <section>
          <h1>내 디자인 목록</h1>
          <section>
            <ul className="flex flex-row flex-wrap gap-2 p-4">
              {myDesignList.map((design) => (
                <DesignItem key={design.id} design={design} />
              ))}
            </ul>
          </section>
        </section>
      </main>
    </>
  );
}
