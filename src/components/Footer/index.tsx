import Link from "next/link";
import LogoNameSvg from "@assets/images/image_logo_name.svg";
import LogoDSvg from "@assets/images/image_logo_d.svg";
import LogoKoreanSvg from "@assets/images/image_logo_korean.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-row bg-[#FCFCFC] border-t border-[#1d1d1d] min-h-[240px] items-center justify-around">
      <section className="flex flex-col items-center gap-6">
        <h1 className="flex flex-row">
          <Image
            src={LogoNameSvg}
            alt="footer logo name"
            className="w-[76px]"
          />
          <Image src={LogoDSvg} alt="footer logo d" className="w-[16px] ml-2" />
          <Image
            src={LogoKoreanSvg}
            alt="footer logo korean"
            className="w-[60px] ml-6"
          />
        </h1>
        <h2 className="text-sm leading-[150%] text-center tracking-[0.04em] text-[#1d1d1d]">
          Empowering creativity, one design at a time:
          <br /> Welcome to 매일디, the daily hub for designers and design
          enthusiasts.
        </h2>
        <h3 className="text-sm leading-none text-center tracking-[0.04em] text-[#8c8c8c]">
          © 2023 로망난녀석들. All rights reserved.
        </h3>
      </section>
      <section className="flex flex-row items-center gap-32">
        <section className="flex flex-col items-center flex-1 gap-[18px]">
          <h1 className="font-extrabold leading-none tracking-[0.04em] text-base text-[#1d1d1d]">
            COMPANY
          </h1>
          {/* <Link
          href="/"
          className="font-normal leading-none tracking-[0.04em] text-sm text-[#1d1d1d]"
        >
          서비스소개
        </Link> */}
          <Link
            href="/terms"
            className="font-normal leading-none tracking-[0.04em] text-sm text-[#1d1d1d]"
          >
            이용약관
          </Link>
          <Link
            href="https://plip.kr/html/78f76b2b-01ee-4d54-b724-9520a5d34a60.html"
            target="_blank"
            className="font-normal leading-none tracking-[0.04em] text-sm text-[#1d1d1d]"
          >
            개인정보처리방침
          </Link>
        </section>
        <section className="flex flex-col items-center flex-1 gap-[18px]">
          <h1 className="font-extrabold leading-none tracking-[0.04em] text-base text-[#1d1d1d]">
            CONTACT
          </h1>
          <div className="font-normal leading-none tracking-[0.04em] text-sm text-[#1d1d1d]">
            monet@romancebros.com
          </div>
        </section>
      </section>
    </footer>
  );
}
