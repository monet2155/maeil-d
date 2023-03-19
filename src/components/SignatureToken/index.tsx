import Image from "next/image";

interface TokenProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  type: "left" | "right" | "cross";
  color?: string;
  alt: string;
}

export default function SignatureToken(props: TokenProps) {
  const { type, color } = props;

  if (type === "left") {
    return (
      <svg fill={color ?? "none"} xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M.5.634C.5.56.56.5.634.5 17.68.5 31.5 14.32 31.5 31.366c0 .074-.06.134-.134.134C14.32 31.5.5 17.68.5.634Z"
          fill="#fff"
        />
        <path
          d="M.5.634C.5.56.56.5.634.5 17.68.5 31.5 14.32 31.5 31.366c0 .074-.06.134-.134.134C14.32 31.5.5 17.68.5.634Z"
          stroke="#1D1D1D"
        />
      </svg>
    );
  } else {
    return (
      <svg fill={color ?? "none"} xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.595 6A11.921 11.921 0 0 0 0 11.976c0 .013.01.024.024.024C2.2 12 4.241 11.42 6 10.405A11.92 11.92 0 0 0 11.976 12c.013 0 .024-.01.024-.024C12 9.8 11.42 7.759 10.405 6A11.921 11.921 0 0 0 12 .024.024.024 0 0 0 11.976 0C9.8 0 7.759.58 6 1.595A11.921 11.921 0 0 0 .024 0 .024.024 0 0 0 0 .024C0 2.2.58 4.241 1.595 6Z"
          fill="#1D1D1D"
        />
      </svg>
    );
  }
}
