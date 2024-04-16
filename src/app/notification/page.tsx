"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Api
import { getNotifications, putMarkAsReadNotifications } from "@/api/notifications-endpoints";

// Components
import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";

// Icons
import { IoMdNotifications } from "react-icons/io";

interface NotificationData {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const Notification = () => {
  const router = useRouter();
  const [notificationData, setNotificationData] = useState<NotificationData[] | null>(null);

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("tokenUser");

    if (!token) router.push("/");
  }

  useEffect(() => {
    const fetchNotificationData = async () => {
      const notifications = await getNotifications();
      if (notifications) {
        setNotificationData(notifications);
      }
      await putMarkAsReadNotifications();
    };

    fetchNotificationData();
  }, []);

  const handleNotificationClick = async (id: number) => {
    if (!notificationData) return;

    const updatedNotificationData = notificationData.map((notification) => {
      if (notification.id === id) {
        return {
          ...notification,
          isRead: true,
        };
      }
      return notification;
    });
    setNotificationData(updatedNotificationData);
  };
  return (
    <>
      <Navbar />
      <Topbar />
      <div className="px-6 pt-4 sm:px-10 sm:pt-4 lg:px-20">
        <div className="flex min-h-[70vh] w-full flex-col overflow-hidden rounded-xl border-2 border-primary-3 bg-slate-100 sm:min-h-[60vh]">
          {notificationData?.length ? (
            notificationData.map((notification) => (
              <div
                key={notification.id}
                className={`${notification.isRead ? "bg-neutral-5 hover:bg-primary-5" : "bg-primary-5"} group flex h-fit w-full cursor-pointer gap-2 bg-opacity-30 px-2 py-4 hover:bg-opacity-100 sm:gap-3 sm:px-10 sm:py-6`}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="h-fit w-fit rounded-full bg-primary-4 p-1">
                  <IoMdNotifications size={20} className="text-neutral-5" />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-xs font-medium text-neutral-4 group-hover:text-neutral-5 sm:text-sm">{notification.title}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium text-neutral-4 group-hover:text-neutral-5 sm:text-sm">{notification.createdAt}</p>
                      <div className={`${notification.isRead ? "bg-alert-green" : "bg-alert-red"} h-2 w-2 rounded-full `}></div>
                    </div>
                  </div>
                  <p className="text-sm">{notification.message}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="m-auto text-2xl font-bold italic text-neutral-4">- No notifications found -</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
