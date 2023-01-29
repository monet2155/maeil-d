import Link from "next/link";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "src/utils/firebase";
import { useState } from "react";
import { userAtom } from "@store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { getUserDetail } from "@apis/users";

export default function Header() {
  const router = useRouter();

  const [user, setUser] = useAtom(userAtom);

  const onClickLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result && result.user) {
          getUserDetail(result.user.uid)
            .then((userDoc) => {
              if (userDoc.exists()) {
                setUser({
                  uid: userDoc.id,
                  displayName: userDoc.data().displayName,
                });
              } else {
                router.push(
                  {
                    pathname: "/welcome",
                    query: { uid: result.user.uid },
                  },
                  "/welcome"
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickLogout = () => {
    setUser(null);
    router.replace("/");
  };

  return (
    <header className="flex flex-row justify-between p-10 bg-sky-300">
      <nav>
        <ul className="flex flex-row gap-5">
          <li>
            <Link href="/">홈</Link>
          </li>
          <li>
            <Link href="/topic/list">주제</Link>
          </li>
        </ul>
      </nav>
      {user ? (
        <div className="flex flex-row gap-4">
          <div>{user.displayName}님</div>
          <Link href="/mypage">마이페이지</Link>
          <button onClick={onClickLogout}>로그아웃</button>
        </div>
      ) : (
        <button onClick={() => onClickLogin()}>로그인</button>
      )}
    </header>
  );
}
