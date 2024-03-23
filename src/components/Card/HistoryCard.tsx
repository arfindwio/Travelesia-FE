import Image from "next/image";

// Icons
import { FaLocationDot } from "react-icons/fa6";

const HistoryCard = () => {
  return (
    <div className="flex flex-col gap-6 rounded-[10px] border-2 border-primary-3 p-4 shadow-lg">
      <p className="w-fit rounded-full bg-alert-green px-4 py-1 text-sm text-neutral-5">Issued</p>
      <div className="flex items-center justify-between">
        <div className="flex w-[20%] gap-2">
          <FaLocationDot size={25} className="mt-1 text-neutral-3" />
          <div className="flex flex-col gap-1">
            <h5 className="text-sm font-bold">Jakarta</h5>
            <p className="text-xs font-medium">5 Maret 2023</p>
            <p className="text-xs font-medium">19:10</p>
          </div>
        </div>
        <div className="flex w-[55%] flex-col items-center justify-center">
          <p className="text-xs font-medium text-neutral-3">4h 0m</p>
          <Image src="/LongArrow.svg" alt="Long Arrow" width={1} height={1} className="w-full" />
        </div>
        <div className="flex w-[20%] gap-2">
          <FaLocationDot size={25} className="mt-1 text-neutral-3" />
          <div className="flex flex-col gap-1">
            <h5 className="text-sm font-bold">Melbourne</h5>
            <p className="text-xs font-medium">5 Maret 2023</p>
            <p className="text-xs font-medium">21:10</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t-2 border-neutral-4 pt-3">
        <div className="flex flex-col gap-1">
          <h5 className="text-xs font-bold">Booking Code:</h5>
          <p className="text-xs font-normal">6723y2GHK</p>
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="text-xs font-bold">Class:</h5>
          <p className="text-xs font-normal">Economy</p>
        </div>
        <h4 className="text-base font-bold">IDR 9.850.000</h4>
      </div>
    </div>
  );
};

export default HistoryCard;
