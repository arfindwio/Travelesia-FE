import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Icons
import { LuHome } from "react-icons/lu";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FiBell } from "react-icons/fi";
import { PiUserCircle } from "react-icons/pi";

const NavbarMobile = () => {
  const pathname = usePathname();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("tokenUser");
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  return (
    <>
      <div className="bt-1 fixed bottom-0 z-50 flex w-full items-start justify-between border-t bg-neutral-5 pt-3 shadow-md">
        <Link href="/" className={`${pathname === "/" ? "text-primary" : "text-neutral-3"} ${token ? " w-[24.5%]" : "w-[33%]"} flex flex-col items-center justify-center gap-1 break-all text-center`}>
          <LuHome size={25} />
          <p className="text-sm font-medium">Home</p>
        </Link>
        {!token && (
          <Link href="/flight" className={`${pathname === "/flight" ? "text-primary" : "text-neutral-3"} ${token ? " w-[24.5%]" : "w-[33%]"} flex flex-col items-center justify-center gap-1 break-all text-center`}>
            <MdOutlineAirplaneTicket size={25} />
            <p className="text-sm font-medium">Flight</p>
          </Link>
        )}
        <Link href="/history" className={`${pathname === "/history" ? "text-primary" : "text-neutral-3"} ${token ? " w-[24.5%]" : "w-[33%]"} flex flex-col items-center justify-center gap-1 break-all text-center`}>
          <LiaClipboardListSolid size={25} />
          <p className="text-sm font-medium">History</p>
        </Link>
        <Link href="/notification" className={`${pathname === "/notification" ? "text-primary" : "text-neutral-3"} ${token ? " w-[24.5%]" : "w-[33%]"} flex flex-col items-center justify-center gap-1 break-all text-center`}>
          <FiBell size={25} />
          <p className="text-sm font-medium">Notification</p>
        </Link>
        <Link href="/account/profile" className={`${pathname === "/account/profile" ? "text-primary" : "text-neutral-3"} ${token ? " w-[24.5%]" : "w-[33%]"} flex flex-col items-center justify-center gap-1 break-all text-center`}>
          <PiUserCircle size={25} />
          <p className="text-sm font-medium">Profile</p>
        </Link>
      </div>
    </>
  );
};

export default NavbarMobile;
