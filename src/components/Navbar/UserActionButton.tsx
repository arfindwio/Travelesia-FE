"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import { MdLogin } from "react-icons/md";
import { IoList } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { LuUser } from "react-icons/lu";

const UserActionButton = () => {
  const pathname = usePathname();

  const user = true;
  return (
    <>
      {user ? (
        <div className="flex items-center gap-4">
          <Link href="/flight" className={`${pathname === "/flight" ? "text-primary-3" : ""}`}>
            <IoList size={25} />
          </Link>
          <Link href="/notification" className={`${pathname === "notification" ? "text-primary-3" : ""}`}>
            <FiBell size={23} />
          </Link>
          <Link href="/profile-account" className={`${pathname === "profile-account" ? "text-primary-3" : ""}`}>
            <LuUser size={25} />
          </Link>
        </div>
      ) : (
        <div className="relative flex rounded-xl bg-primary px-6 py-3 text-neutral-5">
          <MdLogin size={20} className="absolute left-4" />
          <p className="pl-5 text-sm">Login</p>
        </div>
      )}
    </>
  );
};

export default UserActionButton;
