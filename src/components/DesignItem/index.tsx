import { getUserDetail } from "@apis/users";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Design } from "src/@types/design";
import { User } from "src/@types/user";
import ViewCountIconSvg from "@assets/icons/icon_view_count.svg";

interface DesignItemProps {
  design: Design;
}

export default function DesignItem({ design }: DesignItemProps) {
  const [designOwner, setDesignOwner] = useState<User | null>(null);

  useEffect(() => {
    if (!design) return;

    getUserDetail(design.userId)
      .then((res: any) => {
        setDesignOwner({ ...res.data(), id: res.id });
      })
      .catch((err) => console.log(err));
  }, [design]);

  return (
    <li>
      <Link
        className="flex flex-col gap-2"
        href={`/design/detail/${design.id}`}
      >
        <Image
          src={""}
          alt="design thumbnail"
          className="w-full h-[184px] border border-[#1d1d1d]"
        />
        <div className="flex flex-row items-center justify-between pt-[1px]">
          <h1 className="font-bold text-[#1d1d1d] leading-none tracking-[0.04em] text-base">
            {designOwner?.displayName}
          </h1>
          <h2 className="flex flex-row gap-1 text-base leading-none tracking-[0.04em] text-[#1d1d1d]">
            <Image src={ViewCountIconSvg} alt="view count icon" />
            99,999+
          </h2>
        </div>
        <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-base leading-none tracking-[0.04em] text-[#1d1d1d]">
          {design.description}
        </div>
      </Link>
    </li>
  );
}
