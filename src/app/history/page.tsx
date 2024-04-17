"use client";

import { useState, useEffect } from "react";

// Api
import { getAllBookingsUser } from "@/api/bookings-endpoints";

// Components
import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";
import HistoryCard from "@/components/Card/HistoryCard";
import HistoryDetailCard from "@/components/Card/HistoryDetailCard";

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
  const [bookingData, setBookingData] = useState<BookingData[] | null>(null);
  const [bookingId, setBookingId] = useState<number>(0);
  let prevMonth: string | null = null;
  let prevYear: string | null = null;

  const filteredBooking = bookingData?.find((data) => data.id === bookingId);

  useEffect(() => {
    const fetchData = async () => {
      const bookings = await getAllBookingsUser();
      if (bookings) {
        setBookingData(bookings);
        setBookingId(bookings[0].id);
      }
    };

    fetchData();
  }, []);

  const handleChooseBooking = (idBooking: number) => {
    setBookingId(idBooking);
  };

  return (
    <>
      <Navbar />
      <Topbar />
      <div className="flex w-full justify-between gap-4 px-20 pb-10 pt-4">
        <div className="flex w-[55%] flex-col gap-2">
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
        <div className="w-[40%] pt-3">
          <div className="sticky top-[88px] flex w-full flex-col gap-3">
            <HistoryDetailCard booking={filteredBooking} />
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
