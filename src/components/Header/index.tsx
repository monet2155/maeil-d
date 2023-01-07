import Link from "next/link";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "src/utils/firebase";
import { useState } from "react";

export default function Header() {
  const [userName, setUserName] = useState("");

  const onClickLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        if (user && user.displayName) {
          setUserName(user.displayName);
        }
        if (credential) {
          const token = credential.accessToken;
          console.log(token);
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
      {userName != "" ? (
        <div>{userName}님</div>
      ) : (
        <button onClick={() => onClickLogin()}>로그인</button>
      )}
    </header>
  );
}
