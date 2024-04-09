"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Helper
import { showSuccessToast, showLoadingToast, showErrorToast } from "@/helper/toast-helper";

// Api
import { postForgetPasswordUser } from "@/api/users-endpoints";

// Icons
import { IoArrowBack } from "react-icons/io5";

const ForgetPassword = () => {
  const router = useRouter();

  const [inputEmail, setInputEmail] = useState<string>("");
  const [validateEmail, setValidateEmail] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputEmail(value);

    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidator.test(value)) {
      setValidateEmail("Invalid email format");
    } else {
      setValidateEmail("");
    }
  };

  const handleForgetPassword = async () => {
    if (validateEmail) return showErrorToast(validateEmail);
    if (!inputEmail) return showErrorToast("All fields are required");

    const loadingToastId = showLoadingToast("Loading...");

    const forgetPassword = await postForgetPasswordUser({ email: inputEmail });

    toast.dismiss(loadingToastId);

    if (!forgetPassword) showErrorToast("Registration Failed");

    if (forgetPassword) {
      showSuccessToast("Email sent successfully!");
    }
  };

  return (
    <div className="flex">
      <div className="flex min-h-screen w-1/2 items-center justify-center gap-4 bg-gradient-to-b from-primary from-15% via-primary-3 via-65% to-primary-5">
        <Image src="/TravelesiaLogo.svg" alt="Travelesia Logo" width={180} height={37} />
        <h1 className="font-sans text-6xl text-neutral-5">Travelesia</h1>
      </div>
      <div className="flex w-1/2 items-center px-[10%]">
        <div className="flex w-full flex-col gap-2" onKeyDown={(e) => (e.key === "Enter" ? handleForgetPassword() : "")}>
          <button className="relative flex w-fit items-center" onClick={() => router.back()}>
            <IoArrowBack size={25} className="left-0 top-2" />
            <p className="ms-2 text-lg">Back</p>
          </button>
          <h1 className="mb-4 text-2xl font-bold">Forget Password</h1>
          <div className="flex w-full flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className={`${validateEmail ? "border-alert-red" : ""} border-1 w-full rounded-2xl border px-4 py-3 outline-none`}
              placeholder="Example: budi123@mail.com"
              value={inputEmail}
              onChange={handleInputChange}
            />
            {validateEmail && <p className="ms-3 text-sm text-alert-red">{validateEmail}</p>}
          </div>
          <button className="mt-3 w-full rounded-2xl bg-primary py-3 text-sm text-neutral-5 hover:bg-primary-hover" onClick={() => handleForgetPassword()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
