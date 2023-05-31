import {
  getDesignList,
  getDesignListByUserId,
  subscribeDesignCount,
} from "@apis/designs";
import { getThemeList, subscribeThemeCount } from "@apis/themes";
import DesignItem from "@components/DesignItem";
import MainThemeItem from "@components/MainThemeItem";
import SignatureToken from "@components/SignatureToken";
import cn from "classnames";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Design } from "src/@types/design";
import { Theme } from "src/@types/theme";

export default function Home() {
  const [designList, setDesignList] = useState<Design[]>([]);

  useEffect(() => {
    getDesignList("recent")
      .then((snapshot) => {
        let designList: Design[] = [];
        snapshot.forEach((doc) => {
          designList.push(doc.data() as Design);
        });
        setDesignList(designList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Head>
        <title>매일디</title>
        <meta name="description" content="매일디" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-16 py-8 bg-white">
        <ul
          className="grid grid-flow-row grid-cols-4 gap-9 "
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(336px, 1fr))",
          }}
        >
          {designList.map((ele) => (
            <DesignItem key={ele.id} design={ele} />
          ))}
        </ul>
      </main>
    </>
  );
}
