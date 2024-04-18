"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Api
import { getAuthenticateUser } from "@/api/users-endpoints";

// Icons
import { MdLogin } from "react-icons/md";
import { IoList } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { LuUser } from "react-icons/lu";

const UserActionButton = () => {
  const pathname = usePathname();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("tokenUser");
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const user = await getAuthenticateUser();
        if (!user) {
          localStorage.removeItem("tokenUser");
          setToken(null);
        }
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      {token ? (
        <div className="flex items-center gap-6">
          <Link href="/history" scroll={false} className={`${pathname === "/history" ? "text-primary-3" : ""}`}>
            <IoList size={25} />
          </Link>
          <Link href="/notification" scroll={false} className={`${pathname === "/notification" ? "text-primary-3" : ""}`}>
            <FiBell size={23} />
          </Link>
          <Link href="/account/profile" scroll={false} className={`${pathname === "/account/profile" || pathname === "/account/setting" ? "text-primary-3" : ""}`}>
            <LuUser size={25} />
          </Link>
        </div>
      ) : (
        <Link href="/login" scroll={false} className="relative flex rounded-xl bg-primary px-6 py-3 text-neutral-5 hover:bg-primary-hover">
          <MdLogin size={20} className="absolute left-4" />
          <p className="pl-5 text-sm">Login</p>
        </Link>
      )}
    </>
  );
};

export default UserActionButton;
