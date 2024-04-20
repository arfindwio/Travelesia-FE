"use client";

import { useRouter } from "next/navigation";

// Icons
import { GiLotus } from "react-icons/gi";

interface BookingProps {
  booking?: BookingData;
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

const HistoryDetailCard: React.FC<BookingProps> = ({ booking }) => {
  const router = useRouter();

  const handlePayTicket = () => {
    localStorage.setItem("bookingCode", booking?.bookingCode || "");
    router.push(`/payment/${booking?.flight.id}`);
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Detail Booking</h1>
          <p className={`${booking?.status === "Unpaid" ? "bg-alert-red" : "bg-alert-green"} w-fit rounded-full px-4 py-1 text-sm text-neutral-5 print:text-lg print:font-bold print:text-green-200`}>{booking?.status}</p>
        </div>
        <h1 className="text-lg">
          Booking Code: <span className="font-bold text-primary">{booking?.bookingCode}</span>
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h5 className="text-base font-bold">{booking?.flight.departureTime.split(" ")[0]}</h5>
          <p className="text-xs font-bold text-primary-3">Departure</p>
        </div>
        <p className="text-sm font-normal">{`${booking?.flight.departureTime.split(" ")[1]} ${booking?.flight.departureTime.split(" ")[2]} ${booking?.flight.departureTime.split(" ")[3]}`}</p>
        <p className="text-sm font-medium">
          {booking?.flight.departureTerminal.airport.airportName} - {booking?.flight.departureTerminal.terminalName}
        </p>
      </div>
      <div className="sm:px-4 print:px-0">
        <div className="flex w-full items-center gap-2 border-y-2 border-neutral-4 py-2">
          <GiLotus size={25} className="text-alert-yellow" />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">
                {booking?.flight.airline.airlineName} - {booking?.flight.seatClass}
              </h5>
              <h5 className="text-sm font-bold">{booking?.flight.flightCode}</h5>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm font-bold">Information:</h5>
              {booking?.passenger.map((data, index) => (
                <div key={data.id}>
                  <p className="text-sm font-medium text-primary-hover">
                    Passenger {index + 1}: {data.title} {data.fullName}
                  </p>
                  <p className="text-sm font-normal text-primary-hover">ID: {data.id}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h5 className="text-base font-bold">{booking?.flight.arrivalTime.split(" ")[0]}</h5>
          <p className="text-xs font-bold text-primary-3">Arrival</p>
        </div>
        <p className="text-sm font-normal">{`${booking?.flight.arrivalTime.split(" ")[1]} ${booking?.flight.arrivalTime.split(" ")[2]} ${booking?.flight.arrivalTime.split(" ")[3]}`}</p>
        <p className="text-sm font-medium">{booking?.flight.arrivalTerminal.airport.airportName}</p>
      </div>
      <div className="sm:px-4 print:px-0">
        <div className="flex flex-col gap-2 border-y-2 border-neutral-4 py-2">
          <h5 className="text-sm font-bold">Pricing Details</h5>
          {booking?.adult !== 0 && (
            <div className="flex items-center justify-between">
              <p className="text-sm">{booking?.adult} Adult</p>
              <p className="text-sm">IDR {booking?.adult && (booking?.adult * booking?.flight.price).toLocaleString("id-ID")}</p>
            </div>
          )}
          {booking?.child !== 0 && (
            <div className="flex items-center justify-between">
              <p className="text-sm">{booking?.child} Child</p>
              <p className="text-sm">IDR {booking?.child && (booking?.child * booking?.flight.price).toLocaleString("id-ID")}</p>
            </div>
          )}
          {booking?.baby !== 0 && (
            <div className="flex items-center justify-between">
              <p className="text-sm">{booking?.baby} Baby</p>
              <p className="text-sm">IDR {booking?.baby && (booking?.baby * booking?.flight.price).toLocaleString("id-ID")}</p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <p className="text-sm">Tax 11%</p>
            <p className="text-sm">IDR {booking && ((booking?.adult * booking?.flight.price + booking?.child * booking?.flight.price + booking?.baby * booking?.flight.price) * 0.11).toLocaleString("id-ID")}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h5 className="text-base font-bold">Total</h5>
          <h1 className="text-lg font-bold text-primary">IDR {booking && ((booking?.adult * booking?.flight.price + booking?.child * booking?.flight.price + booking?.baby * booking?.flight.price) * 1.11).toLocaleString("id-ID")}</h1>
        </div>
      </div>
      {booking?.status === "Unpaid" ? (
        <button className="mt-6 rounded-xl bg-alert-green py-4 font-normal text-neutral-5 hover:bg-green-600" onClick={() => handlePayTicket()}>
          Pay Ticket
        </button>
      ) : (
        <button className="mt-6 rounded-xl bg-primary py-4 font-normal text-neutral-5 hover:bg-primary-hover print:hidden" onClick={() => window.print()}>
          Print Ticket
        </button>
      )}
    </>
  );
};

export default HistoryDetailCard;
