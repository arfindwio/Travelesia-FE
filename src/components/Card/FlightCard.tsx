"use client";

import Image from "next/image";
import { useState } from "react";

// Icons
import { GiLotus } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { PiSuitcaseRollingLight } from "react-icons/pi";

const FlightCard: React.FC = () => {
  const [flightDetail, setFlightDetail] = useState<boolean>(false);
  return (
    <>
      <div className="group rounded-lg border-2 border-primary-3 p-5 shadow-lg">
        <div
          className="flex cursor-pointer flex-col gap-3 pb-5"
          onClick={() => {
            setFlightDetail(!flightDetail);
          }}
        >
          <div className="flex justify-between">
            <div className="flex w-2/3 items-center gap-2">
              <GiLotus size={25} className="text-alert-yellow" />
              <p className="text-xs font-semibold">Jet Air - Economy</p>
            </div>
            <div className="cursor-pointer rounded-full border-2 p-1 hover:border-primary-3 group-hover:border-primary-3">
              {flightDetail ? <IoIosArrowUp size={20} className="font-semibold" /> : <IoIosArrowDown size={20} className="font-semibold" />}
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
        {flightDetail ? (
          <div className="flex flex-col gap-2 border-t-2 border-neutral-3 px-4 py-6">
            <div className="flex flex-col pb-2">
              <h5 className="mb-2 text-sm font-bold text-primary">Flight Detail</h5>
              <div className="flex items-center justify-between">
                <h5 className="text-base font-bold text-primary">07:00</h5>
                <p className="text-sm font-bold text-primary-3">Departure</p>
              </div>
              <p className="text-sm font-normal">03 Maret 2023</p>
              <p className="text-sm font-medium">Soekarno Hatta - Terminal 1A Domestik</p>
            </div>
            <div className="mx-auto w-[40%] border-b-2 border-neutral-4"></div>
            <div className="flex items-center gap-3 px-4 py-2">
              <GiLotus size={25} className="text-alert-yellow" />
              <div className="flex flex-col">
                <h5 className="text-sm font-bold">Jet Air - Economy</h5>
                <h5 className="mb-3 text-sm font-bold">JT - 203</h5>
                <p className="text-xs font-semibold">Information :</p>
                <p className="text-sm font-normal">Baggage 20 kg</p>
                <p className="text-sm font-normal">Cabin baggage 7 kg</p>
                <p className="text-sm font-normal">In Flight Entertainment</p>
              </div>
            </div>
            <div className="mx-auto w-[40%] border-b-2 border-neutral-4"></div>
            <div className="flex flex-col pt-2">
              <div className="flex items-center justify-between">
                <h5 className="text-base font-bold text-primary">11:00</h5>
                <p className="text-sm font-bold text-primary-3">Arrival</p>
              </div>
              <p className="text-sm font-normal">03 Maret 2023</p>
              <p className="text-sm font-medium">Melbourne International Airport</p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default FlightCard;
