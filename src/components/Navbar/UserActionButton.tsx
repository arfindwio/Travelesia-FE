import Image from "next/image";
import Link from "next/link";

// Icons
import { MdLogin } from "react-icons/md";
import { IoList } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { LuUser } from "react-icons/lu";

const UserActionButton = () => {
  const user = true;
  return (
    <>
      {user ? (
        <div className="flex items-center gap-4">
          <Link href="/" className="text-primary-3">
            <IoList size={25} />
          </Link>
          <Link href="/" className="text-primary-3">
            <FiBell size={23} />
          </Link>
          <Link href="/" className="text-primary-3">
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
