"use client";

import { useState, useRef } from "react";

const OtpInput = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // Memastikan hanya angka yang diterima
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData("text/plain");
    if (/^\d{6}$/.test(clipboardData)) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = clipboardData.charAt(i);
      }
      setOtp(newOtp);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-2">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            ref={(el) => (inputRefs.current[index] = el)}
            className="border-1 h-10 w-10 rounded-2xl border text-center outline-primary"
          />
        ))}
      </div>
    </>
  );
};

export default OtpInput;
