"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Api
import { getAuthenticateUser } from "@/api/users-endpoints";
import { putUpdateUserProfile } from "@/api/userProfiles-endpoints";

// Helper
import { showErrorToast, showLoadingToast, showSuccessToast } from "@/helper/toast-helper";

// Components
import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";
import SidebarAccount from "@/components/Sidebar/SidebarAccount";

// Icons
import { IoImageOutline } from "react-icons/io5";

interface InputUserProfile {
  image: File | null;
  fullName: string;
  phoneNumber: string;
  email: string;
  city: string;
  country: string;
}

const Profile = () => {
  const router = useRouter();

  const [dataImage, setDataImage] = useState<string>("");
  const [inputUserProfile, setInputUserProfile] = useState<InputUserProfile>({
    image: null,
    fullName: "",
    phoneNumber: "",
    email: "",
    city: "",
    country: "",
  });

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("tokenUser");

    if (!token) router.push("/");
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      const user = await getAuthenticateUser();
      if (user && user.userProfile) {
        setDataImage(user.userProfile.profilePicture || "");
        setInputUserProfile({
          image: null,
          fullName: user.userProfile.fullName,
          phoneNumber: user.userProfile.phoneNumber,
          email: user.email,
          city: user.userProfile.city || "",
          country: user.userProfile.country || "",
        });
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (field === "image") {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const imageUrl = URL.createObjectURL(file);

        setDataImage(imageUrl);
        setInputUserProfile((prevInputUserProfile) => ({
          ...prevInputUserProfile,
          image: file,
        }));
      }
    } else {
      const value = e.target.value;
      setInputUserProfile((prevInputUserProfile) => ({
        ...prevInputUserProfile,
        [field]: value,
      }));
    }
  };

  const handleUserProfile = async () => {
    if (!inputUserProfile.fullName || !inputUserProfile.phoneNumber || !inputUserProfile.email) return showErrorToast("Please fill in all required fields: Full Name, Phone Number, and Email");
    const loadingToastId = showLoadingToast("Loading...");

    const userProfile = await putUpdateUserProfile(inputUserProfile);

    toast.dismiss(loadingToastId);

    if (!userProfile) showErrorToast("User profile failed to update");

    if (userProfile) showSuccessToast("User profile successfully updated");
  };

  return (
    <>
      <Navbar />
      <Topbar />
      <div className="mb-8 mt-4 px-20">
        <div className="flex w-full justify-between gap-6 rounded-xl border-2 border-primary-3 bg-slate-100 p-10">
          <div className="flex w-[40%] flex-col gap-6">
            <SidebarAccount />
          </div>
          <div className="w-[55%]">
            <div className="mx-auto flex w-[70%] flex-col gap-5" onKeyDown={(e) => (e.key === "Enter" ? handleUserProfile() : "")}>
              <div className="mx-auto w-fit">
                <label htmlFor="image" className="relative w-fit cursor-pointer">
                  <Image
                    src={dataImage ? dataImage : "https://ik.imagekit.io/arfin07/images.png?updatedAt=1706817534316"}
                    alt="image profile"
                    width={500}
                    height={500}
                    className="mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-primary-3 object-cover"
                  />
                  <div className="absolute bottom-1 right-0 rounded-full bg-neutral-5 p-1 text-primary-3">
                    <IoImageOutline size={35} />
                  </div>
                </label>
                <input type="file" accept="image/*" id="image" hidden onChange={(e) => handleInputChange(e, "image")} />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-primary-3" placeholder="Budi Cahyono" value={inputUserProfile.fullName} onChange={(e) => handleInputChange(e, "fullName")} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-primary-3"
                  placeholder="08123456789"
                  value={inputUserProfile.phoneNumber}
                  onChange={(e) => handleInputChange(e, "phoneNumber")}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="rounded-2xl border-2 px-4 py-2 text-neutral-3 outline-none focus:border-primary-3" value={inputUserProfile.email} disabled />
              </div>
              <div className="flex flex-col">
                <label htmlFor="city">City</label>
                <input type="text" id="city" className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-primary-3" value={inputUserProfile.city} onChange={(e) => handleInputChange(e, "city")} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="country">Country</label>
                <input type="text" id="country" className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-primary-3" value={inputUserProfile.country} onChange={(e) => handleInputChange(e, "country")} />
              </div>
              <button className="rounded-full bg-primary py-3 text-base font-bold text-neutral-5 hover:bg-primary-hover" onClick={() => handleUserProfile()}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
