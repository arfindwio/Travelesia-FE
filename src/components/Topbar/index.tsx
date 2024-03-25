"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Components
import FilterTopbarButton from "./FilterTopbarButton";
import SearchTopbarButton from "./SearchTopbarButton";

// Icons
import { IoArrowBack } from "react-icons/io5";

const Topbar = () => {
  const pathName = usePathname();

  let topbarName = "";
  if (pathName === "/history") topbarName = "Payment History";
  if (pathName === "/notification") topbarName = "Notification";
  if (pathName === "/account/profile") topbarName = "Account Profile";
  if (pathName === "/account/setting") topbarName = "Setting";

  return (
    <div className="flex w-full flex-col gap-4 border-b bg-neutral-5 px-20 pb-4 pt-24 shadow-md">
      <h1 className="text-xl font-bold">{topbarName}</h1>
      <div className="flex items-center justify-between gap-4">
        <div className={`${pathName === "/account/profile" || pathName === "/account/setting" ? "w-full" : "w-[90%]"} flex items-center rounded-xl bg-primary-3 px-3 py-4 text-neutral-5`}>
          <Link href="/" className="flex w-fit">
            <IoArrowBack size={25} />
            <p className="pl-2 text-base font-bold">Homepage</p>
          </Link>
        </div>
        {pathName === "/history" || pathName === "/notification" ? (
          <>
            <FilterTopbarButton />
            <SearchTopbarButton />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Topbar;
