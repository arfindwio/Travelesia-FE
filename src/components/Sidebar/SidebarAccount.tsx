"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Icons
import { FiEdit3 } from "react-icons/fi";
import { TbSettings } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";

const SidebarAccount = () => {
  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("tokenUser");
    router.push("/login");
  };

  return (
    <>
      <Link
        href="/account/profile"
        className={`${pathName === "/account/profile" ? "border-primary-3 font-bold text-primary-3" : "group font-normal hover:border-primary-3 hover:text-primary-3"} flex gap-6 border-b-2 border-neutral-4 pb-3 `}
      >
        <FiEdit3 size={25} className="text-primary-3" />
        <p className="text-base group-hover:font-semibold">Edit Profile</p>
      </Link>
      <Link
        href="/account/setting"
        className={`${pathName === "/account/setting" ? "border-primary-3 font-bold text-primary-3" : "group font-normal hover:border-primary-3 hover:text-primary-3"} flex gap-6 border-b-2 border-neutral-4 pb-3 `}
      >
        <TbSettings size={25} className="text-primary-3" />
        <p className="text-base group-hover:font-semibold">Setting</p>
      </Link>
      <button className="group flex gap-6 border-b-2 border-neutral-4 pb-3 hover:border-primary-3 hover:text-primary-3" onClick={() => handleLogout()}>
        <LuLogOut size={25} className="text-primary-3" />
        <p className="text-base font-normal group-hover:font-semibold">Logout</p>
      </button>
    </>
  );
};

export default SidebarAccount;
