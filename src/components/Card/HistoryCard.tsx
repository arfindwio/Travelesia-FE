import Image from "next/image";
import { useState } from "react";

// Icons
import { FaLocationDot } from "react-icons/fa6";

interface BookingProps {
  idBooking: number;
  booking: BookingData | null;
  date: string;
  ChooseBookingDetail: (ChooseBookingDetail: number) => void;
}

interface BookingData {
  id: number;
  bookingCode: string;
  adult: number;
  child: number;
  baby: number;
  amount: number;
  status: string;
  methodPayment: string;
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

const HistoryCard: React.FC<BookingProps> = ({ idBooking, booking, date, ChooseBookingDetail }) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <>
      <h1 className="text-base font-bold">{date}</h1>
      <div
        className={`${booking?.id === idBooking ? "border-primary-3" : "border-neutral-4 hover:border-primary-3"} flex cursor-pointer flex-col gap-3 rounded-[10px] border-2 p-2 shadow-lg sm:gap-6 sm:p-4`}
        onClick={() => ChooseBookingDetail(booking?.id || 0)}
      >
        <p className={`${booking?.status === "Paid" ? "bg-alert-green" : "bg-alert-red"} w-fit rounded-full px-2 py-1 text-xs text-neutral-5 sm:px-4 sm:text-sm`}>{booking?.status}</p>
        <div className="flex items-center justify-between">
          <div className="flex w-fit gap-2  sm:w-[30%] md:w-[20%]">
            <FaLocationDot size={25} className="mt-1 text-neutral-3" />
            <div className="flex flex-col gap-1">
              <h5 className="font-bold sm:text-sm">{booking?.flight.departureTerminal.airport.city}</h5>
              <p className="text-xs font-medium">{`${booking?.flight.departureTime.split(" ")[1]} ${booking?.flight.departureTime.split(" ")[2]} ${booking?.flight.departureTime.split(" ")[3]}`}</p>
              <p className="text-xs font-medium">{booking?.flight.departureTime.split(" ")[0]}</p>
            </div>
          </div>
          <div className="flex w-[35%] flex-col items-center justify-center text-center sm:w-[37%] sm:text-start md:w-[55%]">
            <p className="text-xs font-medium text-neutral-3">{formatDuration(Number(booking?.flight?.duration))}</p>
            <Image src="/LongArrow.svg" alt="Long Arrow" width={1} height={1} className="w-full" />
          </div>
          <div className="flex w-fit gap-2 sm:w-[30%] md:w-[20%]">
            <FaLocationDot size={25} className="mt-1 text-neutral-3" />
            <div className="flex flex-col gap-1">
              <h5 className="text-sm font-bold">{booking?.flight.arrivalTerminal.airport.city}</h5>
              <p className="text-xs font-medium">{`${booking?.flight.arrivalTime.split(" ")[1]} ${booking?.flight.arrivalTime.split(" ")[2]} ${booking?.flight.arrivalTime.split(" ")[3]}`}</p>
              <p className="text-xs font-medium">{booking?.flight.arrivalTime.split(" ")[0]}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t-2 border-neutral-4 pt-3">
          <div className="flex w-[35%] flex-col gap-1 sm:w-auto">
            <h5 className="text-[10px] font-bold sm:text-xs">Booking Code:</h5>
            <p className="break-all text-[10px] font-normal sm:text-xs">{booking?.bookingCode}</p>
          </div>
          <div className="flex w-[35%]  flex-col gap-1 sm:w-auto">
            <h5 className="text-[10px] font-bold sm:text-xs">Class:</h5>
            <p className="text-[10px] font-normal sm:text-xs">{booking?.flight.seatClass}</p>
          </div>
          <h4 className="w-[25%] text-center text-xs font-bold sm:w-auto sm:text-start sm:text-base">
            IDR {booking && ((booking?.adult * booking?.flight.price + booking?.child * booking?.flight.price + booking?.baby * booking?.flight.price) * 1.11).toLocaleString("id-ID")}
          </h4>
        </div>
      </div>
    </>
  );
};

export default HistoryCard;
