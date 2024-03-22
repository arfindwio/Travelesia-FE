"use client";

import { useState } from "react";

const DateFilterButton = () => {
  const [dates] = useState<Date[]>(getFutureDates());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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

  return (
    <div className="flex w-full items-center px-5">
      {dates.map((date, index) => {
        const formattedDate = date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "2-digit", day: "2-digit" });
        const [dayName, monthDate] = formattedDate.split(", ");
        return (
          <div key={index} className="flex w-full items-center">
            <div
              className={`group flex w-full cursor-pointer flex-col gap-2 rounded-lg py-2 text-center  hover:text-neutral-5 ${selectedDate === monthDate ? "bg-primary text-neutral-5" : "hover:bg-primary-3"}`}
              onClick={() => setSelectedDate(monthDate)}
            >
              <p className="text-sm font-bold">{dayName}</p>
              <p className={`text-xs font-bold text-neutral-4 ${selectedDate === monthDate ? "text-neutral-5" : "group-hover:text-neutral-5"}`}>{monthDate}</p>
            </div>
            {index < 7 ? <div className="text w-fit px-2 text-center text-3xl font-thin text-neutral-3">|</div> : null}
          </div>
        );
      })}
    </div>
  );
};

export default DateFilterButton;
