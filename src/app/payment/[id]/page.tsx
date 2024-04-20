"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Api
import { getBookingsByCode, putPayBooking } from "@/api/bookings-endpoints";

// Helper
import { showErrorToast, showLoadingToast, showSuccessToast } from "@/helper/toast-helper";

// Components
import Navbar from "@/components/Navbar";
import FlightDetail from "@/components/Flight/FlightDetail";

// Icons
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

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

interface PaymentInput {
  flightId: number;
  bookingCode: string;
  methodPayment: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
}

const Payment = ({ params: { id } }: { params: { id: number } }) => {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState<number>(3600);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [paymentInput, setPaymentInput] = useState<PaymentInput>({
    flightId: id,
    bookingCode: "",
    methodPayment: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  useEffect(() => {
    const storedValue = localStorage.getItem("bookingCode");

    if (storedValue) {
      if (!paymentInput.bookingCode) {
        setPaymentInput((prevPaymentInput) => ({
          ...prevPaymentInput,
          bookingCode: storedValue,
        }));
      }
      localStorage.removeItem("bookingCode");
    }
    // else if (!bookingCode) {
    //   router.push("/");
    // }

    const fetchData = async () => {
      const booking = await getBookingsByCode(paymentInput.bookingCode);
      if (booking) {
        setBookingData(booking);
      }
    };

    fetchData();
  }, [paymentInput.bookingCode, router]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePaymentMethodClick = (method: string) => {
    setPaymentInput((prevPaymentInput) => ({
      ...prevPaymentInput,
      methodPayment: prevPaymentInput.methodPayment === method ? "" : method,
    }));
  };

  const handlePaymentInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    const value = e.target.value;

    if (field === "cardNumber") {
      const maxLength = 16;
      const inputValue = value.replace(/\D/g, "");
      const formattedValue =
        inputValue
          .substring(0, maxLength)
          .match(/.{1,4}/g)
          ?.join(" ") || "";
      setPaymentInput((prevPaymentInput) => ({
        ...prevPaymentInput,
        cardNumber: formattedValue,
      }));
    }

    if (field === "cvv") {
      const inputValue = value.replace(/\D/g, "");
      setPaymentInput((prevPaymentInput) => ({
        ...prevPaymentInput,
        cvv: inputValue.substring(0, 3),
      }));
    }

    if (field === "expiryDate") {
      const maxLength = 4;
      const inputValue = value.replace(/\D/g, "");
      const formattedValue =
        inputValue
          .substring(0, maxLength)
          .match(/.{1,2}/g)
          ?.join("/") || "";
      setPaymentInput((prevPaymentInput) => ({
        ...prevPaymentInput,
        expiryDate: formattedValue,
      }));
    }
  };

  const hnadlePayBooking = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const payment = await putPayBooking(paymentInput);

    toast.dismiss(loadingToastId);

    if (!payment) showErrorToast("Pay Tickeet Failed");

    if (payment) {
      showSuccessToast("Pay Ticket Successful");
      setTimeout(() => {
        window.location.href = payment.transaction.redirect_url;
      }, 1000);
    }
  };

  console.log(paymentInput);

  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col gap-2 border-b bg-neutral-5 pb-4 shadow-md sm:gap-4 sm:px-10 sm:pt-24 lg:px-20">
        <div className="flex items-center gap-2 bg-primary py-1 sm:bg-neutral-5 sm:py-0">
          <IoArrowBack size={25} className="w-fit cursor-pointer pl-6 text-neutral-5 sm:hidden" onClick={() => router.back()} />
          <h2 className="hidden text-xl font-bold text-neutral-1 sm:block">Personal Information</h2>
          <TbArrowBadgeRightFilled size={20} className="hidden text-neutral-3 sm:block" />
          <h2 className="text-xl font-bold text-neutral-5 sm:px-0 sm:text-neutral-1">Payment</h2>
          <TbArrowBadgeRightFilled size={20} className="hidden text-neutral-3 sm:block" />
          <h2 className="hidden text-xl font-bold text-neutral-3 sm:block">Finish</h2>
        </div>
        <div className="mx-auto w-[92%] rounded-xl bg-alert-red p-3 text-center sm:w-full">
          <p className="text-base font-medium text-neutral-5">Complete in {formatTime(timeLeft)}</p>
        </div>
      </div>
      <div className="mb-10 mt-8 flex w-full flex-col justify-between px-10 sm:flex-row lg:px-20">
        <div className="flex w-full flex-col gap-4 sm:w-[57%]">
          <h1 className="text-[20px] font-bold">Choose Payment Method</h1>

          <div className="flex flex-col gap-2">
            <button className="flex w-full justify-between rounded bg-neutral-1 px-5 py-4 text-base font-medium text-neutral-5">
              <p>Gopay</p>
              <MdKeyboardArrowDown size={25} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <button className="flex w-full justify-between rounded bg-neutral-1 px-5 py-4 text-base font-medium text-neutral-5">
              <p>Virtual Account</p>
              <MdKeyboardArrowDown size={25} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className={`${paymentInput.methodPayment === "Credit Card" ? "bg-primary" : "bg-neutral-1"} flex w-full justify-between rounded px-5 py-4 text-base font-medium text-neutral-5`}
              onClick={() => {
                handlePaymentMethodClick("Credit Card");
              }}
            >
              <p>Credit Card</p>
              {paymentInput.methodPayment === "Credit Card" ? <MdKeyboardArrowUp size={25} /> : <MdKeyboardArrowDown size={25} />}
            </button>
            {paymentInput.methodPayment === "Credit Card" && (
              <div className="flex flex-col items-center justify-center gap-5 pt-6">
                <div className="flex w-full justify-center gap-4">
                  <Image src="/mastercardLogo.svg" alt="Master Card Logo" width={1} height={1} className="w-[8%]" />
                  <Image src="/visaLogo.svg" alt="Visa Logo" width={1} height={1} className="w-[8%]" />
                  <Image src="/amexLogo.svg" alt="American Express Logo" width={1} height={1} className="w-[8%]" />
                  <Image src="/paypalLogo.svg" alt="Paypal Logo" width={1} height={1} className="w-[8%]" />
                </div>
                <div className="flex w-[70%] flex-col gap-2">
                  <label htmlFor="cardNumber" className="text-sm font-medium">
                    Card Number
                  </label>
                  <input type="text" id="cardNumber" placeholder="4480 0000 0000 0000" className="border-b border-neutral-4 px-1 py-1 outline-none" value={paymentInput.cardNumber} onChange={(e) => handlePaymentInput(e, "cardNumber")} />
                </div>
                <div className="flex w-[70%] flex-col gap-2">
                  <label htmlFor="cardHolder" className="text-sm font-medium">
                    Card Holder Name
                  </label>
                  <input type="text" id="cardHolder" placeholder="Budi Cahyono" className="border-b border-neutral-4 px-1 py-1 outline-none" />
                </div>
                <div className="flex w-[70%] justify-between gap-2">
                  <div className="flex w-[47%] flex-col">
                    <label htmlFor="cvv" className="text-sm font-medium">
                      CVV
                    </label>
                    <input type="number" maxLength={3} id="cvv" placeholder="000" className="border-b border-neutral-4 px-1 py-1 outline-none" value={paymentInput.cvv} onChange={(e) => handlePaymentInput(e, "cvv")} />
                  </div>
                  <div className="flex w-[47%] flex-col">
                    <label htmlFor="expiryDate" className="text-sm font-medium">
                      Expiry Date
                    </label>
                    <input type="text" id="expiryDate" placeholder="07/24" className="border-b border-neutral-4 px-1 py-1 outline-none" value={paymentInput.expiryDate} onChange={(e) => handlePaymentInput(e, "expiryDate")} />
                  </div>
                </div>
                <button className="mt-10 w-[90%] rounded-xl bg-primary py-4 text-center text-neutral-5" onClick={() => hnadlePayBooking()}>
                  Pay
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mb-10 mt-8 flex w-full flex-col gap-2 rounded-md border-2 p-4 sm:mb-0 sm:mt-0 sm:w-[40%] sm:rounded-none sm:border-0 sm:p-0">
          <FlightDetail id={id} passengers={{ adult: Number(bookingData?.adult), child: Number(bookingData?.child), baby: Number(bookingData?.baby) }} flightData={bookingData?.flight || null} />
        </div>
      </div>
    </>
  );
};

export default Payment;
