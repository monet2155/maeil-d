import { userAtom } from "@store";
import { useAtom } from "jotai";
import Head from "next/head";

export default function MyPage() {
  const [user] = useAtom(userAtom);
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
      </main>
    </>
  );
}
