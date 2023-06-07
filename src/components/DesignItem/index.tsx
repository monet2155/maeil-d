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
        href={`/?designId=${design.id}`}
        as={`/design/detail/${design.id}`}
        scroll={false}
        shallow={true}
      >
        <div className="relative w-full h-full overflow-hidden  pb-[75%]">
          <Image
            src={"https://picsum.photos/200/300"}
            alt="design thumbnail"
            fill
            className="object-cover bg-[#fdfdfd] rounded-2xl"
          />
        </div>
        <div className="flex flex-row items-center justify-between pt-[1px]">
          <h1 className="font-bold text-[#1d1d1d] leading-none tracking-[0.04em] text-base">
            {designOwner?.displayName}
          </h1>
          <h2 className="flex flex-row gap-1 text-base leading-none tracking-[0.04em] text-[#1d1d1d]">
            <Image src={ViewCountIconSvg} alt="view count icon" />0
          </h2>
        </div>
      </Link>
    </li>
  );
}
