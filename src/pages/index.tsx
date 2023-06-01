import { getDesignList } from "@apis/designs";
import DesignItem from "@components/DesignItem";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Design } from "src/@types/design";

export default function Home() {
  const [designList, setDesignList] = useState<Design[]>([]);

  useEffect(() => {
    getDesignList("recent")
      .then((snapshot) => {
        let designList: Design[] = [];
        snapshot.forEach((doc) => {
          designList.push({ ...(doc.data() as Design), id: doc.id });
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
      <main className="min-h-screen px-16 py-8 bg-white">
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
