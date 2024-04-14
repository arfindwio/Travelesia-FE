import { API_ENDPOINT } from "./api-endpoints";
import { showErrorToast } from "@/helper/toast-helper";

interface CreateBookingInput {
  flightId: number;
  adult: number;
  child: number;
  baby: number;
  amount: number;
}

interface BookingData {
  id: number;
  bookingCode: string;
  adult: number;
  child: number;
  baby: number;
  amount: number;
  status: string;
  methodPayment: string;
}

export const postCreateBooking = async (input: CreateBookingInput): Promise<BookingData | false> => {
  try {
    const token = localStorage.getItem("tokenUser");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.BOOKINGS}/${input.flightId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        adult: input.adult,
        child: input.child,
        baby: input.baby,
        amount: input.amount,
      }),
    });

    if (response.ok) {
      const booking = await response.json();
      return booking.data.newBooking;
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
