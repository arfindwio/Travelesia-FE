"use client";

import { useRouter } from "next/navigation";
import { useRef, KeyboardEvent, MouseEvent } from "react";
import { LuSearch } from "react-icons/lu";

const InputSearch = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (event: KeyboardEvent<HTMLInputElement> | MouseEvent<SVGElement>) => {
    const keyword = searchRef.current?.value;

    if (!keyword || keyword.trim() === "") return;

    if ((event as KeyboardEvent<HTMLInputElement>).key === "Enter" || event.type === "click") {
      event.preventDefault();
      //   router.push(`/search/${keyword}`);
    }
  };

  return (
    <div className="relative">
      <input type="text" className="w-[140%] rounded-2xl border bg-slate-100 py-2 pl-4 pr-10 outline-none" placeholder="Search..." ref={searchRef} onKeyDown={handleSearch} />
      <LuSearch size={25} className="absolute -right-24 top-2 cursor-pointer text-neutral-3" onClick={handleSearch} />
    </div>
  );
};

export default InputSearch;
