"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Helper
import { showLoadingToast } from "@/helper/toast-helper";

// Api
import { getSeats, putReserveSeat } from "@/api/seats-endpoints";

interface SeatProps {
  id: number;
  countPassengers: number;
  createBookingData: CreateBookingData | null;
  completeChooseSeats: (completeChooseSeats: boolean) => void;
  completeCreateSeats: (completeCreateSeats: boolean) => void;
}

interface CreateBookingData {
  id: number;
  bookingCode: string;
  adult: number;
  child: number;
  baby: number;
  amount: number;
  status: string;
  methodPayment: string;
}

interface SeatData {
  id: number;
  seatNumber: string;
  isBooked: boolean;
}

const Seat: React.FC<SeatProps> = ({ id, countPassengers, createBookingData, completeChooseSeats, completeCreateSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const [seatData, setSeatData] = useState<SeatData[] | null>(null);
  let passengerNumber: number = 1;

  useEffect(() => {
    const fetchSeatData = async () => {
      const seats = await getSeats(id);
      if (seats) {
        setSeatData(seats);
      }
    };

    fetchSeatData();
  }, [id]);

  const toggleSeatSelection = (seatId: number) => {
    if (selectedSeats.length < countPassengers || selectedSeats.includes(seatId)) {
      if (selectedSeats.includes(seatId)) {
        setSelectedSeats((prevSelectedSeats) => {
          const newSelectedSeats = prevSelectedSeats.filter((id) => id !== seatId);
          if (newSelectedSeats.length === countPassengers) {
            completeChooseSeats(true);
          } else {
            completeChooseSeats(false);
          }
          return newSelectedSeats;
        });
      } else {
        setSelectedSeats((prevSelectedSeats) => {
          const newSelectedSeats = [...prevSelectedSeats, seatId];
          if (newSelectedSeats.length === countPassengers) {
            completeChooseSeats(true);
          } else {
            completeChooseSeats(false);
          }
          return newSelectedSeats;
        });
      }
    }
  };

  useEffect(() => {
    if (createBookingData) {
      const loadingToastId = showLoadingToast("Loading...");
      const reserveSeatPromises = selectedSeats.map(async (seatId) => {
        return await putReserveSeat({
          seatId: seatId,
          bookingId: createBookingData.id,
        });
      });

      toast.dismiss(loadingToastId);

      if (reserveSeatPromises) {
        completeCreateSeats(true);
      }
    }
  }, [createBookingData]);

  return (
    <div className="flex flex-col gap-4 rounded border-2 border-neutral-4 px-5 py-6">
      <h1 className="text-[20px] font-bold">Customer Data</h1>
      <h3 className="rounded-sm bg-alert-green py-2 text-center text-sm font-medium text-neutral-5">Economy - {seatData?.length} Seats Available</h3>
      <div className="items-centerjustify-center mx-auto flex w-[55%] flex-col">
        <div className="mx-auto flex w-full items-center justify-evenly text-center text-neutral-4">
          <div className="flex w-[14%] justify-center">
            <p className="h-10 w-10">A</p>
          </div>
          <div className="flex w-[14%] justify-center">
            <p className="h-10 w-10">B</p>
          </div>
          <div className="flex w-[14%] justify-center">
            <p className="h-10 w-10">C</p>
          </div>
          <div className="flex w-[14%] justify-center">
            <p className="h-full w-full"></p>
          </div>
          <div className="flex w-[14%] justify-center">
            <p className="h-10 w-10">D</p>
          </div>
          <div className="flex w-[14%] justify-center">
            <p className="h-10 w-10">E</p>
          </div>
          <div className="flex w-[14%] justify-center">
            <p className="h-10 w-10">F</p>
          </div>
        </div>
        <div className="mx-auto flex w-full flex-wrap items-center justify-evenly text-center">
          {seatData?.map((seat, index) => (
            <>
              <div key={seat.id} className="mb-3 flex w-[14%] justify-center" onClick={() => (!seat.isBooked ? toggleSeatSelection(seat.id) : null)}>
                <p className={`${selectedSeats.includes(seat.id) && "bg-primary"} ${seat.isBooked ? "bg-neutral-4" : "bg-alert-green"} flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-neutral-5 text-opacity-70`}>
                  {seat.isBooked && "X"}
                  {selectedSeats.includes(seat.id) && `P${passengerNumber++}`}
                </p>
              </div>
              {index % 6 === 2 && (
                <div className="mb-3 flex w-[14%] justify-center">
                  <p className="flex h-10 w-fit items-center justify-center rounded-md bg-slate-100 px-1 text-center text-neutral-3">{index % 6 === 2 && Math.floor(index / 6) + 1}</p>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Seat;
