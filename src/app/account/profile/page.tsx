import Image from "next/image";

// Components
import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";
import SidebarAccount from "@/components/Sidebar/SidebarAccount";

// Icons
import { IoImageOutline } from "react-icons/io5";

const Profile = () => {
  return (
    <>
      <Navbar />
      <Topbar />
      <div className="px-20">
        <div className="mt-4 flex w-full justify-between gap-6 rounded-xl border-2 border-primary-3 bg-slate-100 p-10">
          <div className="flex w-[40%] flex-col gap-6">
            <SidebarAccount />
          </div>
          <div className="w-[55%]">
            <div className="mx-auto flex w-[70%] flex-col gap-5">
              <div className="mx-auto w-fit">
                <label htmlFor="image" className="relative w-fit cursor-pointer">
                  <Image
                    // loader={() => src}
                    src="/ImageProfile.jpg"
                    alt="image profile"
                    width={120}
                    height={120}
                    className="h-full w-full overflow-hidden rounded-full border-4 border-primary-3 object-fill"
                  />
                  <div className="absolute bottom-1 right-0 rounded-full bg-neutral-5 p-1 text-primary-3">
                    <IoImageOutline size={35} />
                  </div>
                </label>
                <input type="file" accept="image/*" id="image" hidden />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" value="Budi Cahyono" className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-primary-3" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text" id="phoneNumber" value="+62 8123456789" className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-primary-3" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value="budi@gmail.com" className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-primary-3" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="city">City</label>
                <input type="text" id="city" value="Jakarta" className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-primary-3" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="country">Country</label>
                <input type="text" id="country" value="Indonesia" className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-primary-3" />
              </div>
              <button className="rounded-full bg-primary py-3 text-base font-bold text-neutral-5 hover:bg-primary-hover">Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
