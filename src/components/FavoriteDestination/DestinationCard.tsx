import Image from "next/image";
import { useRouter } from "next/navigation";

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

const DestinationCard = ({ flight }: { flight: FlightData }) => {
  const router = useRouter();

  const getDate = (inputDate: string): string => {
    const date = new Date(inputDate);
    const day = date.getDate().toString();

    return day;
  };

  const formatDate = (inputDate: string): string => {
    const date = new Date(inputDate);

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(date);

    return formattedDate;
  };

  return (
    <>
      <div className="flex w-full cursor-pointer flex-col gap-[2px] border p-2 shadow-md" onClick={() => router.push(`/flight/${flight.id}`)}>
        <Image src="/ImageFlight.svg" alt="Image Flight" width={1} height={1} className="w-full" />
        <p className="text-sm font-medium">
          {flight.departureTerminal.airport.city} -&gt; {flight.arrivalTerminal.airport.city}
        </p>
        <p className="text-xs font-bold text-primary">{flight.airline.airlineName}</p>
        <p className="text-xs">
          {getDate(flight.departureTime)} - {formatDate(flight.arrivalTime)}
        </p>
        <p className="text-sm">
          Price <span className="font-bold text-alert-red">{flight.price}</span>
        </p>
      </div>
    </>
  );
};

export default DestinationCard;
