"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Components
import FilterTopbarButton from "./FilterTopbarButton";
import SearchTopbarButton from "./SearchTopbarButton";

// Icons
import { IoArrowBack } from "react-icons/io5";

const Topbar = () => {
  const pathName = usePathname();

  const [isMobile, setIsMobile] = useState<boolean>(false);

  let topbarName = "";
  if (pathName === "/history") topbarName = "Payment History";
  if (pathName === "/notification") topbarName = "Notification";
  if (pathName === "/account/profile") topbarName = "Account Profile";
  if (pathName === "/account/setting") topbarName = "Setting";

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
    <div className="flex w-full flex-col gap-4 border-b bg-neutral-5 px-6 pb-4 pt-5 sm:px-10 sm:pt-24 sm:shadow-md lg:px-20 print:hidden">
      <h1 className="text-2xl font-bold sm:text-xl">{topbarName}</h1>
      {!isMobile && (
        <div className="flex items-center justify-between gap-4">
          <div className={`${pathName === "/account/profile" || pathName === "/account/setting" ? "w-full" : "w-full"} flex items-center rounded-xl bg-primary-3 px-3 py-4 text-neutral-5`}>
            <Link href="/" scroll={false} className="flex w-fit">
              <IoArrowBack size={25} />
              <p className="pl-2 text-base font-bold">Homepage</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;
