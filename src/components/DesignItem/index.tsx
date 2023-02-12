import { getUserDetail } from "@apis/users";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Design } from "src/@types/design";
import { User } from "src/@types/user";

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
    <li className="flex flex-col rounded-lg shadow-lg">
      <Link className="p-5" href={`/design/detail/${design.id}`}>
        <div>{designOwner?.displayName}</div>
        <div>{design.description}</div>
      </Link>
    </li>
  );
}
