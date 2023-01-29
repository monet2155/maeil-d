import Link from "next/link";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "src/utils/firebase";
import { useState } from "react";
import { userAtom } from "@store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [user, setUser] = useAtom(userAtom);

  const onClickLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result && result.user && result.user.displayName) {
          setUser({
            id: result.user.uid,
            name: result.user.displayName,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
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
          <div>{user.name}님</div>
          <Link href="/mypage">마이페이지</Link>
          <button onClick={onClickLogout}>로그아웃</button>
        </div>
      ) : (
        <button onClick={() => onClickLogin()}>로그인</button>
      )}
    </header>
  );
}
