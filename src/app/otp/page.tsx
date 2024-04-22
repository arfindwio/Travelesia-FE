"use client";

import Image from "next/image";
import { useState, useEffect, KeyboardEvent, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Api
import { putVerifyOtpUser, putResendOtpUser } from "@/api/users-endpoints";

// Helper
import { showSuccessToast, showLoadingToast, showErrorToast } from "@/helper/toast-helper";

// Components
import OtpInput from "@/components/Auth/OtpInput";

// icons
import { IoArrowBack } from "react-icons/io5";

const Otp: React.FC = () => {
  const router = useRouter();

  const [valueEmail, setValueEmail] = useState<null | string>(null);
  const [finalOtp, setFinalOtp] = useState<string>("");
  const [countdown, setCountdown] = useState(60);

  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem("email");

    if (storedValue) {
      if (!valueEmail) {
        setValueEmail(storedValue);
      }
      localStorage.removeItem("email");
    } else if (!valueEmail) {
      router.back();
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => Math.max(prevCountdown - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const maskEmail = (email: string): string => {
    const prefix: string = email.substring(0, email.indexOf("@"));
    const maskedPrefix: string = prefix.length > 1 ? prefix.charAt(0) + "*".repeat(prefix.length - 1) : prefix;
    const maskedEmail: string = maskedPrefix + email.substring(email.indexOf("@"));

    return maskedEmail;
  };

  const handleVerifyOtp = async (e: KeyboardEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    if ((e as KeyboardEvent<HTMLFormElement>).key === "Enter" || e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");
      let verifyOtp: boolean = false;

      if (valueEmail && finalOtp) verifyOtp = await putVerifyOtpUser({ email: valueEmail, otp: finalOtp });

      toast.dismiss(loadingToastId);

      if (!verifyOtp) showErrorToast("Verify OTP Failed");
      if (verifyOtp) {
        showSuccessToast("verify OTP successful");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    }
  };

  const handleResendOtp = async (e: MouseEvent<HTMLButtonElement>) => {
    if (e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");
      let resendOtp: boolean = false;

      if (valueEmail) resendOtp = await putResendOtpUser({ email: valueEmail });

      toast.dismiss(loadingToastId);

      if (!resendOtp) showErrorToast("Resend OTP Failed");
      if (resendOtp) {
        showSuccessToast("Resend OTP successful");
        setCountdown(60);
      }
    }
  };

  const handleOtpChange = (otp: string) => {
    setFinalOtp(otp);
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden min-h-screen items-center justify-center gap-4 bg-gradient-to-b from-primary from-15% via-primary-3 via-65% to-primary-5 md:flex md:w-1/2">
        <Image src="/TravelesiaLogo.svg" alt="Travelesia Logo" width={1} height={1} className="w-1/3" />
        <h1 className="font-sans text-neutral-5 md:text-5xl lg:text-6xl">Travelesia</h1>
      </div>
      <div className="flex w-full items-center px-[10%] md:w-1/2 md:px-10 lg:px-20 xl:px-[10%]">
        <form className="flex w-full flex-col gap-2" onKeyDown={handleVerifyOtp}>
          <button className="relative flex w-fit items-center" onClick={() => router.back()}>
            <IoArrowBack size={25} className="left-0 top-2" />
            <p className="ms-2 text-lg">Back</p>
          </button>
          <h1 className="mb-4 text-2xl font-bold">Input OTP</h1>
          <div className="flex flex-col gap-4 text-center">
            <p className="text-sm">
              Type the 6 digit code sent to <span className="font-bold">{valueEmail ? maskEmail(valueEmail) : ""}</span>
            </p>
            <OtpInput onOtpChange={handleOtpChange} />
            {countdown > 0 ? (
              <p className="text-sm">Resend OTP in {countdown} seconds</p>
            ) : (
              <button className="mx-auto w-fit text-base font-semibold text-primary-3" onClick={handleResendOtp}>
                Resend OTP
              </button>
            )}
          </div>
          <button className="mt-10 w-full rounded-2xl bg-primary py-2 text-neutral-5 hover:bg-primary-hover" onClick={handleVerifyOtp}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
