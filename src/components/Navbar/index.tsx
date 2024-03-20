import Link from "next/link";
import Image from "next/image";

import InputSearch from "./InputSearch";
import UserActionButton from "./UserActionButton";

const Navbar = () => {
  return (
    <header className="fixed flex w-full items-center justify-between border-b bg-neutral-5 px-20 py-2 shadow-md">
      <div className="flex w-1/2 items-center gap-4">
        <Link href="/">
          <Image src="/TravelesiaLogo.svg" alt="Travelesia Logo" width={85} height={20} />
        </Link>
        <InputSearch />
      </div>
      <UserActionButton />
    </header>
  );
};

export default Navbar;
