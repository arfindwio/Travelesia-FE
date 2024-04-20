import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Material UI
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

// Icons
import { LuHome } from "react-icons/lu";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FiBell } from "react-icons/fi";
import { PiUserCircle } from "react-icons/pi";
import { FiEdit3 } from "react-icons/fi";
import { TbSettings } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";

const NavbarMobile = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("tokenUser");
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tokenUser");
    router.push("/login");
  };

  return (
    <>
      <div className="bt-1 fixed bottom-0 z-50 flex w-full items-start justify-between border-t bg-neutral-5 pt-3 shadow-md">
        <Link href="/" scroll={false} className={`${pathname === "/" ? "text-primary" : "text-neutral-3"} ${token ? " w-[24.5%]" : "w-[33%]"} flex flex-col items-center justify-center gap-1 break-all text-center`}>
          <LuHome size={25} />
          <p className="text-sm font-medium">Home</p>
        </Link>
        {!token ? (
          <Link href="/flight" scroll={false} className={`${pathname === "/flight" ? "text-primary" : "text-neutral-3"} ${token ? " w-[24.5%]" : "w-[33%]"} flex flex-col items-center justify-center gap-1 break-all text-center`}>
            <MdOutlineAirplaneTicket size={25} />
            <p className="text-sm font-medium">Flight</p>
          </Link>
        ) : (
          <>
            <Link href="/history" scroll={false} className={`${pathname === "/history" ? "text-primary" : "text-neutral-3"} ${token ? " w-[24.5%]" : "w-[33%]"} flex flex-col items-center justify-center gap-1 break-all text-center`}>
              <LiaClipboardListSolid size={25} />
              <p className="text-sm font-medium">History</p>
            </Link>
            <Link
              href="/notification"
              scroll={false}
              className={`${pathname === "/notification" ? "text-primary" : "text-neutral-3"} ${token ? " w-[24.5%]" : "w-[33%]"} flex flex-col items-center justify-center gap-1 break-all text-center`}
            >
              <FiBell size={25} />
              <p className="text-sm font-medium">Notification</p>
            </Link>
          </>
        )}
        {!token ? (
          <Link href="/login" scroll={false} className={`flex w-[33%] flex-col items-center justify-center gap-1 break-all text-center text-neutral-3`}>
            <PiUserCircle size={25} />
            <p className="text-sm font-medium">Login</p>
          </Link>
        ) : (
          <button className={`${pathname === "/account/profile" ? "text-primary" : "text-neutral-3"} flex w-[24.5%] flex-col items-center justify-center gap-1 break-all text-center`} onClick={() => setOpen(!open)}>
            <PiUserCircle size={25} />
            <p className="text-sm font-medium">Account</p>
          </button>
        )}
      </div>
      <Modal open={open} onClose={() => setOpen(!open)}>
        <Box className="absolute left-1/2 top-1/2 flex w-[85%] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-6 border-2 bg-neutral-5 p-4 shadow-md">
          <Link
            href="/account/profile"
            scroll={false}
            className={`${pathname === "/account/profile" ? "border-primary-3 font-bold text-primary-3" : "group font-normal hover:border-primary-3 hover:text-primary-3"} flex gap-3 border-b-2 border-neutral-4 pb-3 `}
          >
            <FiEdit3 size={25} className="text-primary-3" />
            <p className="text-base group-hover:font-semibold">Profile</p>
          </Link>
          <Link
            href="/account/setting"
            scroll={false}
            className={`${pathname === "/account/setting" ? "border-primary-3 font-bold text-primary-3" : "group font-normal hover:border-primary-3 hover:text-primary-3"} flex gap-3 border-b-2 border-neutral-4 pb-3 `}
          >
            <TbSettings size={25} className="text-primary-3" />
            <p className="text-base group-hover:font-semibold">Setting</p>
          </Link>
          <button className="group flex w-full gap-6 border-b-2 border-neutral-4 pb-3 hover:border-primary-3 hover:text-primary-3" onClick={() => handleLogout()}>
            <LuLogOut size={25} className="text-primary-3" />
            <p className="text-base font-normal group-hover:font-semibold">Logout</p>
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default NavbarMobile;
