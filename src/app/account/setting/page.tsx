// Components
import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";
import SidebarAccount from "@/components/Sidebar/SidebarAccount";

const Profile = () => {
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
            <div className="mx-auto flex w-[70%] flex-col gap-5">
              <h4 className="mb-3 text-center text-2xl font-bold">Change Password</h4>
              <div className="flex flex-col">
                <label htmlFor="oldPassword">Enter Old Password</label>
                <input type="password" id="oldPassword" value="budi@gmail.com" className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-primary-3" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="newPassword">Enter New Password</label>
                <input type="password" id="newPassword" value="budi@gmail.com" className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-primary-3" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input type="password" id="confirmNewPassword" value="budi@gmail.com" className="rounded-2xl border-2 px-4 py-2 outline-none focus:border-primary-3" />
              </div>
              <button className="rounded-full bg-primary py-3 text-base font-bold text-neutral-5 hover:bg-primary-hover">Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
