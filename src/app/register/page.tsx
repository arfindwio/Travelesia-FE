"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Api
import { postRegisterUser } from "@/api/users-endpoints";

// Helper
import { showLoadingToast, showSuccessToast, showErrorToast } from "@/helper/toast-helper";

// icons
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

interface InputRegister {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
interface ValidateRegister {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const Register = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputRegister, setInputRegister] = useState<InputRegister>({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [validateRegister, setValidateRegister] = useState<ValidateRegister>({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;

    if (field === "fullName") {
      if (value.length > 50) {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          fullName: "Invalid full name length. It must be at most 50 characters",
        }));
      } else {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          fullName: "",
        }));
      }
      setInputRegister((prevInputRegister) => ({
        ...prevInputRegister,
        fullName: value,
      }));
    }

    if (field === "email") {
      const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailValidator.test(value)) {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          email: "Invalid email format",
        }));
      } else {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          email: "",
        }));
      }
      setInputRegister((prevInputRegister) => ({
        ...prevInputRegister,
        email: value,
      }));
    }

    if (field === "phoneNumber") {
      const phoneNumberValidator = /^\d+$/;
      if (!phoneNumberValidator.test(value)) {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          phoneNumber: "Invalid phone number format. It must contain only numeric characters",
        }));
      } else if (value.length < 10 || value.length > 12) {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          phoneNumber: "Invalid phone number length. It must be between 10 and 12 characters",
        }));
      } else {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          phoneNumber: "",
        }));
      }
      setInputRegister((prevInputRegister) => ({
        ...prevInputRegister,
        phoneNumber: value,
      }));
    }

    if (field === "password") {
      const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
      if (!passwordValidator.test(value)) {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          password: "Invalid phone number format. It must contain only numeric characters",
        }));
      } else {
        setValidateRegister((prevValidateRegister) => ({
          ...prevValidateRegister,
          password: "",
        }));
      }
      setInputRegister((prevInputRegister) => ({
        ...prevInputRegister,
        password: value,
      }));
    }
  };

  const handleRegister = async () => {
    if (validateRegister.fullName) return showErrorToast(validateRegister.fullName);
    if (validateRegister.email) return showErrorToast(validateRegister.email);
    if (validateRegister.phoneNumber) return showErrorToast(validateRegister.phoneNumber);
    if (validateRegister.password) return showErrorToast(validateRegister.password);
    if (!inputRegister.fullName || !inputRegister.email || !inputRegister.phoneNumber || !inputRegister.password) return showErrorToast("All fields are required");

    const loadingToastId = showLoadingToast("Loading...");

    const register = await postRegisterUser(inputRegister);

    toast.dismiss(loadingToastId);

    if (!register) showErrorToast("Registration Failed");

    if (register) {
      showSuccessToast("Verification link has been sent!");
      setTimeout(() => {
        localStorage.setItem("email", inputRegister.email);
        router.push("/otp");
      }, 1000);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="flex min-h-screen w-1/2 items-center justify-center gap-4 bg-gradient-to-b from-primary from-15% via-primary-3 via-65% to-primary-5">
          <Image src="/TravelesiaLogo.svg" alt="Travelesia Logo" width={180} height={37} />
          <h1 className="font-sans text-6xl text-neutral-5">Travelesia</h1>
        </div>
        <div className="flex w-1/2 items-center px-[10%]">
          <div className="flex w-full flex-col gap-4" onKeyDown={(e) => (e.key === "Enter" ? handleRegister() : "")}>
            <h5 className="mb-2 text-2xl font-semibold">Register</h5>
            <div className="flex w-full flex-col">
              <label htmlFor="fullname">Name</label>
              <input
                type="text"
                id="fullname"
                className={`${validateRegister.fullName ? "border-alert-red" : ""} border-1 w-full rounded-2xl border px-4 py-3 outline-none`}
                placeholder="Full Name"
                value={inputRegister.fullName}
                onChange={(e) => handleInputChange(e, "fullName")}
              />
              {validateRegister.fullName && <p className="ms-3 text-sm text-alert-red">{validateRegister.fullName}</p>}
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className={`${validateRegister.email ? "border-alert-red" : ""} border-1 w-full rounded-2xl border px-4 py-3 outline-none`}
                placeholder="Example: budi123@gmail.com"
                value={inputRegister.email}
                onChange={(e) => handleInputChange(e, "email")}
              />
              {validateRegister.email && <p className="ms-3 text-sm text-alert-red">{validateRegister.email}</p>}
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="telepon">Phone Number</label>
              <input
                type="number"
                id="telepon"
                className={`${validateRegister.phoneNumber ? "border-alert-red" : ""} border-1 w-full rounded-2xl border px-4 py-3 outline-none`}
                placeholder="+62"
                value={inputRegister.phoneNumber}
                onChange={(e) => handleInputChange(e, "phoneNumber")}
              />
              {validateRegister.phoneNumber && <p className="ms-3 text-sm text-alert-red">{validateRegister.phoneNumber}</p>}
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`${validateRegister.password ? "border-alert-red" : "border-neutral-4"} border-1 w-full rounded-2xl border px-4 py-3 outline-none`}
                  placeholder="Masukkan password"
                  value={inputRegister.password}
                  onChange={(e) => handleInputChange(e, "password")}
                />
                {showPassword ? (
                  <FiEye
                    size={27}
                    className="absolute right-4 top-3 w-8 cursor-pointer text-slate-400"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FiEyeOff
                    size={27}
                    className="absolute right-4 top-3 w-8 cursor-pointer text-slate-400"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
                {validateRegister.password && <p className="ms-3 text-sm text-alert-red">{validateRegister.password}</p>}
              </div>
            </div>
            <button
              className="mt-3 w-full rounded-2xl bg-primary py-3 text-sm text-neutral-5 hover:bg-primary-hover"
              onClick={() => {
                handleRegister();
              }}
            >
              Register
            </button>
            <p className="mt-3 text-center text-sm">
              have an account?
              <Link href="/login" className="ms-2 font-bold text-primary">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
