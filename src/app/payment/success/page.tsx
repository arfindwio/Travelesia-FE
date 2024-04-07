import Image from "next/image";
import Link from "next/link";

// Components
import Navbar from "@/components/Navbar";

// Icons
import { TbArrowBadgeRightFilled } from "react-icons/tb";

const PaymentSuccess = () => {
  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col gap-4 border-b bg-neutral-5 px-20 pb-4 pt-24 shadow-md">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-neutral-1">Personal Information</h2>
          <TbArrowBadgeRightFilled size={20} className="text-neutral-3" />
          <h2 className="text-xl font-bold text-neutral-1">Payment</h2>
          <TbArrowBadgeRightFilled size={20} className="text-neutral-3" />
          <h2 className="text-xl font-bold text-neutral-1">Finish</h2>
        </div>
        <div className="w-full rounded-xl bg-alert-green p-3 text-center">
          <p className="text-base font-medium text-neutral-5">Thank you for your payment transaction</p>
        </div>
      </div>
      <div className="mx-auto flex flex-col items-center justify-center gap-2 py-8">
        <Image src="/paymentSuccessLogo.svg" alt="Payment Success" width={1} height={1} className="w-[15%]" />
        <div className="w-full text-center">
          <p className="text-sm font-medium text-primary">Congratulations!</p>
          <p className="text-sm font-medium">Ticket Payment Transaction Successful!</p>
        </div>
        <div className="mx-auto mt-6 flex w-full flex-col items-center justify-center gap-3">
          <Link href="/history" className="w-[20rem] rounded-xl bg-primary py-3 text-center text-neutral-5">
            Check Payment History
          </Link>
          <Link href="/" className="w-[20rem] rounded-xl bg-primary-4 py-3 text-center text-neutral-5">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
