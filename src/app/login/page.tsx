"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

// Helper
import { showSuccessToast, showLoadingToast, showErrorToast } from "@/helper/toast-helper";

// Api
import { postLoginUser } from "@/api/users-endpoints";

// icons
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

interface InputLogin {
  emailOrPhoneNumber: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputLogin, setInputLogin] = useState<InputLogin>({
    emailOrPhoneNumber: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setInputLogin((prevInputLogin) => ({
      ...prevInputLogin,
      [field]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const login = await postLoginUser(inputLogin);

    toast.dismiss(loadingToastId);

    if (!login) showErrorToast("Login Failed");

    if (login) {
      showSuccessToast("Login Successful");
      setTimeout(() => {
        router.back();
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
          <div className="flex w-full flex-col gap-4" onKeyDown={(e) => (e.key === "Enter" ? handleLogin() : "")}>
            <h5 className="mb-2 text-2xl font-semibold">Login</h5>
            <div className="flex w-full flex-col">
              <label htmlFor="emailOrPhoneNumber">Email / Phone Number</label>
              <input
                type="text"
                id="emailOrPhoneNumber"
                className="border-1 rounded-2xl border px-4 py-3 outline-none"
                placeholder="Email or Phone Number"
                value={inputLogin.emailOrPhoneNumber}
                onChange={(e) => {
                  handleInputChange(e, "emailOrPhoneNumber");
                }}
              />
            </div>
            <div className="flex w-full flex-col">
              <div className="flex justify-between">
                <label htmlFor="password">Password</label>
                <p className="text-primary">Forget Password</p>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="border-1 w-full rounded-2xl border px-4 py-3 outline-none"
                  placeholder="Masukkan password"
                  value={inputLogin.password}
                  onChange={(e) => {
                    handleInputChange(e, "password");
                  }}
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
              </div>
            </div>
            <button
              className="mt-3 w-full rounded-2xl bg-primary py-3 text-sm text-neutral-5 hover:bg-primary-hover"
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </button>
            <p className="mt-3 text-center text-sm">
              Don't have an account?
              <Link href="/register" className="ms-2 font-bold text-primary">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
