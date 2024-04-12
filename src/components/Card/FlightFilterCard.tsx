"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Material UI
import Menu from "@mui/material/Menu";

// Icons
import { MdFlightTakeoff, MdOutlineDateRange, MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

interface PassengersInput {
  adult: number;
  child: number;
  baby: number;
}
interface QueryInput {
  departure: string;
  arrival: string;
  date: string;
  passengers: PassengersInput;
  class: string;
}

const FlightFilterCard = () => {
  const [queryParams, setQueryParams] = useState<string>("/flight");
  const [queryInput, setQueryInput] = useState<QueryInput>({
    departure: "",
    arrival: "",
    date: "",
    passengers: { adult: 1, child: 0, baby: 0 },
    class: "Economy",
  });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const passengersJSON = localStorage.getItem("passengers");
    if (passengersJSON) localStorage.removeItem("passengers");

    if (queryInput.departure || queryInput.arrival || queryInput.date || queryInput.class) {
      let formatQuery = "/flight?";
      if (queryInput.departure) {
        formatQuery += `d=${queryInput.departure}&`;
      }
      if (queryInput.arrival) {
        formatQuery += `a=${queryInput.arrival}&`;
      }
      if (queryInput.date) {
        formatQuery += `f=${queryInput.date}&`;
      }
      if (queryInput.class) {
        formatQuery += `s=${queryInput.class}&`;
      }
      formatQuery = formatQuery.replace(/&$/, "");
      setQueryParams(formatQuery);
    }
  }, [queryInput]);

  const formatDate = (inputDate: string): string => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const parts = inputDate.split("-");
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    return `${day} ${months[month - 1]} ${year}`;
  };

  const handleQueryInput = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;

    if (field === "date") {
      setQueryInput((prevQueryInput) => ({
        ...prevQueryInput,
        [field]: formatDate(value),
      }));
    } else {
      setQueryInput((prevQueryInput) => ({
        ...prevQueryInput,
        [field]: value,
      }));
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilter = (type: string) => {
    setAnchorEl(null);
    setQueryInput((prevQueryInput) => ({
      ...prevQueryInput,
      class: type,
    }));
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl bg-neutral-5 shadow-lg">
        <div className="flex flex-col gap-5 px-10 py-7">
          <h1 className="text-lg font-bold">
            Choose Special Flight Schedules on <span className="text-primary-3">Travelesia!</span>
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex w-[45%] items-center gap-5">
                <div className="flex items-center gap-1">
                  <MdFlightTakeoff size={25} className="text-neutral-3" />
                  <p className="text-sm font-light text-neutral-3">From</p>
                </div>
                <input type="text" className="w-full border-b-2 bg-transparent pb-3 font-medium outline-none" placeholder="Melbourne (MLB)" value={queryInput.departure} onChange={(e) => handleQueryInput(e, "departure")} />
              </div>
              <Image src="/Return.svg" alt="Return Logo" width={30} height={1} className="cursor-pointer" />
              <div className="flex w-[45%] items-center gap-5">
                <div className="flex items-center gap-1">
                  <MdFlightTakeoff size={25} className="text-neutral-3" />
                  <p className="text-sm font-light text-neutral-3">To</p>
                </div>
                <input type="text" className="w-full border-b-2 pb-3 font-medium outline-none" placeholder="Melbourne (MLB)" value={queryInput.arrival} onChange={(e) => handleQueryInput(e, "arrival")} />
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex w-[45%] items-center gap-5">
                <div className="flex items-center gap-1">
                  <MdOutlineDateRange size={25} className="text-neutral-3" />
                  <p className="text-sm font-light text-neutral-3">Date</p>
                </div>
                <div className="flex w-full flex-col">
                  <p className="text-sm font-light text-neutral-3">Departure</p>
                  <input type="date" className="w-full border-b-2 pb-3 font-medium outline-none" placeholder="1 Maret 2023" onChange={(e) => handleQueryInput(e, "date")} />
                </div>
              </div>
              <div className="flex w-[45%] items-center gap-5">
                <div className="flex items-center gap-1">
                  <MdOutlineAirlineSeatReclineNormal size={25} className="text-neutral-3" />
                  <p className="text-sm font-light text-neutral-3">To</p>
                </div>
                <div className="flex w-[45%] flex-col">
                  <p className="text-sm font-light text-neutral-3">Passengers</p>
                  <input type="text" className="w-full border-b-2 pb-3 font-medium outline-none" value={`${queryInput.passengers.adult + queryInput.passengers.baby + queryInput.passengers.baby} Passengers`} placeholder="2 Passengers" />
                </div>
                <div className="flex w-[45%] flex-col">
                  <p className="text-sm font-light text-neutral-3">Seat Class</p>
                  <button className="w-full border-b-2 pb-3 text-start font-medium outline-none" onClick={handleClick}>
                    {queryInput.class}
                  </button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => {
                      setAnchorEl(null);
                    }}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <div className="p-2">
                      <div
                        onClick={() => handleFilter("Economy")}
                        className={`${queryInput.class === "Economy" ? `bg-primary text-neutral-5` : ""} flex w-[18rem] cursor-pointer items-center justify-between border-b-2 px-3 py-2 hover:bg-primary hover:text-neutral-5`}
                      >
                        <p className="text-sm font-bold">Economy</p>
                        {queryInput.class === "Economy" && (
                          <div className="rounded-full bg-alert-green p-1">
                            <FaCheck size={15} className="text-neutral-5" />
                          </div>
                        )}
                      </div>
                      <div
                        onClick={() => handleFilter("Premium Economy")}
                        className={`${queryInput.class === "Premium Economy" ? `bg-primary text-neutral-5` : ""} flex w-[18rem] cursor-pointer items-center justify-between border-b-2 px-3 py-2 hover:bg-primary hover:text-neutral-5`}
                      >
                        <p className="text-sm font-bold">Premium Economy</p>
                        {queryInput.class === "Premium Economy" && (
                          <div className="rounded-full bg-alert-green p-1">
                            <FaCheck size={15} className="text-neutral-5" />
                          </div>
                        )}
                      </div>
                      <div
                        onClick={() => handleFilter("Business")}
                        className={`${queryInput.class === "Business" ? `bg-primary text-neutral-5` : ""} flex w-[18rem] cursor-pointer items-center justify-between border-b-2 px-3 py-2 hover:bg-primary hover:text-neutral-5`}
                      >
                        <p className="text-sm font-bold">Business</p>
                        {queryInput.class === "Business" && (
                          <div className="rounded-full bg-alert-green p-1">
                            <FaCheck size={15} className="text-neutral-5" />
                          </div>
                        )}
                      </div>
                      <div
                        onClick={() => handleFilter("First Class")}
                        className={`${queryInput.class === "First Class" ? `bg-primary text-neutral-5` : ""} flex w-[18rem] cursor-pointer items-center justify-between border-b-2 px-3 py-2 hover:bg-primary hover:text-neutral-5`}
                      >
                        <p className="text-sm font-bold">First Class</p>
                        {queryInput.class === "First Class" && (
                          <div className="rounded-full bg-alert-green p-1">
                            <FaCheck size={15} className="text-neutral-5" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link href={queryParams} onClick={() => localStorage.setItem("passengers", JSON.stringify(queryInput.passengers))}>
          <button className="w-full bg-primary py-2 text-base font-bold text-neutral-5 hover:bg-primary-hover">Search Flight</button>
        </Link>
      </div>
    </>
  );
};

export default FlightFilterCard;
