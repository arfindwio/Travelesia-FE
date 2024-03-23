import Image from "next/image";

// Components
import OtpInput from "@/components/Auth/OtpInput";

// icons
import { IoArrowBack } from "react-icons/io5";

const Otp = () => {
  return (
    <>
      <div className="flex">
        <div className="flex min-h-screen w-1/2 items-center justify-center gap-4 bg-gradient-to-b from-primary from-15% via-primary-3 via-65% to-primary-5">
          <Image src="/TravelesiaLogo.svg" alt="Travelesia Logo" width={180} height={37} />
          <h1 className="font-sans text-6xl text-neutral-5">Travelesia</h1>
        </div>
        <div className="flex w-1/2 items-center px-[10%]">
          <form className="flex w-full flex-col gap-2">
            <div className="relative flex items-center">
              <IoArrowBack size={25} className="left-0 top-2" />
              <p className="ms-2 text-lg">Back</p>
            </div>
            <h1 className="mb-4 text-2xl font-bold">Input OTP</h1>
            <div className="flex flex-col gap-4 text-center">
              <p className="text-sm">
                Type the 6 digit code sent to <span className="font-bold">b*****@gmail.com</span>
              </p>
              <OtpInput />
              <p className="text-sm">Resend OTP in 60 seconds</p>
            </div>
            <button className="mt-10 w-full rounded-2xl bg-primary py-2 text-neutral-5 hover:bg-primary-hover">Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Otp;
