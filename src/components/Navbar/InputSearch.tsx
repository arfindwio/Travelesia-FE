"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useRef, KeyboardEvent, MouseEvent } from "react";

// Icons
import { LuSearch } from "react-icons/lu";

const InputSearch = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryParams = searchParams.toString();
  const searchValue = searchParams.get("search");

  const handleSearch = (event: KeyboardEvent<HTMLInputElement> | MouseEvent<SVGElement>) => {
    const keyword = searchRef.current?.value;

    if (!keyword || keyword.trim() === "") return;

    if ((event as KeyboardEvent<HTMLInputElement>).key === "Enter" || event.type === "click") {
      event.preventDefault();
      if (pathname === "/flight") {
        if (queryParams) {
          if (searchValue) {
            const newQueryParams = queryParams.replace(/search=([^&]*)/, `search=${keyword}`);
            router.push(`/flight?${newQueryParams}`);
          } else {
            const newQueryParams = decodeURIComponent(queryParams.replace(/\+/g, "%20"));
            router.push(`/flight?${newQueryParams}&search=${keyword}`);
          }
        } else {
          router.push(`/flight?search=${keyword}`);
        }
      } else {
        router.push(`/flight?search=${keyword}`);
      }
    }
  };

  return (
    <div className="relative pl-10">
      <input type="text" className="w-[100%] rounded-2xl border bg-slate-100 py-2 pl-4 pr-10 outline-none" placeholder="Search..." ref={searchRef} onKeyDown={handleSearch} />
      <LuSearch size={25} className="absolute right-4 top-2 cursor-pointer text-neutral-3" onClick={handleSearch} />
    </div>
  );
};

export default InputSearch;
