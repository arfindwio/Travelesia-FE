"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface FilterDateInputProp {
  onFilterDateChange: (filterDate: string) => void;
}

const DateFilterButton: React.FC<FilterDateInputProp> = ({ onFilterDateChange }) => {
  const searchParams = useSearchParams();
  const filterDate = searchParams.get("f");

  const [dates] = useState<Date[]>(getFutureDates());
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    function formatDate(dateString: string): string {
      const [day, month, year] = dateString.split(" ");
      const monthIndex = new Date(Date.parse(`${month} 1, ${year}`)).getMonth() + 1;
      const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;
      return `${formattedMonth}/${day}/${year}`;
    }

    if (filterDate) setSelectedDate(formatDate(filterDate));
  }, [filterDate]);

  function getFutureDates(): Date[] {
    const currentDate = new Date();
    const futureDates: Date[] = [];

    for (let i = 0; i < 8; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      futureDates.push(date);
    }

    return futureDates;
  }

  const formatDate = (dateString: string) => {
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [month, day, year] = dateString.split("/");
    const monthIndex: number = parseInt(month, 10) - 1;
    const formattedDate: string = `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;

    return formattedDate;
  };

  return (
    <>
      <div className="flex w-full items-center px-5">
        {dates.map((date, index) => {
          const formattedDate = date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "2-digit", day: "2-digit" });
          const [dayName, monthDate] = formattedDate.split(", ");
          return (
            <div key={index} className="flex w-full items-center">
              <div
                className={`group flex w-full cursor-pointer flex-col gap-2 rounded-lg py-2 text-center  hover:text-neutral-5 ${selectedDate === monthDate ? "bg-primary text-neutral-5" : "hover:bg-primary-3"}`}
                onClick={() => onFilterDateChange(formatDate(monthDate))}
              >
                <p className="text-sm font-bold">{dayName}</p>
                <p className={`text-xs font-bold text-neutral-4 ${selectedDate === monthDate ? "text-neutral-5" : "group-hover:text-neutral-5"}`}>{monthDate}</p>
              </div>
              {index < 7 ? <div className="text w-fit px-2 text-center text-3xl font-thin text-neutral-3">|</div> : null}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DateFilterButton;
