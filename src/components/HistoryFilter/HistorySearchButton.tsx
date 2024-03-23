"use client";

// Icons
import { LuSearch } from "react-icons/lu";

const HistorySearchButton = () => {
  return (
    <div className="group cursor-pointer rounded-full p-2 hover:bg-primary-3">
      <LuSearch size={30} className="text-primary group-hover:text-neutral-5" />
    </div>
  );
};

export default HistorySearchButton;
