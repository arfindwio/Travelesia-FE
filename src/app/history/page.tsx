import Navbar from "@/components/Navbar";

// Components
import Topbar from "@/components/Topbar";
import HistoryCard from "@/components/Card/HistoryCard";
import HistoryDetailCard from "@/components/Card/HistoryDetailCard";

const history = () => {
  return (
    <>
      <Navbar />
      <Topbar />
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
