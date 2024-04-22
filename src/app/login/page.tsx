"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, KeyboardEvent, MouseEvent } from "react";
import toast from "react-hot-toast";

// Helper
import { showSuccessToast, showLoadingToast, showErrorToast } from "@/helper/toast-helper";

// Api
import { postLoginUser } from "@/api/users-endpoints";

// icons
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

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

  const handleLogin = async (e: KeyboardEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    if ((e as KeyboardEvent<HTMLFormElement>).key === "Enter" || e.type === "click") {
      e.preventDefault();

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
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="hidden min-h-screen items-center justify-center gap-4 bg-gradient-to-b from-primary from-15% via-primary-3 via-65% to-primary-5 md:flex md:w-1/2">
          <Image src="/TravelesiaLogo.svg" alt="Travelesia Logo" width={1} height={1} className="w-1/3" />
          <h1 className="font-sans text-neutral-5 md:text-5xl lg:text-6xl">Travelesia</h1>
        </div>
        <div className="flex w-full items-center px-[10%] md:w-1/2 md:px-10 lg:px-20 xl:px-[10%]">
          <div className="flex w-full flex-col gap-4">
            <form className="flex w-full flex-col gap-4" onKeyDown={handleLogin}>
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
                  <Link href="/forget-password" className="text-primary">
                    Forget Password
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="border-1 w-full rounded-2xl border px-4 py-3 pr-14 outline-none"
                    placeholder="Masukkan password"
                    value={inputLogin.password}
                    onChange={(e) => {
                      handleInputChange(e, "password");
                    }}
                    autoComplete="off"
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
              <button className="mt-3 w-full rounded-2xl bg-primary py-4 text-base font-medium text-neutral-5 hover:bg-primary-hover" onClick={handleLogin}>
                Login
              </button>
            </form>
            <div className="mx-auto flex w-[80%] items-center justify-between">
              <span className="w-[45%] border-t-2 border-neutral-4"></span>
              <p className="text-lg font-medium italic text-neutral-4">OR</p>
              <span className="w-[45%] border-t-2 border-neutral-4"></span>
            </div>
            <button
              className="group flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-primary bg-neutral-5  py-3 text-base font-medium hover:bg-primary"
              onClick={() => (window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/google`)}
            >
              <FcGoogle size={30} />
              <p className="text-neutral-1 group-hover:text-neutral-5">Login With Google</p>
            </button>
            <div className="mt-1">
              <p className="text-center text-sm">
                Don't have an account?
                <Link href="/register" scroll={false} className="ms-2 font-bold text-primary">
                  Register here
                </Link>
              </p>
              <p className="text-center text-sm">
                Account not verified?
                <Link href="/verify-account" scroll={false} className="ms-2 font-bold text-primary">
                  Verify it here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
