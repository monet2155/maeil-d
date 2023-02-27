import Link from "next/link";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { userAtom } from "@store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { getUserDetail } from "@apis/users";
import { auth } from "@utils/firebase";

import LogoNameSvg from "@assets/images/image_header_logo_name.svg";
import LogoDSvg from "@assets/images/image_header_logo_d.svg";
import Image from "next/image";

export default function Header() {
  const router = useRouter();

  const [user, setUser] = useAtom(userAtom);

  const onClickLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        if (result && result.user) {
          // set cookie expire time to 3 months
          document.cookie = `uid=${result.user.uid}; path=/; max-age=${
            60 * 60 * 24 * 30 * 3
          }`;

          getUserDetail(result.user.uid)
            .then((userDoc) => {
              if (userDoc.exists()) {
                setUser({
                  uid: userDoc.id,
                  displayName: userDoc.data().displayName,
                  email: userDoc.data().email,
                  joinDate: userDoc.data().joinDate,
                });
              } else {
                router.push(
                  {
                    pathname: "/welcome",
                    query: { uid: result.user.uid, email: result.user.email },
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
    getAuth()
      .signOut()
      .then(() => {
        setUser(null);
        document.cookie = "uid=; path=/; max-age=0";
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className="flex flex-row justify-between px-8 bg-white py-7">
      <Link href="/">
        <div className="flex flex-row gap-2">
          <Image src={LogoNameSvg} alt="header logo name" />
          <Image src={LogoDSvg} alt="header logo d" />
        </div>
      </Link>
      <nav className="flex-1 ml-8">
        <ul className="flex flex-row gap-5">
          <li>
            <Link href="/theme/list">주제</Link>
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
