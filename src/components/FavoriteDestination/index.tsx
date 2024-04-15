"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

// Api
import { getFlights, getFlightsQuery } from "@/api/flights-endpoints";

// Components
import DestinationFilterButton from "./DestinationFilterButton";
import DestinationCard from "./DestinationCard";

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

const FavoriteDestination = () => {
  const searchParams = useSearchParams();

  const [flights, setFlights] = useState<FlightData[] | null>(null);

  const continent = searchParams.get("c");

  useEffect(() => {
    const fetchFlightData = async () => {
      if (continent) {
        const flights = await getFlightsQuery(`?c=${continent}`);
        if (flights) setFlights(flights);
      } else {
        const flights = await getFlights();
        if (flights) setFlights(flights);
      }
    };

    fetchFlightData();
  }, [continent]);

  return (
    <>
      <h1 className="text-base font-bold">Favorite Destination</h1>
      <DestinationFilterButton />
      <div className="flex justify-start gap-5">{flights && flights.map((flight) => <DestinationCard key={flight.id} flight={flight} />)}</div>
    </>
  );
};

export default FavoriteDestination;
