// Api
import { getFlights } from "@/api/flights-endpoints";

// Components
import DestinationFilterButton from "./DestinationFilterButton";
import DestinationCard from "./DestinationCard";

const FavoriteDestination = async () => {
  const flights = await getFlights();
  return (
    <>
      <h1 className="text-base font-bold">Favorite Destination</h1>
      <DestinationFilterButton />
      <div className="flex justify-start gap-5">{flights && flights.map((flight) => <DestinationCard key={flight.id} flight={flight} />)}</div>
    </>
  );
};

export default FavoriteDestination;
