"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Api
import { getFlights, getFlightsQuery } from "@/api/flights-endpoints";

// Components
import Navbar from "@/components/Navbar";
import DateFilterButton from "@/components/FilterButton/DateFilterButton";
import SortFilterButton from "@/components/FilterButton/SortFilterButton";
import FlightCard from "@/components/Card/FlightCard";

// icons
import { IoArrowBack } from "react-icons/io5";

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

const Flight = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [valueQuery, setValueQuery] = useState<string>("");
  const [formatQuery, setFormatQuery] = useState<string>("");
  const [flights, setFlights] = useState<FlightData[] | null>(null);

  const departure = searchParams.get("d");
  const arrival = searchParams.get("a");
  const date = searchParams.get("f");
  const seatClass = searchParams.get("s");
  const filter = searchParams.get("w");

  useEffect(() => {
    let queryParams = "";
    if (departure || arrival || date || seatClass || filter) {
      if (departure) {
        queryParams += `d=${departure}&`;
      }
      if (arrival) {
        queryParams += `a=${arrival}&`;
      }
      if (date) {
        queryParams += `f=${date}&`;
      }
      if (seatClass) {
        queryParams += `s=${seatClass}&`;
      }
      if (filter) {
        queryParams += `w=${filter}&`;
      }

      queryParams = queryParams.replace(/&$/, "");
      setFormatQuery(queryParams);
    }

    const fetchFlightQueryData = async () => {
      const flights = await getFlightsQuery(`?${queryParams}`);
      if (flights) {
        setFlights(flights);
      }
    };

    const fetchFlightData = async () => {
      const flights = await getFlights();
      if (flights) {
        setFlights(flights);
      }
    };

    if (queryParams) {
      fetchFlightQueryData();
    } else {
      fetchFlightData();
    }
  }, [departure, arrival, date, seatClass, filter]);

  useEffect(() => {
    const passengersJSON = localStorage.getItem("passengers");

    if (!passengersJSON) localStorage.setItem("passengers", JSON.stringify({ adult: 1, child: 0, baby: 0 }));

    if (departure || arrival || passengersJSON || date || seatClass) {
      let formatValueQuery = "";
      if (departure) {
        formatValueQuery += `${departure} - `;
      }
      if (arrival) {
        formatValueQuery += `${arrival} - `;
      }
      if (passengersJSON) {
        const passengers = JSON.parse(passengersJSON);
        formatValueQuery += `${passengers.adult + passengers.child + passengers.baby} Passengers - `;
      }
      if (date) {
        formatValueQuery += `${date} - `;
      }
      if (seatClass) {
        formatValueQuery += `${seatClass} - `;
      }
      formatValueQuery = formatValueQuery.slice(0, -2);
      setValueQuery(formatValueQuery);
    }
  }, [departure, arrival, date, seatClass]);

  const handleFilterChange = (filter: string) => {
    if (formatQuery) {
      router.push(`/flight?${formatQuery}&w=${filter}`);
    } else {
      router.push(`/flight?w=${filter}`);
    }
  };

  console.log(formatQuery);
  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col gap-4 border-b bg-neutral-5 px-20 pb-4 pt-24 shadow-md">
        <h1 className="text-xl font-bold">Flight Detail</h1>
        <div className="flex justify-between gap-4">
          <div className="flex w-[78%] items-center rounded-xl bg-primary-3 px-3 py-4 text-neutral-5">
            <IoArrowBack size={25} />
            <p className="pl-2 text-base font-bold">{valueQuery}</p>
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
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Flight Tickets</h1>
          <SortFilterButton onFilterChange={handleFilterChange} />
        </div>
        {flights && flights.map((flight) => <FlightCard key={flight.id} flight={flight} />)}
      </div>
    </>
  );
};

export default Flight;
