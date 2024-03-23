// Icons
import { LuSearch } from "react-icons/lu";

const DestinationFilterButton = () => {
  return (
    <div className="flex gap-3">
      <button className="flex w-fit gap-2 rounded-xl border bg-primary px-6 py-3 text-neutral-5">
        <LuSearch size={20} />
        <p className="text-sm font-normal">All</p>
      </button>
      <button className="flex w-fit gap-2 rounded-xl border bg-primary-4 px-6 py-3 text-neutral-2 hover:bg-primary-3 hover:text-neutral-5">
        <LuSearch size={20} />
        <p className="text-sm font-normal">Asia</p>
      </button>
    </div>
  );
};

export default DestinationFilterButton;
