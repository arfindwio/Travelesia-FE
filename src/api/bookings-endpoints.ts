import { API_ENDPOINT } from "./api-endpoints";
import { showErrorToast } from "@/helper/toast-helper";

interface CreateBookingInput {
  flightId: number;
  adult: number;
  child: number;
  baby: number;
  amount: number;
}
interface PayBookingInput {
  flightId: number;
  bookingCode: string;
  methodPayment: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
}

interface PayBookingData {
  payBooking: BookingData;
  transaction: TransactionData;
}

interface TransactionData {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  currency: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  expiry_time: string;
  bank: string;
  redirect_url: string;
  masked_card: string;
  card_type: string;
  channel: string;
  three_ds_version: string;
  on_us: boolean;
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
  createdAt: string;
  flight: FlightData;
  passenger: PassengerData[];
}

interface AirportData {
  airportName: string;
  continent: string;
  country: string;
  city: string;
}

interface TerminalData {
  terminalName: string;
  airport: AirportData;
}

interface AirlineData {
  airlineName: string;
  baggage: number;
  cabinBaggage: number;
}

interface SeatData {
  id: number;
  seatNumber: string;
  isBooked: boolean;
}

interface PromotionData {
  discount: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

interface FlightData {
  id: number;
  flightCode: string;
  flightImg: string;
  seatClass: string;
  price: number;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  airline: AirlineData;
  promotion: PromotionData;
  departureTerminal: TerminalData;
  arrivalTerminal: TerminalData;
  seat: SeatData[];
}

interface PassengerData {
  id: number;
  title: string;
  fullName: string;
  familyName: string;
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

export const getAllBookingsUser = async (): Promise<BookingData[] | false> => {
  try {
    const token = localStorage.getItem("tokenUser");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.BOOKINGS}/payment/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const bookings = await response.json();
      return bookings.data.bookings;
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

export const getAllBookingsUserWithSearch = async (query: string): Promise<BookingData[] | false> => {
  try {
    const token = localStorage.getItem("tokenUser");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.BOOKINGS}/payment/history${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const bookings = await response.json();
      return bookings.data.bookings;
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

export const getBookingsByCode = async (bookingCode: string): Promise<BookingData | false> => {
  try {
    const token = localStorage.getItem("tokenUser");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.BOOKINGS}/${bookingCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const booking = await response.json();
      return booking.data.booking;
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

export const putPayBooking = async (input: PayBookingInput): Promise<PayBookingData | false> => {
  try {
    const token = localStorage.getItem("tokenUser");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${API_ENDPOINT.BOOKINGS}/${input.flightId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookingCode: input.bookingCode,
        methodPayment: input.methodPayment,
        cardNumber: input.cardNumber,
        cvv: input.cvv,
        expiryDate: input.expiryDate,
      }),
    });

    if (response.ok) {
      const booking = await response.json();
      console.log(booking);
      return booking.data;
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
