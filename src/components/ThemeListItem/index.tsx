import { getDesignCountByThemeId } from "@apis/designs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Theme } from "src/@types/theme";

type ThemeListItemProps = {
  theme: Theme;
};

export default function ThemeListItem({ theme }: ThemeListItemProps) {
  const [designCount, setDesignCount] = useState(0);

  useEffect(() => {
    getDesignCountByThemeId(theme.id)
      .then((res) => {
        setDesignCount(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <tr className="odd:bg-gray-100">
      <td className="flex items-center gap-4 p-2 border">
        <div
          className={`w-4 h-4`}
          style={{
            backgroundColor: theme.colorCode,
          }}
        />
        {theme.colorCode}
      </td>
      <td className="p-2 text-blue-700 border">
        <Link href={`/theme/detail/${theme.id}`} className="hover:underline">
          {theme.name}
        </Link>
      </td>
      <td className="p-2 border">{designCount}</td>
    </tr>
  );
}
