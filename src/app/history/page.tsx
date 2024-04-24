"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Api
import { getAllBookingsUser, getAllBookingsUserWithSearch } from "@/api/bookings-endpoints";

// Components
import Navbar from "@/components/Navbar";
import HistoryCard from "@/components/Card/HistoryCard";
import HistoryDetailCard from "@/components/Card/HistoryDetailCard";

// Icons
import { IoArrowBack } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";

interface BookingData {
  id: number;
  bookingCode: string;
  adult: number;
  child: number;
  baby: number;
  amount: number;
  status: string;
  methodPayment: string;
  createdAt: string;
  flight: FlightData;
  passenger: PassengerData[];
}

interface FlightData {
  id: number;
  flightCode: string;
  seatClass: string;
  price: number;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  airline: AirlineData;
  departureTerminal: TerminalData;
  arrivalTerminal: TerminalData;
}

interface AirlineData {
  airlineName: string;
}

interface TerminalData {
  terminalName: string;
  airport: AirportData;
}

interface AirportData {
  airportName: string;
  city: string;
}

interface PassengerData {
  id: number;
  title: string;
  fullName: string;
  familyName: string;
}

const History = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState<BookingData[]>([]);
  const [bookingId, setBookingId] = useState<number>(0);
  const [searchMenu, setSearchMenu] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);

  let prevMonth: string | null = null;
  let prevYear: string | null = null;

  const filteredBooking = bookingData?.find((data) => data.id === bookingId);

  useEffect(() => {
    const fetchData = async () => {
      const bookings = await getAllBookingsUser();
      if (bookings) {
        setBookingData(bookings);
        if (bookings.length) setBookingId(bookings[0].id);
      }
    };
    const fetchDataWithQuery = async () => {
      const bookings = await getAllBookingsUserWithSearch(`?search=${searchValue}`);
      if (bookings) {
        setBookingData(bookings);
        if (bookings.length) setBookingId(bookings[0].id);
      }
    };

    if (searchValue) {
      fetchDataWithQuery();
    } else {
      fetchData();
    }
  }, [searchValue]);

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
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChooseBooking = (idBooking: number) => {
    setBookingId(idBooking);
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const keyword = searchRef.current?.value;

    if (!keyword || keyword.trim() === "") return;

    if (event.type === "click" || (event.type === "keydown" && (event as React.KeyboardEvent<HTMLInputElement>).key === "Enter")) {
      event.preventDefault();
      setSearchValue(keyword);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col gap-4 border-b bg-neutral-5 px-6 pb-4 pt-5 sm:px-10 sm:pt-24 sm:shadow-md lg:px-20 print:hidden">
        <h1 className="text-2xl font-bold sm:text-xl">Payment History</h1>
        {!isMobile && (
          <div className="flex items-center justify-between gap-4">
            <div className={`flex w-[97%] items-center rounded-xl bg-primary-3 px-3 py-4 text-neutral-5`}>
              <Link href="/" scroll={false} className="flex w-fit">
                <IoArrowBack size={25} />
                <p className="pl-2 text-base font-bold">Homepage</p>
              </Link>
            </div>
            <button className="group cursor-pointer rounded-full p-2 hover:bg-primary-3" onClick={() => setSearchMenu(!searchMenu)}>
              <LuSearch size={30} className="text-primary group-hover:text-neutral-5" />
            </button>
            {searchMenu && (
              <div className="absolute right-10 top-48 z-10 flex w-[25rem] justify-between rounded-md border bg-neutral-5 px-4 py-2 shadow-sm">
                <div className="relative w-[93%]">
                  <input type="text" className="w-full rounded-2xl border py-2 pl-14 pr-4 outline-none" placeholder="Search..." ref={searchRef} onKeyDown={handleSearch} />
                  <LuSearch size={25} className="absolute left-4 top-2 cursor-pointer text-neutral-3" onClick={() => handleSearch} />
                </div>
                <button className="w-fit text-2xl" onClick={() => setSearchMenu(!searchMenu)}>
                  X
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {bookingData?.length ? (
        <div className="flex w-full flex-col justify-between gap-4 px-6 pb-20 pt-4 sm:flex-row sm:px-10 sm:pb-10 lg:px-20">
          <div className="flex w-full flex-col gap-3 rounded-md border-2 p-5 sm:hidden print:hidden">
            <HistoryDetailCard booking={filteredBooking} />
          </div>
          <div className="flex w-full flex-col gap-2 pt-2 sm:w-[55%] sm:pt-0 print:hidden">
            {bookingData?.map((booking) => {
              const departureDate = new Date(booking.createdAt);
              const month = departureDate.toLocaleString("default", { month: "long" });
              const year = departureDate.getFullYear().toString();

              const renderMonth = prevMonth !== month || prevYear !== year;

              prevMonth = month;
              prevYear = year;
              return <HistoryCard key={booking.id} idBooking={bookingId} booking={booking} date={renderMonth ? `${month} ${year}` : ""} ChooseBookingDetail={handleChooseBooking} />;
            })}
          </div>
          <div className="hidden sm:block sm:w-[40%] sm:pt-3 print:w-full">
            <div className="flex w-full flex-col gap-3 sm:sticky sm:top-0">
              <HistoryDetailCard booking={filteredBooking} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center">
          <h1 className="text-xl font-extrabold italic text-neutral-4 sm:text-3xl">- No Transaction History -</h1>
        </div>
      )}
    </>
  );
};

export default History;
