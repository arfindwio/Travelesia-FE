"use client";

import { useState, useEffect, KeyboardEvent, MouseEvent } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Api
import { putChangePasswordUser } from "@/api/users-endpoints";

// Helper
import { showErrorToast, showLoadingToast, showSuccessToast } from "@/helper/toast-helper";

// Components
import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";
import SidebarAccount from "@/components/Sidebar/SidebarAccount";

// icons
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface InputChangePassword {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}
interface ValidateChangePassword {
  newPassword: string;
  newPasswordConfirmation: string;
}

const Setting = () => {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);
  const [inputChangePassword, setInputChangePassword] = useState<InputChangePassword>({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });
  const [validateChangePassword, setValidateChangePassword] = useState<ValidateChangePassword>({
    newPassword: "",
    newPasswordConfirmation: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("tokenUser");

    if (!token) return router.push("/");
  }, [router]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);

    mediaQuery.addListener(handleMediaQueryChange);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;

    if (field === "oldPassword") {
      setInputChangePassword((prevInputChangePassword) => ({
        ...prevInputChangePassword,
        oldPassword: value,
      }));
    }

    if (field === "newPassword") {
      const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
      if (!passwordValidator.test(value)) {
        setValidateChangePassword((prevValidateChangePassword) => ({
          ...prevValidateChangePassword,
          newPassword: "Invalid password format. It must contain at least 1 lowercase, 1 uppercase, 1 digit number, 1 symbol, and be between 8 and 12 characters long",
        }));
      } else {
        setValidateChangePassword((prevValidateChangePassword) => ({
          ...prevValidateChangePassword,
          newPassword: "",
        }));
      }
      setInputChangePassword((prevInputChangePassword) => ({
        ...prevInputChangePassword,
        newPassword: value,
      }));
    }

    if (field === "newPasswordConfirmation") {
      if (inputChangePassword.newPassword !== value) {
        setValidateChangePassword((prevValidateChangePassword) => ({
          ...prevValidateChangePassword,
          newPasswordConfirmation: "Please ensure that the password and password confirmation match",
        }));
      } else {
        setValidateChangePassword((prevValidateChangePassword) => ({
          ...prevValidateChangePassword,
          newPasswordConfirmation: "",
        }));
      }
      setInputChangePassword((prevInputChangePassword) => ({
        ...prevInputChangePassword,
        newPasswordConfirmation: value,
      }));
    }
  };

  const handleChangePassword = async (e: KeyboardEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    if ((e as KeyboardEvent<HTMLFormElement>).key === "Enter" || e.type === "click") {
      e.preventDefault();

      if (validateChangePassword.newPassword) return showErrorToast(validateChangePassword.newPassword);
      if (validateChangePassword.newPasswordConfirmation) return showErrorToast(validateChangePassword.newPasswordConfirmation);
      if (!inputChangePassword.oldPassword || !inputChangePassword.newPassword || !inputChangePassword.newPasswordConfirmation) return showErrorToast("All fields are required");

      const loadingToastId = showLoadingToast("Loading...");

      const changePassword = await putChangePasswordUser(inputChangePassword);

      toast.dismiss(loadingToastId);

      if (!changePassword) showErrorToast("Change Password Failed");

      if (changePassword) {
        showSuccessToast("Change Password Successful");
        setInputChangePassword({
          oldPassword: "",
          newPassword: "",
          newPasswordConfirmation: "",
        });
      }
    }
  };
  return (
    <>
      <Navbar />
      <Topbar />
      <div className="px-6 pb-16 pt-4 sm:px-10 sm:pb-8 sm:pt-4 lg:px-20">
        <div className="flex w-full justify-between gap-6 rounded-xl border-2 border-primary-3 bg-slate-100 p-10">
          {!isMobile && (
            <div className="flex w-[40%] flex-col gap-6">
              <SidebarAccount />
            </div>
          )}
          <div className="w-full sm:w-[55%]">
            <form className="mx-auto flex w-[90%] flex-col gap-5 sm:w-[70%]" onKeyDown={handleChangePassword}>
              <h4 className="mb-3 text-center text-2xl font-bold">Change Password</h4>
              <div className="flex w-full flex-col">
                <label htmlFor="oldPassword">Enter Old Password</label>
                <div className="relative flex flex-col">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    id="oldPassword"
                    className="rounded-2xl border-2 border-neutral-4 px-4 py-2 pr-14 outline-none focus:border-primary-3"
                    placeholder="********"
                    value={inputChangePassword.oldPassword}
                    onChange={(e) => handleInputChange(e, "oldPassword")}
                    autoComplete="off"
                  />
                  {showOldPassword ? (
                    <FiEye size={27} className="absolute right-4 top-2 w-8 cursor-pointer text-slate-400" onClick={() => setShowOldPassword(!showOldPassword)} />
                  ) : (
                    <FiEyeOff size={27} className="absolute right-4 top-2 w-8 cursor-pointer text-slate-400" onClick={() => setShowOldPassword(!showOldPassword)} />
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="newPassword">Enter New Password</label>
                <div className="relative flex flex-col">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    className={`${validateChangePassword.newPassword ? "border-alert-red" : inputChangePassword.newPassword && "border-alert-green focus:border-primary-3"} rounded-2xl border-2 px-4 py-2 pr-24 outline-none`}
                    placeholder="********"
                    value={inputChangePassword.newPassword}
                    onChange={(e) => handleInputChange(e, "newPassword")}
                    autoComplete="off"
                  />
                  {showNewPassword ? (
                    <FiEye
                      size={27}
                      className={`${validateChangePassword.newPassword || inputChangePassword.newPassword ? "right-14" : "right-4"} absolute top-2 w-8 cursor-pointer text-slate-400`}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    />
                  ) : (
                    <FiEyeOff
                      size={27}
                      className={`${validateChangePassword.newPassword || inputChangePassword.newPassword ? "right-14" : "right-4"} absolute top-2 w-8 cursor-pointer text-slate-400`}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    />
                  )}
                  {validateChangePassword.newPassword ? (
                    <>
                      <div className="absolute right-4 top-2 rounded-full border-2 border-alert-red bg-neutral-5 p-1">
                        <IoClose size={15} className="text-alert-red" />
                      </div>
                      <p className="ms-3 text-sm text-alert-red">{validateChangePassword.newPassword}</p>
                    </>
                  ) : (
                    inputChangePassword.newPassword && (
                      <div className="absolute right-4 top-2 rounded-full border-2 border-alert-green bg-alert-green p-1">
                        <FaCheck size={15} className="text-neutral-5" />
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <div className="relative flex flex-col">
                  <input
                    type={showConfirmNewPassword ? "text" : "password"}
                    id="confirmNewPassword"
                    className={`${
                      validateChangePassword.newPasswordConfirmation ? "border-alert-red" : inputChangePassword.newPasswordConfirmation && "border-alert-green focus:border-primary-3"
                    } rounded-2xl border-2 px-4 py-2 pr-24 outline-none`}
                    placeholder="********"
                    value={inputChangePassword.newPasswordConfirmation}
                    onChange={(e) => handleInputChange(e, "newPasswordConfirmation")}
                    autoComplete="off"
                  />
                  {showConfirmNewPassword ? (
                    <FiEye
                      size={27}
                      className={`${validateChangePassword.newPasswordConfirmation || inputChangePassword.newPasswordConfirmation ? "right-14" : "right-4"} absolute top-2 w-8 cursor-pointer text-slate-400`}
                      onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    />
                  ) : (
                    <FiEyeOff
                      size={27}
                      className={`${validateChangePassword.newPasswordConfirmation || inputChangePassword.newPasswordConfirmation ? "right-14" : "right-4"} absolute top-2 w-8 cursor-pointer text-slate-400`}
                      onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    />
                  )}
                  {validateChangePassword.newPasswordConfirmation ? (
                    <>
                      <div className="absolute right-4 top-2 rounded-full border-2 border-alert-red bg-neutral-5 p-1">
                        <IoClose size={15} className="text-alert-red" />
                      </div>
                      <p className="ms-3 text-sm text-alert-red">{validateChangePassword.newPasswordConfirmation}</p>
                    </>
                  ) : (
                    inputChangePassword.newPasswordConfirmation && (
                      <div className="absolute right-4 top-2 rounded-full border-2 border-alert-green bg-alert-green p-1">
                        <FaCheck size={15} className="text-neutral-5" />
                      </div>
                    )
                  )}
                </div>
              </div>
              <button className="rounded-full bg-primary py-3 text-base font-bold text-neutral-5 hover:bg-primary-hover" onClick={handleChangePassword}>
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
