"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

// Components
import InputSearch from "./InputSearch";
import UserActionButton from "./UserActionButton";
import NavbarMobile from "../Mobile/Navbar/NavbarMobile";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

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
        <header className="fixed z-50 flex w-full items-center justify-between border-b bg-neutral-5 px-10 py-2 shadow-md lg:px-20">
          <div className="flex w-fit items-center justify-between">
            <Link href="/">
              <Image src="/TravelesiaLogo.svg" alt="Travelesia Logo" width={85} height={20} />
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
