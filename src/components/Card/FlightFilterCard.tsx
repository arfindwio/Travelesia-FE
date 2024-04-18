"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Material UI
import Menu from "@mui/material/Menu";

// Icons
import { MdFlightTakeoff, MdOutlineDateRange, MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { FaCheck, FaChild, FaChildDress, FaBaby } from "react-icons/fa6";

interface PassengersInput {
  [key: string]: number;
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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<string>("/flight");
  const [queryInput, setQueryInput] = useState<QueryInput>({
    departure: "",
    arrival: "",
    date: "",
    passengers: { adult: 1, child: 0, baby: 0 },
    class: "Economy",
  });
  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null);
  const open1 = Boolean(anchorEl1);
  const [anchorEl2, setAnchorEl2] = useState<HTMLElement | null>(null);
  const open2 = Boolean(anchorEl2);

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
    } else if (field === "adult" || field === "child" || field === "baby") {
      setQueryInput((prevQueryInput) => ({
        ...prevQueryInput,
        passengers: {
          ...prevQueryInput.passengers,
          [field]: parseInt(value),
        },
      }));
    } else {
      setQueryInput((prevQueryInput) => ({
        ...prevQueryInput,
        [field]: value,
      }));
    }
  };

  const handleSwapDepartureArrival = () => {
    setQueryInput({
      ...queryInput,
      departure: queryInput.arrival,
      arrival: queryInput.departure,
    });
  };

  const handleButtonInput = (field: string, type: string) => {
    if (type === "decrease") {
      setQueryInput((prevQueryInput) => ({
        ...prevQueryInput,
        passengers: {
          ...prevQueryInput.passengers,
          [field]: Math.max(0, prevQueryInput.passengers[field] - 1),
        },
      }));
    } else {
      setQueryInput((prevQueryInput) => ({
        ...prevQueryInput,
        passengers: {
          ...prevQueryInput.passengers,
          [field]: prevQueryInput.passengers[field] + 1,
        },
      }));
    }
  };

  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleFilter = (type: string) => {
    setAnchorEl1(null);
    setQueryInput((prevQueryInput) => ({
      ...prevQueryInput,
      class: type,
    }));
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl bg-neutral-5 shadow-lg">
        <div className="flex flex-col gap-5 px-5 py-5 sm:px-10 sm:py-7">
          <h1 className="text-lg font-bold">
            Choose Special Flight Schedules on <span className="text-primary-3">Travelesia!</span>
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex w-full flex-col items-center justify-between gap-2 rounded-xl border-2 p-4 sm:flex-row sm:rounded-none sm:border-none sm:p-0">
              <div className="flex w-full items-center justify-between gap-5 sm:w-[45%]">
                <div className="flex items-center gap-3 sm:w-auto sm:gap-1">
                  <MdFlightTakeoff size={25} className="text-neutral-3" />
                  <p className="text-sm font-light text-neutral-3">From</p>
                </div>
                <input
                  type="text"
                  className="w-[80%] bg-transparent text-base font-medium outline-none sm:w-full sm:border-b-2 sm:pb-3 lg:text-lg"
                  placeholder="Jakarta (JKT)"
                  value={queryInput.departure}
                  onChange={(e) => handleQueryInput(e, "departure")}
                />
              </div>
              {isMobile ? (
                <div className="flex w-full items-center justify-end gap-3">
                  <div className="w-[85%] border-t-2"></div>
                  <Image src="/Return.svg" alt="Return Logo" width={0} height={0} className="w-8 cursor-pointer" onClick={handleSwapDepartureArrival} />
                </div>
              ) : (
                <Image src="/Return.svg" alt="Return Logo" width={0} height={0} className="w-8 cursor-pointer" onClick={handleSwapDepartureArrival} />
              )}
              <div className="flex w-full items-center justify-between gap-5 sm:w-[45%]">
                <div className="flex items-center gap-3 sm:w-auto sm:gap-1">
                  <MdFlightTakeoff size={25} className="text-neutral-3" />
                  <p className="text-sm font-light text-neutral-3">To</p>
                </div>
                <input
                  type="text"
                  className="w-[80%] text-base font-medium outline-none sm:w-full sm:border-b-2 sm:pb-3 lg:text-lg"
                  placeholder="Melbourne (MLB)"
                  value={queryInput.arrival}
                  onChange={(e) => handleQueryInput(e, "arrival")}
                />
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
              <div className="flex w-full items-center sm:w-[45%] sm:gap-5">
                <div className="flex w-[15%] items-center gap-1 sm:w-auto">
                  <MdOutlineDateRange size={25} className="text-neutral-3" />
                  <p className="text-sm font-light text-neutral-3">Date</p>
                </div>
                <div className="flex w-[85%] flex-col sm:w-full">
                  <p className="text-sm font-light text-neutral-3">Departure</p>
                  <input type="date" className="w-full border-b-2 pb-3 text-sm font-medium outline-none lg:text-base" placeholder="1 Maret 2023" onChange={(e) => handleQueryInput(e, "date")} />
                </div>
              </div>
              <div className="flex w-full items-center justify-between sm:w-[45%] sm:gap-5">
                <div className="flex w-[15%] items-center gap-1 sm:w-auto">
                  <MdOutlineAirlineSeatReclineNormal size={25} className="text-neutral-3" />
                  <p className="text-sm font-light text-neutral-3">To</p>
                </div>
                <div className="flex w-[85%] justify-between">
                  <div className="flex w-[49%] flex-col">
                    <p className="text-sm font-light text-neutral-3">Passengers</p>
                    <button className="w-full break-all border-b-2 pb-3 text-start text-sm font-medium outline-none lg:text-base" onClick={handleClick2}>
                      {queryInput.passengers.adult + queryInput.passengers.child + queryInput.passengers.baby} Passengers
                    </button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl2}
                      open={open2}
                      onClose={() => {
                        setAnchorEl2(null);
                      }}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <div className="w-full sm:w-[25rem]">
                        <div className="pr-3">
                          <button className="ms-auto flex w-fit justify-end text-end text-2xl font-medium" onClick={() => setAnchorEl2(null)}>
                            X
                          </button>
                        </div>
                        <div className="border-t-2">
                          <div className="flex flex-col p-3">
                            <div className="flex w-full items-center justify-between border-b-2 py-3">
                              <div className="flex w-[48%] items-start gap-1">
                                <FaChild size={20} />
                                <div className="flex w-full flex-col gap-1">
                                  <h5 className="text-sm font-bold">Adult</h5>
                                  <p className="text-xs font-normal">(12 years or older)</p>
                                </div>
                              </div>
                              <div className="flex h-full w-1/2 justify-between">
                                <button
                                  className={`${queryInput.passengers.adult === 0 ? "border-neutral-4 text-neutral-4" : "border-primary text-neutral-1"} w-[25%] rounded border p-3 text-xl`}
                                  onClick={() => handleButtonInput("adult", "decrease")}
                                >
                                  -
                                </button>
                                <input type="number" min={0} value={queryInput.passengers.adult} step={1} className="w-[40%] border text-center outline-none focus:border-primary" onChange={(e) => handleQueryInput(e, "adult")} />
                                <button className="w-[25%] rounded border border-primary p-3 text-xl text-neutral-1" onClick={() => handleButtonInput("adult", "increase")}>
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="flex w-full items-center justify-between border-b-2 py-3">
                              <div className="flex w-[48%] items-start gap-1">
                                <FaChildDress size={20} />
                                <div className="flex w-full flex-col gap-1">
                                  <h5 className="text-sm font-bold">Child</h5>
                                  <p className="text-xs font-normal"> (2 - 11 years old)</p>
                                </div>
                              </div>
                              <div className="flex h-full w-1/2 justify-between">
                                <button
                                  className={`${queryInput.passengers.child === 0 ? "border-neutral-4 text-neutral-4" : "border-primary text-neutral-1"} w-[25%] rounded border p-3 text-xl`}
                                  onClick={() => handleButtonInput("child", "decrease")}
                                >
                                  -
                                </button>
                                <input type="number" min={0} value={queryInput.passengers.child} step={1} className="w-[40%] border text-center outline-none focus:border-primary" onChange={(e) => handleQueryInput(e, "child")} />
                                <button className="w-[25%] rounded border border-primary p-3 text-xl text-neutral-1" onClick={() => handleButtonInput("child", "increase")}>
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="flex w-full items-center justify-between border-b-2 py-3">
                              <div className="flex w-[48%] items-start gap-1">
                                <FaBaby size={20} />
                                <div className="flex w-full flex-col gap-1">
                                  <h5 className="text-sm font-bold">Baby</h5>
                                  <p className="text-xs font-normal"> (Under 2 years old)</p>
                                </div>
                              </div>
                              <div className="flex h-full w-1/2 justify-between">
                                <button
                                  className={`${queryInput.passengers.baby === 0 ? "border-neutral-4 text-neutral-4" : "border-primary text-neutral-1"} w-[25%] rounded border p-3 text-xl`}
                                  onClick={() => handleButtonInput("baby", "decrease")}
                                >
                                  -
                                </button>
                                <input type="number" min={0} value={queryInput.passengers.baby} step={1} className="w-[40%] border text-center outline-none focus:border-primary" onChange={(e) => handleQueryInput(e, "baby")} />
                                <button className="w-[25%] rounded border border-primary p-3 text-xl text-neutral-1" onClick={() => handleButtonInput("baby", "increase")}>
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Menu>
                  </div>
                  <div className="flex w-[49%] flex-col sm:w-[49%]">
                    <p className="text-sm font-light text-neutral-3">Seat Class</p>
                    <button className="w-full border-b-2 pb-3 text-start text-sm font-medium outline-none lg:text-base" onClick={handleClick1}>
                      {queryInput.class}
                    </button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl1}
                      open={open1}
                      onClose={() => {
                        setAnchorEl1(null);
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
        </div>
        <Link href={queryParams} scroll={false} onClick={() => localStorage.setItem("passengers", JSON.stringify(queryInput.passengers))}>
          <button className="w-full bg-primary py-2 text-base font-bold text-neutral-5 hover:bg-primary-hover">Search Flight</button>
        </Link>
      </div>
    </>
  );
};

export default FlightFilterCard;
