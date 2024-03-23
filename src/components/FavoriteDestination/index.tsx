// Components
import DestinationFilterButton from "./DestinationFilterButton";
import DestinationCard from "./DestinationCard";

const FavoriteDestination = () => {
  return (
    <>
      <h1 className="text-base font-bold">Favorite Destination</h1>
      <DestinationFilterButton />
      <div className="flex justify-between gap-2">
        <DestinationCard />
      </div>
    </>
  );
};

export default FavoriteDestination;
