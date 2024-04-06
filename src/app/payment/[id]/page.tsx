"use client";

import Image from "next/image";
import { useState } from "react";

// Components
import Navbar from "@/components/Navbar";
import FlightDetail from "@/components/Flight/FlightDetail";

// Icons
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

const Payment = ({ params: { id } }: { params: { id: number } }) => {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const handlePaymentMethodClick = (method: string) => {
    setPaymentMethod((prevMethod) => (prevMethod === method ? "" : method));
  };

  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col gap-4 border-b bg-neutral-5 px-20 pb-4 pt-24 shadow-md">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-neutral-1">Personal Information</h2>
          <TbArrowBadgeRightFilled size={20} className="text-neutral-3" />
          <h2 className="text-xl font-bold text-neutral-1">Payment</h2>
          <TbArrowBadgeRightFilled size={20} className="text-neutral-3" />
          <h2 className="text-xl font-bold text-neutral-3">Finish</h2>
        </div>
        <div className="w-full rounded-xl bg-alert-red p-3 text-center">
          <p className="text-base font-medium text-neutral-5">Complete in 15:00</p>
        </div>
      </div>
      <div className="mb-10 mt-8 flex w-full justify-between px-20">
        <div className="flex w-[57%] flex-col gap-4">
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
              className={`${paymentMethod === "Credit Card" ? "bg-primary" : "bg-neutral-1"} flex w-full justify-between rounded px-5 py-4 text-base font-medium text-neutral-5`}
              onClick={() => {
                handlePaymentMethodClick("Credit Card");
              }}
            >
              <p>Credit Card</p>
              {paymentMethod === "Credit Card" ? <MdKeyboardArrowUp size={25} /> : <MdKeyboardArrowDown size={25} />}
            </button>
            {paymentMethod === "Credit Card" && (
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
                  <input type="number" id="cardNumber" placeholder="4480 0000 0000 0000" className="border-b border-neutral-4 px-1 py-1 outline-none" />
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
                    <input type="number" maxLength={3} id="cvv" placeholder="000" className="border-b border-neutral-4 px-1 py-1 outline-none" />
                  </div>
                  <div className="flex w-[47%] flex-col">
                    <label htmlFor="expiryDate" className="text-sm font-medium">
                      Expiry Date
                    </label>
                    <input type="text" id="expiryDate" placeholder="07/24" className="border-b border-neutral-4 px-1 py-1 outline-none" />
                  </div>
                </div>
                <button className="mt-10 w-[90%] rounded-xl bg-primary py-4 text-center text-neutral-5">Pay</button>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-[40%] flex-col gap-2 pt-4">
          <FlightDetail id={id} />
        </div>
      </div>
    </>
  );
};

export default Payment;
