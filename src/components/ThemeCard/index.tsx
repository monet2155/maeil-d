import { getDesignListByThemeId } from "@apis/designs";
import React, { useEffect, useState } from "react";
import { Theme } from "src/@types/theme";

interface ThemeCardProps {
  selectedTheme: Theme | null;
}

export default function ThemeCard({ selectedTheme }: ThemeCardProps) {
  const [uploaderCount, setUploaderCount] = useState(0);
  const [designCount, setDesignCount] = useState(0);

  useEffect(() => {
    if (!selectedTheme) return;
    getDesignListByThemeId(selectedTheme.id).then((res) => {
      const uploaderSet = new Set();
      res.docs.forEach((doc) => {
        uploaderSet.add(doc.data().uploader);
      });
      setUploaderCount(uploaderSet.size);
      setDesignCount(res.docs.length);
    });
  }, [selectedTheme]);

  return (
    <section
      className="min-w-[1280px] bg-cover bg-center bg-no-repeat p-8"
      style={{
        backgroundImage: `url(${
          selectedTheme ? selectedTheme.thumbnailUrl : ""
        })`,
      }}
    >
      <h1 className="text-white font-bold text-[40px] leading-none tracking-[0.02em]">
        {selectedTheme?.name}
      </h1>
      <h2 className="text-white text-[20px] leading-none tracking-[0.02em] my-2">
        현재 제출자 {uploaderCount}명
      </h2>
      <h2 className="text-white text-[20px] leading-none tracking-[0.02em]">
        현재 등록된 디자인 {designCount > 99 ? "99+" : designCount} 개
      </h2>
      <h3 className="text-white text-[24px] leading-normal tracking-[0.04em] max-w-[691px] mt-4">
        {selectedTheme?.description}
      </h3>
    </section>
  );
}
