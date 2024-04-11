// Components
import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";

// Icons
import { IoMdNotifications } from "react-icons/io";

const Notification = () => {
  return (
    <>
      <Navbar />
      <Topbar />
      <div className="mt-4 px-20">
        <div className="flex min-h-[60vh] w-full flex-col overflow-hidden rounded-xl border-2 border-primary-3">
          <div className="group flex h-fit w-full cursor-pointer gap-3 bg-primary-5 bg-opacity-30 px-10 py-6 hover:bg-opacity-100">
            <div className="h-fit w-fit rounded-full bg-primary-4 p-1">
              <IoMdNotifications size={20} className="text-neutral-5" />
            </div>
            <div className="flex w-full flex-col gap-1">
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-medium text-neutral-4 group-hover:text-neutral-5">Promotion</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-neutral-4 group-hover:text-neutral-5">20 Maret, 14:04</p>
                  <div className="h-2 w-2 rounded-full bg-alert-green"></div>
                </div>
              </div>
              <p className="text-base">Get 50% Off Tickets!</p>
            </div>
          </div>
          <div className="group flex h-fit w-full cursor-pointer gap-3 px-10 py-6 hover:bg-primary-5 hover:bg-opacity-100">
            <div className="h-fit w-fit rounded-full bg-primary-4 p-1">
              <IoMdNotifications size={20} className="text-neutral-5" />
            </div>
            <div className="flex w-full flex-col gap-1">
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-medium text-neutral-4 group-hover:text-neutral-5">Notification</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-neutral-4 group-hover:text-neutral-5">5 Maret, 14:04</p>
                  <div className="h-2 w-2 rounded-full bg-alert-red"></div>
                </div>
              </div>
              <p className="text-base">Terdapat perubahan pada jadwal penerbangan kode booking 45GT6. Cek jadwal perjalanan Anda disini!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
