"use client";

// Icons
import { CiFilter } from "react-icons/ci";

const HistoryFilterButton = () => {
  return (
    <button className="group flex items-center gap-1 rounded-full border-2 border-primary-3 bg-neutral-5 px-3 py-2 hover:bg-primary-3 hover:text-neutral-5">
      <CiFilter size={20} className="text-neutral-2 group-hover:text-neutral-5" />
      <p className="text-base ">Filter</p>
    </button>
  );
};

export default HistoryFilterButton;
