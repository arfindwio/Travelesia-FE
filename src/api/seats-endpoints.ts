import { API_ENDPOINT } from "./api-endpoints";
import { showErrorToast } from "@/helper/toast-helper";

interface SeatData {
  id: number;
  seatNumber: string;
  isBooked: boolean;
}

interface ReserveSeatInput {
  seatId: number;
  bookingId: number;
}

export const getSeats = async (flightId: number): Promise<SeatData[] | false> => {
  try {
    const token = localStorage.getItem("tokenUser");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.SEATS}/${flightId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const seats = await response.json();
      return seats.data.seats;
    } else {
      const errorMessage = await response.json();
      showErrorToast(errorMessage.message);
      return false;
    }
  } catch (error) {
    showErrorToast("An unexpected error occurred");
    return false;
  }
};

export const putReserveSeat = async (input: ReserveSeatInput): Promise<boolean> => {
  try {
    const token = localStorage.getItem("tokenUser");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.SEATS}/${input.seatId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookingId: input.bookingId }),
    });

    if (response.ok) {
      return true;
    } else {
      const errorMessage = await response.json();
      showErrorToast(errorMessage.message);
      return false;
    }
  } catch (error) {
    showErrorToast("An unexpected error occurred");
    return false;
  }
};
