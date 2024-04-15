"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Api
import { getAirports } from "@/api/airports-endpoints";

// Icons
import { LuSearch } from "react-icons/lu";

interface AirportData {
  id: number;
  airportName: string;
  continent: string;
  country: string;
  city: string;
}

const DestinationFilterButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [airports, setAirports] = useState<AirportData[] | null>(null);

  const continent = searchParams.get("c");

  useEffect(() => {
    const fetchAirportData = async () => {
      const airports = await getAirports();
      if (airports) setAirports(airports);
    };

    fetchAirportData();
  }, []);

  return (
    <div className="flex gap-3">
      <button className={`${!continent ? "bg-primary text-neutral-5" : "bg-primary-4 hover:bg-primary-3 hover:text-neutral-5"} flex w-fit gap-2 rounded-xl border  px-6 py-3 `} onClick={() => router.push(`/`)}>
        <LuSearch size={20} />
        <p className="text-sm font-normal">All</p>
      </button>
      {airports &&
        airports
          .filter((airport, index, self) => self.findIndex((a) => a.continent === airport.continent) === index)
          .map((airport) => (
            <button
              key={airport.id}
              className={`${continent === airport.continent ? "bg-primary text-neutral-5" : "bg-primary-4 hover:bg-primary-3 hover:text-neutral-5"} flex w-fit gap-2 rounded-xl border px-6 py-3 text-neutral-2`}
              onClick={() => router.push(`?c=${airport.continent}`)}
            >
              <LuSearch size={20} />
              <p className="text-sm font-normal">{airport.continent}</p>
            </button>
          ))}
    </div>
  );
};

export default DestinationFilterButton;
