import Link from "next/link";
import Navbar from "@/components/Navbar";
import DateFilterButton from "@/components/FilterButton/DateFilterButton";
import SortFilterButton from "@/components/FilterButton/SortFilterButton";
import FlightCard from "@/components/Card/FlightCard";

// icons
import { IoArrowBack } from "react-icons/io5";

const Flight = () => {
  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col gap-4 border-b bg-neutral-5 px-20 pb-4 pt-24 shadow-md">
        <h1 className="text-xl font-bold">Flight Detail</h1>
        <div className="flex justify-between gap-4">
          <div className="relative flex w-[78%] items-center rounded-xl bg-primary-3 px-3 py-4 text-neutral-5">
            <IoArrowBack size={25} className="absolute left-3 top-4" />
            <p className="pl-8 text-base font-bold">test</p>
          </div>
          <Link href="/" className="w-[20%] rounded-xl bg-alert-green px-3 py-4 text-center text-base font-bold text-neutral-5">
            Change Route
          </Link>
        </div>
        <div className="flex">
          <DateFilterButton />
        </div>
      </div>
      <div className="flex flex-col gap-4 px-40 py-10">
        <SortFilterButton />
        <FlightCard />
      </div>
    </>
  );
};

export default Flight;
