import { getDesignListByThemeId } from "@apis/designs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Theme } from "src/@types/theme";

// props
interface MainThemeItemProps {
  data: Theme;
  isFocused: boolean;
}

export default function MainThemeItem({ data, isFocused }: MainThemeItemProps) {
  const [uploaderCount, setUploaderCount] = useState(0);
  const [designCount, setDesignCount] = useState(0);

  useEffect(() => {
    if (!isFocused) return;

    getDesignListByThemeId(data.id).then((res) => {
      const uploaderSet = new Set();
      res.docs.forEach((doc) => {
        uploaderSet.add(doc.data().uploader);
      });
      setUploaderCount(uploaderSet.size);
      setDesignCount(res.docs.length);
    });
  }, [isFocused, data.id]);

  return (
    <Link href={`/theme/detail/${data.id}`}>
      <section
        style={{
          backgroundImage: `url(${data.thumbnailUrl})`,
        }}
        className={`min-h-[848px] min-w-[640px] bg-gray-300 p-8 flex flex-col gap-4 bg-cover bg-center`}
      >
        <h1 className="text-white font-bold text-[40px] leading-none tracking-[0.02em]">
          {data.name}
        </h1>
        {isFocused && (
          <>
            <h2 className="text-white text-[32px] leading-none tracking-[0.02em]">
              현재 제출자 {uploaderCount}명
            </h2>
            <h2 className="text-white text-[32px] leading-none tracking-[0.02em]">
              현재 등록된 디자인 {designCount > 99 ? "99+" : designCount} 개
            </h2>
          </>
        )}
      </section>
    </Link>
  );
}
