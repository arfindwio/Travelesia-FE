"use client";

import { useState, useEffect } from "react";
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

    if (!token) router.push("/");
  }, [router]);

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

  const handleChangePassword = async () => {
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
  };
  return (
    <>
      <Navbar />
      <Topbar />
      <div className="mt-4 px-20">
        <div className="flex w-full justify-between gap-6 rounded-xl border-2 border-primary-3 bg-slate-100 p-10">
          <div className="flex w-[40%] flex-col gap-6">
            <SidebarAccount />
          </div>
          <div className="w-[55%]">
            <div className="mx-auto flex w-[70%] flex-col gap-5" onKeyDown={(e) => (e.key === "Enter" ? handleChangePassword() : "")}>
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
                    className={`${validateChangePassword.newPassword ? "border-alert-red" : "border-neutral-4 focus:border-primary-3"} rounded-2xl border-2 px-4 py-2 pr-14 outline-none`}
                    placeholder="********"
                    value={inputChangePassword.newPassword}
                    onChange={(e) => handleInputChange(e, "newPassword")}
                    autoComplete="off"
                  />
                  {showNewPassword ? (
                    <FiEye size={27} className="absolute right-4 top-2 w-8 cursor-pointer text-slate-400" onClick={() => setShowNewPassword(!showNewPassword)} />
                  ) : (
                    <FiEyeOff size={27} className="absolute right-4 top-2 w-8 cursor-pointer text-slate-400" onClick={() => setShowNewPassword(!showNewPassword)} />
                  )}
                  {validateChangePassword.newPassword && <p className="px-3 text-sm text-alert-red">{validateChangePassword.newPassword}</p>}
                </div>
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <div className="relative flex flex-col">
                  <input
                    type={showConfirmNewPassword ? "text" : "password"}
                    id="confirmNewPassword"
                    className={`${validateChangePassword.newPasswordConfirmation ? "border-alert-red" : "border-neutral-4 focus:border-primary-3"} rounded-2xl border-2  px-4 py-2 pr-14 outline-none`}
                    placeholder="********"
                    value={inputChangePassword.newPasswordConfirmation}
                    onChange={(e) => handleInputChange(e, "newPasswordConfirmation")}
                    autoComplete="off"
                  />
                  {showConfirmNewPassword ? (
                    <FiEye size={27} className="absolute right-4 top-2 w-8 cursor-pointer text-slate-400" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} />
                  ) : (
                    <FiEyeOff size={27} className="absolute right-4 top-2 w-8 cursor-pointer text-slate-400" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} />
                  )}
                  {validateChangePassword.newPasswordConfirmation && <p className="px-3 text-sm text-alert-red">{validateChangePassword.newPasswordConfirmation}</p>}
                </div>
              </div>
              <button className="rounded-full bg-primary py-3 text-base font-bold text-neutral-5 hover:bg-primary-hover" onClick={() => handleChangePassword()}>
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
