"use client";

import { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";

// Icons
import { LuArrowDownUp } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";

interface FilterInputProp {
  onFilterChange: (filter: string) => void;
}

const SortFilterButton: React.FC<FilterInputProp> = ({ onFilterChange }) => {
  const [filter, setFilter] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilter = (filter: string) => {
    setAnchorEl(null);
    setFilter(filter);
    onFilterChange(filter);
  };

  return (
    <>
      <button
        className="group ml-auto flex w-fit cursor-pointer items-center rounded-full border-2 border-primary-3 bg-neutral-5 py-2 pl-2 pr-3 hover:border-neutral-5 hover:bg-primary sm:py-3 sm:pl-4 sm:pr-6"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <LuArrowDownUp size={20} className="w-10 text-primary-3 group-hover:text-neutral-5 sm:w-auto" />
        <p className="pl-2 text-xs font-semibold text-primary-3 group-hover:text-neutral-5 sm:text-sm">{filter ? filter : "Sort"}</p>
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
        <div className="py-2">
          <div onClick={() => handleFilter("cheapest")} className={`${filter === "cheapest" ? `bg-primary text-neutral-5` : ""} flex w-[18rem] cursor-pointer hover:bg-primary hover:text-neutral-5`}>
            <div className="mx-3 flex w-full items-center justify-between border-b-2 py-2">
              <p className="text-sm">
                <span className="font-bold">Price </span>- Cheapest
              </p>
              {filter === "cheapest" ? (
                <div className="rounded-full bg-alert-green p-1">
                  <FaCheck size={15} className="text-neutral-5" />
                </div>
              ) : null}
            </div>
          </div>
          <div onClick={() => handleFilter("duration")} className={`${filter === "duration" ? `bg-primary text-neutral-5` : ""} flex w-[18rem] cursor-pointer hover:bg-primary hover:text-neutral-5`}>
            <div className="mx-3 flex w-full items-center justify-between border-b-2 py-2">
              <p className="text-sm">
                <span className="font-bold">Duration </span>- Sort Duration
              </p>
              {filter === "duration" ? (
                <div className="rounded-full bg-alert-green p-1">
                  <FaCheck size={15} className="text-neutral-5" />
                </div>
              ) : null}
            </div>
          </div>
          <div onClick={() => handleFilter("earliest departure")} className={`${filter === "earliest departure" ? `bg-primary text-neutral-5` : ""} flex w-[18rem] cursor-pointer hover:bg-primary hover:text-neutral-5`}>
            <div className="mx-3 flex w-full items-center justify-between border-b-2 py-2">
              <p className="text-sm">
                <span className="font-bold">Departure </span>- Earliest
              </p>
              {filter === "earliest departure" ? (
                <div className="rounded-full bg-alert-green p-1">
                  <FaCheck size={15} className="text-neutral-5" />
                </div>
              ) : null}
            </div>
          </div>
          <div onClick={() => handleFilter("latest departure")} className={`${filter === "latest departure" ? `bg-primary text-neutral-5` : ""} flex w-[18rem] cursor-pointer hover:bg-primary hover:text-neutral-5`}>
            <div className="mx-3 flex w-full items-center justify-between border-b-2 py-2">
              <p className="text-sm">
                <span className="font-bold">Departure </span>- Latest
              </p>
              {filter === "latest departure" ? (
                <div className="rounded-full bg-alert-green p-1">
                  <FaCheck size={15} className="text-neutral-5" />
                </div>
              ) : null}
            </div>
          </div>
          <div onClick={() => handleFilter("earliest arrival")} className={`${filter === "earliest arrival" ? `bg-primary text-neutral-5` : ""} flex w-[18rem] cursor-pointer hover:bg-primary hover:text-neutral-5`}>
            <div className="mx-3 flex w-full items-center justify-between border-b-2 py-2">
              <p className="text-sm">
                <span className="font-bold">Arrival </span>- Earliest
              </p>
              {filter === "earliest arrival" ? (
                <div className="rounded-full bg-alert-green p-1">
                  <FaCheck size={15} className="text-neutral-5" />
                </div>
              ) : null}
            </div>
          </div>
          <div onClick={() => handleFilter("latest arrival")} className={`${filter === "latest arrival" ? `bg-primary text-neutral-5` : ""} flex w-[18rem] cursor-pointer hover:bg-primary hover:text-neutral-5`}>
            <div className="mx-3 flex w-full items-center justify-between border-b-2 py-2">
              <p className="text-sm">
                <span className="font-bold">Arrival </span>- Latest
              </p>
              {filter === "latest arrival" ? (
                <div className="rounded-full bg-alert-green p-1">
                  <FaCheck size={15} className="text-neutral-5" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Menu>
    </>
  );
};

export default SortFilterButton;
