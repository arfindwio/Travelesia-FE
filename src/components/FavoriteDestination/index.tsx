"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";

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

interface PromotionData {
  discount: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
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
  updatedAt: string;
  airline: AirlineData;
  promotion: PromotionData;
  departureTerminal: TerminalData;
  arrivalTerminal: TerminalData;
  seat: SeatData[];
}

const FavoriteDestination = () => {
  const searchParams = useSearchParams();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [flights, setFlights] = useState<FlightData[] | null>(null);

  const continent = searchParams.get("c");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);

    mediaQuery.addListener(handleMediaQueryChange);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

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
      {flights?.length && (
        <>
          <h1 className="text-lg font-bold sm:text-xl">Favorite Destination</h1>
          <DestinationFilterButton />
          <Swiper slidesPerView={isMobile ? 3 : 5} centeredSlides={false} spaceBetween={10} grabCursor={true} className="flex w-full overflow-x-auto">
            {flights &&
              flights.map((flight) => (
                <SwiperSlide key={flight.id} className="pb-3">
                  <DestinationCard flight={flight} />
                </SwiperSlide>
              ))}
          </Swiper>
        </>
      )}
    </>
  );
};

export default FavoriteDestination;
