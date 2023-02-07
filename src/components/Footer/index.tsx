import { subscribeDesignCount } from "@apis/designs";
import { subscribeTopicCount } from "@apis/topics";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [designCount, setDesignCount] = useState(0);
  const [topicCount, setTopicCount] = useState(0);

  useEffect(() => {
    const unsubscribeDesignCount = subscribeDesignCount((designs) => {
      setDesignCount(designs);
    });

    const unsubscribeTopicCount = subscribeTopicCount((topics) => {
      setTopicCount(topics);
    });

    return () => {
      unsubscribeDesignCount();
      unsubscribeTopicCount();
    };
  }, []);

  return (
    <footer className="flex flex-col p-10 bg-gray-200">
      <section className="flex flex-row gap-8">
        <section>
          <h1>매일디</h1>
          <h2 className="text-xs">
            Empowering creativity, one design at a time:
            <br /> Welcome to 매일디, the daily hub for designers and design
            enthusiasts.
          </h2>
        </section>
        <section className="flex flex-col">
          <h1 className="font-bold">Company</h1>
          <Link href="/">서비스소개</Link>
          <Link href="/terms">이용약관</Link>
          <Link
            href="https://plip.kr/html/78f76b2b-01ee-4d54-b724-9520a5d34a60.html"
            target="_blank"
          >
            개인정보처리방침
          </Link>
        </section>
      </section>
      <div className="h-[1px] my-6 bg-gray-300" />
      <section className="flex flex-row justify-between">
        <section>© 2023 로망난녀석들. All rights reserved.</section>
        <section>
          {designCount} designs and {topicCount} topics in 매일디
        </section>
      </section>
    </footer>
  );
}
