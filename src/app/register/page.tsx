"use client";

import Image from "next/image";
import Link from "next/link";

// icons
import { FiEye } from "react-icons/fi";

const Register = () => {
  return (
    <>
      <div className="flex">
        <div className="flex min-h-screen w-1/2 items-center justify-center gap-4 bg-gradient-to-b from-primary from-15% via-primary-3 via-65% to-primary-5">
          <Image src="/TravelesiaLogo.svg" alt="Travelesia Logo" width={180} height={37} />
          <h1 className="font-sans text-6xl text-neutral-5">Travelesia</h1>
        </div>
        <div className="flex w-1/2 items-center px-[10%]">
          <form className="flex w-full flex-col gap-4">
            <h5 className="mb-2 text-2xl font-semibold">Register</h5>
            <div className="flex w-full flex-col">
              <label htmlFor="email">Nama</label>
              <input type="text" id="email" className="border-1 rounded-2xl border px-4 py-3 outline-none" placeholder="budi Cahyono" />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="border-1 w-full rounded-2xl border px-4 py-3 outline-none" placeholder="Contoh: budi123@gmail.com" />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="telepon">Phone Number</label>
              <input type="number" id="telepon" className="border-1 w-full rounded-2xl border px-4 py-3 outline-none" placeholder="+62" />
            </div>
            <div className="flex w-full flex-col">
              <div className="flex justify-between">
                <label htmlFor="password">Password</label>
              </div>
              <div className="relative">
                <input type="text" id="password" className="border-1 w-full rounded-2xl border px-4 py-3 outline-none" placeholder="Masukkan password" />
                <FiEye size={27} className="absolute right-4 top-3 w-8 cursor-pointer text-slate-400" />
              </div>
            </div>
            <button className="mt-3 w-full rounded-2xl bg-primary py-3 text-sm text-neutral-5 hover:bg-primary-hover">Login</button>
            <p className="mt-3 text-center text-sm">
              have an account?
              <Link href="/login" className="ms-2 font-bold text-primary">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
