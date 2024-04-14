"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Helper
import { showErrorToast, showLoadingToast, showSuccessToast } from "@/helper/toast-helper";

// Components
import Navbar from "@/components/Navbar";
import Seat from "@/components/Flight/Seat";
import FlightDetail from "@/components/Flight/FlightDetail";
import PassengersForm from "@/components/Flight/PassengersForm";

// Api
import { getAuthenticateUser } from "@/api/users-endpoints";
import { postCreateBooking } from "@/api/bookings-endpoints";
import { getFlightById } from "@/api/flights-endpoints";

// Icons
import { TbArrowBadgeRightFilled } from "react-icons/tb";

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
  airline: AirlineData;
  promotion: string;
  departureTerminal: TerminalData;
  arrivalTerminal: TerminalData;
  seat: SeatData[];
}
interface PassengersValue {
  adult: number;
  child: number;
  baby: number;
}
interface FormComplete {
  passengers: boolean;
  seats: boolean;
  isComplete: boolean;
}
interface UserProfileData {
  fullName: string;
  phoneNumber: string;
}

interface UserData {
  email: string;
  userProfile: UserProfileData;
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

interface CompleteCreate {
  passengers: boolean;
  seats: boolean;
}

const FlightId = ({ params: { id } }: { params: { id: number } }) => {
  const router = useRouter();

  const [formComplete, setFormComplete] = useState<FormComplete>({
    passengers: false,
    seats: false,
    isComplete: false,
  });
  const [completeCreate, setCompleteCreate] = useState<CompleteCreate>({
    passengers: false,
    seats: false,
  });
  const [passengersValue, setPassengersValue] = useState<PassengersValue | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [createBookingData, setCreateBookingData] = useState<CreateBookingData | null>(null);

  useEffect(() => {
    if (completeCreate.passengers && completeCreate) {
      localStorage.setItem("bookingCode", createBookingData?.bookingCode || "");
      router.push(`/payment/${id}`);
    }
  }, [completeCreate, id]);

  useEffect(() => {
    if (!formComplete.passengers || !formComplete.seats) {
      setFormComplete((prevFormComplete) => ({
        ...prevFormComplete,
        isComplete: false,
      }));
    }
  }, [formComplete.passengers, formComplete.seats]);

  useEffect(() => {
    const passengersJSON = localStorage.getItem("passengers");

    if (passengersJSON) {
      const passengers = JSON.parse(passengersJSON);
      setPassengersValue({
        adult: passengers.adult,
        child: passengers.child,
        baby: passengers.baby,
      });
    }

    const fetchUserData = async () => {
      const user = await getAuthenticateUser();
      if (user) {
        setUserData(user);
      }
    };

    const fetchFlightData = async () => {
      const flight = await getFlightById(id);
      if (flight) {
        setFlightData(flight);
      }
    };

    fetchFlightData();

    fetchUserData();
  }, []);

  const handleCreateBooking = async () => {
    const adultPrice = passengersValue && flightData ? Number(passengersValue.adult) * Number(flightData.price) : 0;
    const childPrice = passengersValue && flightData ? Number(passengersValue.child) * Number(flightData.price) : 0;
    const babyPrice = passengersValue && flightData ? Number(passengersValue.baby) * Number(flightData.price) : 0;

    const amount = adultPrice + childPrice + babyPrice * 1.11;

    const loadingToastId = showLoadingToast("Loading...");

    console.log(Number(passengersValue?.adult));

    const createBooking = await postCreateBooking({
      flightId: id,
      adult: Number(passengersValue?.adult),
      child: Number(passengersValue?.child),
      baby: Number(passengersValue?.baby),
      amount: amount,
    });

    toast.dismiss(loadingToastId);

    if (!createBooking) showErrorToast("Booking Failed");

    if (createBooking) {
      setCreateBookingData(createBooking);
    }
  };

  const handleSeatsChoose = (completeChooseSeats: boolean) => {
    setFormComplete((prevFormComplete) => ({
      ...prevFormComplete,
      seats: completeChooseSeats,
    }));
  };

  const handlePassengersInput = (completePassengersInput: boolean) => {
    setFormComplete((prevFormComplete) => ({
      ...prevFormComplete,
      passengers: completePassengersInput,
    }));
  };

  const handleButtonComplete = () => {
    setFormComplete((prevFormComplete) => ({
      ...prevFormComplete,
      isComplete: true,
    }));
  };

  const handleCreatePassengers = (completeCreatePassengers: boolean) => {
    setCompleteCreate((prevCompleteCreate) => ({
      ...prevCompleteCreate,
      passengers: completeCreatePassengers,
    }));
  };

  const handleCreateSeats = (completeCreateSeats: boolean) => {
    setCompleteCreate((prevCompleteCreate) => ({
      ...prevCompleteCreate,
      seats: completeCreateSeats,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col gap-4 border-b bg-neutral-5 px-20 pb-4 pt-24 shadow-md">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Personal Information</h2>
          <TbArrowBadgeRightFilled size={20} className="text-neutral-3" />
          <h2 className="text-xl font-bold text-neutral-3">Payment</h2>
          <TbArrowBadgeRightFilled size={20} className="text-neutral-3" />
          <h2 className="text-xl font-bold text-neutral-3">Finish</h2>
        </div>
        <div className="w-full rounded-xl bg-alert-red p-3 text-center">
          <p className="text-base font-medium text-neutral-5">Complete in 15:00</p>
        </div>
      </div>
      <div className="mb-10 mt-8 flex w-full justify-between px-20">
        <div className="flex w-[57%] flex-col gap-6">
          <div className="flex flex-col gap-4 rounded border-2 border-neutral-4 px-5 py-6">
            <h1 className="text-[20px] font-bold">Customer Data</h1>
            <h3 className="w-full rounded-t-2xl bg-neutral-1 px-4 py-2 text-base font-medium text-neutral-5">Customer Personal Information</h3>
            <div className="flex flex-col px-4">
              <label htmlFor="fullname" className="w-fit text-sm font-bold text-primary">
                Full Name
              </label>
              <input type="text" id="fullname" className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal text-neutral-3 outline-none focus:border-primary" value={userData?.userProfile.fullName} disabled />
            </div>
            <div className="flex flex-col px-4">
              <label htmlFor="phoneNumber" className="w-fit text-sm font-bold text-primary">
                Phone Number
              </label>
              <input type="number" id="phoneNumber" value={userData?.userProfile.phoneNumber} className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal text-neutral-3 outline-none focus:border-primary" disabled />
            </div>
            <div className="flex flex-col px-4">
              <label htmlFor="email" className="w-fit text-sm font-bold text-primary">
                Email
              </label>
              <input type="email" id="email" value={userData?.email} className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal text-neutral-3 outline-none focus:border-primary" disabled />
            </div>
          </div>
          {passengersValue?.adult !== 0 &&
            [...Array(passengersValue?.adult)].map((_, index) => (
              <PassengersForm key={index} index={index + 1} type={"adult"} createBookingData={createBookingData} completePassengersInput={handlePassengersInput} completeCreatePassengers={handleCreatePassengers} />
            ))}
          {passengersValue?.child !== 0 &&
            [...Array(passengersValue?.child)].map((_, index) => (
              <PassengersForm key={index} index={index + 1} type={"child"} createBookingData={createBookingData} completePassengersInput={handlePassengersInput} completeCreatePassengers={handleCreatePassengers} />
            ))}
          {passengersValue?.baby !== 0 &&
            [...Array(passengersValue?.baby)].map((_, index) => (
              <PassengersForm key={index} index={index + 1} type={"baby"} createBookingData={createBookingData} completePassengersInput={handlePassengersInput} completeCreatePassengers={handleCreatePassengers} />
            ))}
          <Seat
            id={id}
            countPassengers={(passengersValue?.adult ?? 0) + (passengersValue?.child ?? 0) + (passengersValue?.baby ?? 0)}
            createBookingData={createBookingData}
            completeChooseSeats={handleSeatsChoose}
            completeCreateSeats={handleCreateSeats}
          />
          <button
            className={`${formComplete.passengers && formComplete.seats && !formComplete.isComplete ? "bg-primary" : "cursor-default bg-neutral-4"} mx-auto w-[95%] rounded-xl py-3 text-neutral-5`}
            onClick={formComplete.passengers && formComplete.seats ? handleButtonComplete : undefined}
            disabled={!formComplete.passengers || !formComplete.seats || formComplete.isComplete}
          >
            Save
          </button>
        </div>
        <div className="flex w-[40%] flex-col gap-2 pt-4">
          <FlightDetail id={id} passengers={passengersValue} flightData={flightData} />
          {formComplete.passengers && formComplete.seats && formComplete.isComplete && (
            <button className="mx-auto mt-6 w-[95%] rounded-xl bg-alert-red py-4 font-normal text-neutral-5 hover:bg-red-600" onClick={() => handleCreateBooking()}>
              Continue Payment
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default FlightId;
