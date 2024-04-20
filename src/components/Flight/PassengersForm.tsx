"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Helper
import { showLoadingToast } from "@/helper/toast-helper";

// Api
import { postCreatePassenger } from "@/api/passengers-endpoints";

interface PassengersProps {
  index: number;
  type: string;
  createBookingData: CreateBookingData | null;
  completePassengersInput: (completePassengersInput: boolean) => void;
  completeCreatePassengers: (completeCreatePassengers: boolean) => void;
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
interface PassengerInput {
  title: string;
  fullName: string;
  familyName: string;
  bornDate: string;
  citizen: string;
  identityNumber: string;
  publisherCountry: string;
  validUntil: string;
  bookingId: number | null;
}

const PassengersForm: React.FC<PassengersProps> = ({ index, type, createBookingData, completePassengersInput, completeCreatePassengers }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [passengersInput, setPassengersInput] = useState<PassengerInput>({
    title: "Mr.",
    fullName: "",
    familyName: "",
    bornDate: "",
    citizen: "",
    identityNumber: "",
    publisherCountry: "",
    validUntil: "",
    bookingId: createBookingData?.id || null,
  });

  useEffect(() => {
    const handleCreatePassenger = async () => {
      const loadingToastId = showLoadingToast("Loading...");

      const createPassenger = await postCreatePassenger({
        ...passengersInput,
        familyName: isToggled ? passengersInput.familyName : "",
        bookingId: Number(createBookingData?.id),
      });

      toast.dismiss(loadingToastId);

      if (createPassenger) {
        completeCreatePassengers(true);
      }
    };

    if (createBookingData) {
      handleCreatePassenger();
    }
  }, [createBookingData]);

  useEffect(() => {
    completePassengersInput(false);
    if (passengersInput.title && passengersInput.fullName && passengersInput.bornDate && passengersInput.citizen && passengersInput.identityNumber && passengersInput.publisherCountry && passengersInput.validUntil) {
      return completePassengersInput(true);
    } else {
      completePassengersInput(false);
    }
  }, [passengersInput.title, passengersInput.fullName, passengersInput.bornDate, passengersInput.citizen, passengersInput.identityNumber, passengersInput.publisherCountry, passengersInput.validUntil]);

  const handlePassengersInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    const value = e.target.value;

    setPassengersInput((prevPassengersInput) => ({
      ...prevPassengersInput,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4 rounded border-2 border-neutral-4 px-5 py-6">
      <h1 className="text-[20px] font-bold">Passenger Information</h1>
      <h3 className="w-full rounded-t-2xl bg-neutral-1 px-4 py-2 text-base font-medium text-neutral-5">
        Passenger Personal Information {index} - {type}
      </h3>
      <div className="flex flex-col px-4">
        <label htmlFor="title" className="w-fit text-sm font-bold text-primary">
          Title
        </label>
        <select id="title" className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary" value={passengersInput.title} onChange={(e) => handlePassengersInput(e, "title")}>
          <option value="Mr.">Mr.</option>
          <option value="Ms.">Ms.</option>
          <option value="Mrs.">Mrs.</option>
        </select>
      </div>
      <div className="flex flex-col px-4">
        <label htmlFor="fullname" className="w-fit text-sm font-bold text-primary">
          Full Name
        </label>
        <input
          type="text"
          id="fullname"
          className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary"
          placeholder="budi"
          value={passengersInput.fullName}
          onChange={(e) => handlePassengersInput(e, "fullName")}
        />
      </div>
      <div className="flex w-full flex-col gap-2 px-4 ">
        <div className="flex items-center justify-between sm:pr-2">
          <p className="w-[70%] text-base font-normal text-neutral-1">Have Family Name?</p>
          <button className={`h-6 w-12 rounded-full ${isToggled ? "justify-end bg-primary" : "justify-start bg-neutral-4"}`} onClick={() => setIsToggled(!isToggled)}>
            <span className={`inline-block h-5 w-5 translate-y-[10%] transform rounded-full bg-white ${isToggled ? "translate-x-[50%]" : "-translate-x-[50%]"}`} />
          </button>
        </div>
        {isToggled && (
          <div className="flex flex-col">
            <label htmlFor="familyName" className="w-fit text-sm font-bold text-primary">
              Family Name
            </label>
            <input
              type="text"
              id="familyName"
              placeholder="Cahyono"
              className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary"
              value={passengersInput.familyName}
              onChange={(e) => handlePassengersInput(e, "familyName")}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col px-4">
        <label htmlFor="birth" className="w-fit text-sm font-bold text-primary">
          Date of Birth
        </label>
        <input type="date" id="birth" className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary" value={passengersInput.bornDate} onChange={(e) => handlePassengersInput(e, "bornDate")} />
      </div>
      <div className="flex flex-col px-4">
        <label htmlFor="citizen" className="w-fit text-sm font-bold text-primary">
          Citizen
        </label>
        <input
          type="text"
          id="citizen"
          placeholder="Japan"
          className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary"
          value={passengersInput.citizen}
          onChange={(e) => handlePassengersInput(e, "citizen")}
        />
      </div>
      <div className="flex flex-col px-4">
        <label htmlFor="ktp" className="w-fit text-sm font-bold text-primary">
          KTP/Passpor
        </label>
        <input
          type="text"
          id="ktp"
          className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary"
          value={passengersInput.identityNumber}
          onChange={(e) => handlePassengersInput(e, "identityNumber")}
        />
      </div>
      <div className="flex flex-col px-4">
        <label htmlFor="publisherCountry" className="w-fit text-sm font-bold text-primary">
          Publisher Country
        </label>
        <input
          type="text"
          id="publisherCountry"
          className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary"
          value={passengersInput.publisherCountry}
          onChange={(e) => handlePassengersInput(e, "publisherCountry")}
        />
      </div>
      <div className="flex flex-col px-4">
        <label htmlFor="validUntil" className="w-fit text-sm font-bold text-primary">
          Valid Until
        </label>
        <input
          type="date"
          id="validUntil"
          placeholder="hh/bb/tttt"
          className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary"
          value={passengersInput.validUntil}
          onChange={(e) => handlePassengersInput(e, "validUntil")}
        />
      </div>
    </div>
  );
};

export default PassengersForm;
