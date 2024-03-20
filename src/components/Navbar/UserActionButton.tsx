import Image from "next/image";
import Link from "next/link";

import { MdLogin } from "react-icons/md";

const UserActionButton = () => {
  const user = false;
  return (
    <>
      {user ? (
        <div className=""></div>
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
