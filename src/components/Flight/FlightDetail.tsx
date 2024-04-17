"use client";

import { usePathname } from "next/navigation";

// Icons
import { GiLotus } from "react-icons/gi";

interface PassengersValue {
  adult: number;
  child: number;
  baby: number;
}
interface FlightProps {
  id: number;
  passengers: PassengersValue | null;
  flightData: FlightData | null;
}
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

const FlightDetail: React.FC<FlightProps> = ({ id, passengers, flightData }) => {
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
          <h5 className="text-base font-bold">{flightData?.departureTime.split(" ")[0]}</h5>
          <p className="text-xs font-bold text-primary-3">Departure</p>
        </div>
        <p className="text-sm font-normal">{`${flightData?.departureTime.split(" ")[1]} ${flightData?.departureTime.split(" ")[2]} ${flightData?.departureTime.split(" ")[3]}`}</p>
        <p className="text-sm font-medium">
          {flightData?.departureTerminal.airport.airportName} - {flightData?.departureTerminal.terminalName}
        </p>
      </div>
      <div className="px-4">
        <div className="flex w-full items-center gap-2 border-y-2 border-neutral-4 py-2">
          <GiLotus size={25} className="text-alert-yellow" />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">
                {flightData?.airline.airlineName} - {flightData?.seatClass}
              </h5>
              <h5 className="text-sm font-bold">{flightData?.flightCode}</h5>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">Information:</h5>
              <p className="text-sm font-medium">Baggage {flightData?.airline.baggage} kg</p>
              <p className="text-sm font-medium">Cabin baggage {flightData?.airline.cabinBaggage} kg</p>
              <p className="text-sm font-medium">In Flight Entertainment</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h5 className="text-base font-bold">{flightData?.arrivalTime.split(" ")[0]}</h5>
          <p className="text-xs font-bold text-primary-3">Arrival</p>
        </div>
        <p className="text-sm font-normal">{`${flightData?.arrivalTime.split(" ")[1]} ${flightData?.arrivalTime.split(" ")[2]} ${flightData?.arrivalTime.split(" ")[3]}`}</p>
        <p className="text-sm font-medium">{flightData?.arrivalTerminal.airport.airportName}</p>
      </div>
      <div className="px-4">
        <div className="flex flex-col gap-2 border-y-2 border-neutral-4 py-2">
          <h5 className="text-sm font-bold">Pricing Details</h5>
          {passengers?.adult !== 0 && (
            <div className="flex items-center justify-between">
              <p className="text-sm">{passengers?.adult} Adults</p>
              <p className="text-sm">IDR {passengers?.adult && flightData?.price && (passengers.adult * flightData.price).toLocaleString("id-ID")}</p>
            </div>
          )}
          {passengers?.child !== 0 && (
            <div className="flex items-center justify-between">
              <p className="text-sm">{passengers?.child} Child</p>
              <p className="text-sm">IDR {passengers?.child && flightData?.price && (passengers.child * flightData.price).toLocaleString("id-ID")}</p>
            </div>
          )}
          {passengers?.baby !== 0 && (
            <div className="flex items-center justify-between">
              <p className="text-sm">{passengers?.baby} Baby</p>
              <p className="text-sm">{passengers?.baby && flightData?.price && (passengers.baby * flightData.price).toLocaleString("id-ID")}</p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <p className="text-sm">Tax 11%</p>
            <p className="text-sm">IDR {passengers && flightData && flightData.price && ((passengers.adult * flightData.price + passengers.child * flightData.price + passengers.baby * flightData.price) * 0.11).toLocaleString("id-ID")}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h5 className="text-base font-bold">Total</h5>
          <h1 className="text-lg font-bold text-primary">
            IDR {passengers && flightData && flightData.price && ((passengers.adult * flightData.price + passengers.child * flightData.price + passengers.baby * flightData.price) * 1.11).toLocaleString("id-ID")}
          </h1>
        </div>
      </div>
    </>
  );
};

export default FlightDetail;
