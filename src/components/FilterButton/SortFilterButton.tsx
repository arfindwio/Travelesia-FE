"use client";

import { LuArrowDownUp } from "react-icons/lu";
import { GiLotus } from "react-icons/gi";

const SortFilterButton = () => {
  return (
    <div className="group relative ml-auto flex w-fit cursor-pointer items-center rounded-2xl border-2 border-primary-3 bg-neutral-5 px-6 py-3 hover:border-neutral-5 hover:bg-primary">
      <LuArrowDownUp size={20} className="absolute left-4 text-primary-3 group-hover:text-neutral-5" />
      <p className="pl-5 text-xs font-semibold text-primary-3 group-hover:text-neutral-5">Sort</p>
    </div>
  );
};

export default SortFilterButton;
