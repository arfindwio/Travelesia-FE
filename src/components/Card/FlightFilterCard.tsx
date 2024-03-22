"use client";

import Image from "next/image";
import Link from "next/link";

// Icons
import { MdFlightTakeoff, MdOutlineDateRange, MdOutlineAirlineSeatReclineNormal } from "react-icons/md";

const FlightFilterCard = () => {
  return (
    <div className="overflow-hidden rounded-xl bg-neutral-5  shadow-lg">
      <div className="flex flex-col gap-5 px-10 py-7">
        <h1 className="text-lg font-bold">
          Choose Special Flight Schedules on <span className="text-primary-3">Travelesia!</span>
        </h1>
        <div className="flex flex-col gap-5">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex w-[45%] items-center gap-5">
              <div className="flex items-center gap-1">
                <MdFlightTakeoff size={25} className="text-neutral-3" />
                <p className="text-sm font-light text-neutral-3">From</p>
              </div>
              <input type="text" className="w-full border-b-2 pb-3 font-medium outline-none" placeholder="Jakarta (JKTA)" />
            </div>
            <Image src="/Return.svg" alt="Return Logo" width={30} height={1} className="cursor-pointer" />
            <div className="flex w-[45%] items-center gap-5">
              <div className="flex items-center gap-1">
                <MdFlightTakeoff size={25} className="text-neutral-3" />
                <p className="text-sm font-light text-neutral-3">To</p>
              </div>
              <input type="text" className="w-full border-b-2 pb-3 font-medium outline-none" placeholder="Melbourne (MLB)" />
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex w-[45%] items-center gap-5">
              <div className="flex items-center gap-1">
                <MdOutlineDateRange size={25} className="text-neutral-3" />
                <p className="text-sm font-light text-neutral-3">Date</p>
              </div>
              <div className="flex w-full flex-col">
                <p className="text-sm font-light text-neutral-3">Departure</p>
                <input type="text" className="w-full border-b-2 pb-3 font-medium outline-none" placeholder="1 Maret 2023" />
              </div>
            </div>
            <div className="flex w-[45%] items-center gap-5">
              <div className="flex items-center gap-1">
                <MdOutlineAirlineSeatReclineNormal size={25} className="text-neutral-3" />
                <p className="text-sm font-light text-neutral-3">To</p>
              </div>
              <div className="flex w-[45%] flex-col">
                <p className="text-sm font-light text-neutral-3">Passengers</p>
                <input type="text" className="w-full border-b-2 pb-3 font-medium outline-none" placeholder="2 Passengers" />
              </div>
              <div className="flex w-[45%] flex-col">
                <p className="text-sm font-light text-neutral-3">Seat Class</p>
                <input type="text" className="w-full border-b-2 pb-3 font-medium outline-none" placeholder="Bussines" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link href="/flight">
        <button className="w-full bg-primary py-2 text-base font-bold text-neutral-5">Search Flight</button>
      </Link>
    </div>
  );
};

export default FlightFilterCard;
