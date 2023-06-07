import { getDesignList } from "@apis/designs";
import DesignItem from "@components/DesignItem";
import Head from "next/head";
import { useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Design } from "src/@types/design";
import ReactModal from "react-modal";
import DesignDetail from "@components/DesignDetail";
import { useRouter } from "next/router";

ReactModal.setAppElement("#__next");

export default function Home({
  initialDesignList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [designList, setDesignList] = useState<Design[]>(initialDesignList);

  return (
    <>
      <Head>
        <title>매일디</title>
        <meta name="description" content="매일디" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReactModal
        isOpen={!!router.query.designId}
        onRequestClose={() => router.push("/", undefined, { scroll: false })}
        onAfterOpen={() => {
          document.body.style.overflow = "hidden";
        }}
        onAfterClose={() => {
          document.body.style.overflow = "unset";
        }}
      >
        <DesignDetail />
      </ReactModal>
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

export const getServerSideProps: GetServerSideProps<{
  initialDesignList: Design[];
}> = async () => {
  const designList = await getDesignList("recent");

  const initialDesignList = designList.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Design[];

  return {
    props: {
      initialDesignList: JSON.parse(JSON.stringify(initialDesignList)),
    },
  };
};
