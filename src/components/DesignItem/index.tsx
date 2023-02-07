import Link from "next/link";
import { Design } from "src/@types/design";

interface DesignItemProps {
  design: Design;
}

export default function DesignItem({ design }: DesignItemProps) {
  return (
    <li className="flex flex-col rounded-lg shadow-lg">
      <Link className="p-5" href={`/design/detail/${design.id}`}>
        <div>{design.userName}</div>
        <div>{design.description}</div>
      </Link>
    </li>
  );
}
