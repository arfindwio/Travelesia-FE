"use client";

import Image from "next/image";

// Icons
import { GiLotus } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { PiSuitcaseRollingLight } from "react-icons/pi";

const FlightCard = () => {
  return (
    <>
      <div className="rounded-lg border-2 border-primary-3 p-5 shadow-lg">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex w-2/3 items-center gap-2">
              <GiLotus size={25} className="text-alert-yellow" />
              <p className="text-xs font-semibold">Jet Air - Economy</p>
            </div>
            <div className="cursor-pointer rounded-full border-2 p-1">
              <IoIosArrowDown size={20} className="font-semibold" />
            </div>
          </div>
          <div className="flex justify-between px-5">
            <div className="flex w-2/3 items-center gap-3">
              <div className="flex flex-col gap-1 text-center">
                <p className="text-sm font-bold">07:00</p>
                <p className="text-xs font-semibold">JKT</p>
              </div>
              <div className="flex w-1/2 flex-col gap-1 text-center text-neutral-3">
                <p className="text-sm">4h 0m</p>
                <Image src="/LongArrow.svg" alt="arrow" width={1} height={1} className="w-full" />
                <p className="text-sm">Direct</p>
              </div>
              <div className="flex flex-col gap-1 text-center">
                <p className="text-sm font-bold">11:00</p>
                <p className="text-xs font-semibold">MLB</p>
              </div>
              <PiSuitcaseRollingLight size={30} className="ms-8 text-primary-3" />
            </div>
            <div className="flex w-1/3 flex-col gap-2 ">
              <h5 className="ml-auto w-fit text-base font-bold text-primary">IDR 4.950.000</h5>
              <button className="ml-auto w-fit rounded-xl bg-primary px-6 py-2 text-base text-neutral-5 hover:bg-primary-hover">Choose</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightCard;
