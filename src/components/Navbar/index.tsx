"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Components
import InputSearch from "./InputSearch";
import UserActionButton from "./UserActionButton";
import NavbarMobile from "../Mobile/Navbar/NavbarMobile";

const Navbar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const googleTokenValue = searchParams.get("googleToken");
    if (googleTokenValue) {
      localStorage.setItem("tokenUser", googleTokenValue);
      router.push("/");
    }
  }, [router, searchParams]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);

    mediaQuery.addListener(handleMediaQueryChange);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      {isMobile && <NavbarMobile />}
      {!isMobile && (
        <header className="fixed z-50 flex w-full items-center justify-between border-b bg-neutral-5 px-10 py-2 shadow-md lg:px-20 print:hidden">
          <div className="flex w-fit items-center justify-between">
            <Link href="/" scroll={false}>
              <Image src="/TravelesiaLogo.svg" alt="Travelesia Logo" width={0} height={0} className="w-[5.3rem]" />
            </Link>
            <InputSearch />
          </div>
          <UserActionButton />
        </header>
      )}
    </>
  );
};

export default Navbar;
