import Link from "next/link";
import Navbar from "@/components/Navbar";

// Components
import HistoryFilter from "@/components/HistoryFilter";
import HistoryCard from "@/components/Card/HistoryCard";
import HistoryDetailCard from "@/components/Card/HistoryDetailCard";

// Icons
import { IoArrowBack } from "react-icons/io5";

const history = () => {
  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col gap-4 border-b bg-neutral-5 px-20 pb-4 pt-24 shadow-md">
        <h1 className="text-xl font-bold">Payment History</h1>
        <div className="flex items-center justify-between gap-4">
          <div className="flex w-[90%] items-center rounded-xl bg-primary-3 px-3 py-4 text-neutral-5">
            <Link href="/" className="flex w-fit">
              <IoArrowBack size={25} />
              <p className="pl-2 text-base font-bold">Homepage</p>
            </Link>
          </div>
          <HistoryFilter />
        </div>
      </div>
      <div className="flex w-full justify-between gap-4 px-20 pb-20 pt-4">
        <div className="flex w-[55%] flex-col gap-2">
          <h1 className="text-base font-bold">Maret 2023</h1>
          <HistoryCard />
        </div>
        <div className="flex w-[40%] flex-col gap-3 pt-3">
          <HistoryDetailCard />
        </div>
      </div>
    </>
  );
};

export default history;
