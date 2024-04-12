"use client";

import Image from "next/image";
import { useState } from "react";

// Icons
import { GiLotus } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { PiSuitcaseRollingLight } from "react-icons/pi";

interface AirportData {
  airportName: string;
  continent: string;
  country: string;
  city: string;
}

interface TerminalData {
  terminalName: string;
  airport: AirportData;
}

interface AirlineData {
  airlineName: string;
  baggage: number;
  cabinBaggage: number;
}

interface SeatData {
  id: number;
  seatNumber: string;
  isBooked: boolean;
}

interface FlightData {
  id: number;
  flightCode: string;
  flightImg: string;
  seatClass: string;
  price: number;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  createdAt: string;
  airline: AirlineData;
  promotion: string;
  departureTerminal: TerminalData;
  arrivalTerminal: TerminalData;
  seat: SeatData[];
}

const FlightCard = ({ flight }: { flight: FlightData }) => {
  const [flightDetail, setFlightDetail] = useState<boolean>(false);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  };
  return (
    <div
      className={`group cursor-pointer rounded-lg border-2 hover:border-primary-3 ${flightDetail ? "border-primary-3" : ""} p-5 shadow-lg`}
      onClick={() => {
        setFlightDetail(!flightDetail);
      }}
    >
      <div className="flex flex-col gap-3 pb-5">
        <div className="flex justify-between">
          <div className="flex w-2/3 items-center gap-2">
            <GiLotus size={25} className="text-alert-yellow" />
            <p className="text-xs font-semibold">
              {flight.airline.airlineName} - {flight.seatClass}
            </p>
          </div>
          <div className="cursor-pointer rounded-full border-2 p-1 hover:border-primary-3 group-hover:border-primary-3">
            {flightDetail ? <IoIosArrowUp size={20} className="font-semibold" /> : <IoIosArrowDown size={20} className="font-semibold" />}
          </div>
        </div>
        <div className="flex justify-between px-5">
          <div className="flex w-2/3 items-center gap-3">
            <div className="flex flex-col gap-1 text-center">
              <p className="text-sm font-bold">{flight.departureTime.split(" ")[0]}</p>
              <p className="text-xs font-semibold">{flight.departureTerminal.airport.city}</p>
            </div>
            <div className="flex w-1/2 flex-col gap-1 text-center text-neutral-3">
              <p className="text-sm">{formatDuration(flight.duration)}</p>
              <Image src="/LongArrow.svg" alt="arrow" width={1} height={1} className="w-full" />
              <p className="text-sm">Direct</p>
            </div>
            <div className="flex flex-col gap-1 text-center">
              <p className="text-sm font-bold">{flight.arrivalTime.split(" ")[0]}</p>
              <p className="text-xs font-semibold">{flight.arrivalTerminal.airport.city}</p>
            </div>
            <PiSuitcaseRollingLight size={30} className="ms-8 text-primary-3" />
          </div>
          <div className="flex w-1/3 flex-col gap-2 ">
            <h5 className="ml-auto w-fit text-base font-bold text-primary">IDR {flight.price.toLocaleString("id-ID")}</h5>
            <button className="ml-auto w-fit rounded-xl bg-primary px-6 py-2 text-base text-neutral-5 hover:bg-primary-hover">Choose</button>
          </div>
        </div>
      </div>
      {flightDetail && (
        <div className="flex flex-col gap-2 border-t-2 border-neutral-3 px-4 py-6">
          <div className="flex flex-col pb-2">
            <h5 className="mb-2 text-sm font-bold text-primary">Flight Detail</h5>
            <div className="flex items-center justify-between">
              <h5 className="text-base font-bold">{flight.departureTime.split(" ")[0]}</h5>
              <p className="text-sm font-bold text-primary-3">Departure</p>
            </div>
            <p className="text-sm font-normal">{`${flight.departureTime.split(" ")[1]} ${flight.departureTime.split(" ")[2]} ${flight.departureTime.split(" ")[3]}`}</p>
            <p className="text-sm font-medium">
              {flight.departureTerminal.airport.airportName} - {flight.departureTerminal.terminalName}
            </p>
          </div>
          <div className="mx-auto w-[40%] border-b-2 border-neutral-4"></div>
          <div className="flex items-center gap-3 px-4 py-2">
            <GiLotus size={25} className="text-alert-yellow" />
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">
                {flight.airline.airlineName} - {flight.seatClass}
              </h5>
              <h5 className="mb-3 text-sm font-bold">{flight.flightCode}</h5>
              <p className="text-xs font-semibold">Information :</p>
              <p className="text-sm font-normal">Baggage {flight.airline.baggage} kg</p>
              <p className="text-sm font-normal">Cabin baggage {flight.airline.cabinBaggage} kg</p>
              <p className="text-sm font-normal">In Flight Entertainment</p>
            </div>
          </div>
          <div className="mx-auto w-[40%] border-b-2 border-neutral-4"></div>
          <div className="flex flex-col pt-2">
            <div className="flex items-center justify-between">
              <h5 className="text-base font-bold">{flight.arrivalTime.split(" ")[0]}</h5>
              <p className="text-sm font-bold text-primary-3">Arrival</p>
            </div>
            <p className="text-sm font-normal">{`${flight.arrivalTime.split(" ")[1]} ${flight.arrivalTime.split(" ")[2]} ${flight.arrivalTime.split(" ")[3]}`}</p>
            <p className="text-sm font-medium">{flight.arrivalTerminal.airport.airportName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
