"use client";

import { usePathname } from "next/navigation";

// Icons
import { GiLotus } from "react-icons/gi";

const FlightDetail = ({ id }: { id: number }) => {
  const pathName = usePathname();

  return (
    <>
      <div className="flex flex-col gap-1">
        {pathName === `/flight/${id}` ? (
          <h1 className="text-lg font-bold">Flight Detail</h1>
        ) : (
          <h1 className="text-lg font-bold">
            Booking Code: <span className="font-bold text-primary">6723y2GHK</span>
          </h1>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h5 className="text-base font-bold">19:10</h5>
          <p className="text-xs font-bold text-primary-3">Departure</p>
        </div>
        <p className="text-sm font-normal">5 Maret 2023</p>
        <p className="text-sm font-medium">Soekarno Hatta - Terminal 1A Domestik</p>
      </div>
      <div className="px-4">
        <div className="flex w-full items-center gap-2 border-y-2 border-neutral-4 py-2">
          <GiLotus size={25} className="text-alert-yellow" />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">Jet Air - Economy</h5>
              <h5 className="text-sm font-bold">JT - 203</h5>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">Information:</h5>
              <p className="text-sm font-medium">Baggage 20 kg</p>
              <p className="text-sm font-medium">Cabin baggage 7 kg</p>
              <p className="text-sm font-medium">In Flight Entertainment</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h5 className="text-base font-bold">21:10</h5>
          <p className="text-xs font-bold text-primary-3">Arrival</p>
        </div>
        <p className="text-sm font-normal">5 Maret 2023</p>
        <p className="text-sm font-medium">Melbourne Internation Airport</p>
      </div>
      <div className="px-4">
        <div className="flex flex-col gap-2 border-y-2 border-neutral-4 py-2">
          <h5 className="text-sm font-bold">Pricing Details</h5>
          <div className="flex items-center justify-between">
            <p className="text-sm">2 Adults</p>
            <p className="text-sm">IDR 9.550.000</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm">1 Baby</p>
            <p className="text-sm">0</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm">Tax</p>
            <p className="text-sm">IDR 300.000</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h5 className="text-base font-bold">Total</h5>
          <h1 className="text-lg font-bold text-primary">IDR 9.850.000</h1>
        </div>
      </div>
      <button className="mx-auto mt-6 w-[95%] rounded-xl bg-alert-red py-4 font-normal text-neutral-5 hover:bg-red-600">Continue Payment</button>
    </>
  );
};

export default FlightDetail;
