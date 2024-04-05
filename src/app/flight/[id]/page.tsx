// Components
import Navbar from "@/components/Navbar";
import Seat from "@/components/Flight/Seat";
import FlightDetail from "@/components/Flight/FlightDetail";
import PassengersForm from "@/components/Flight/PassengersForm";

// Icons
import { TbArrowBadgeRightFilled } from "react-icons/tb";

const FlightId = ({ params: { id } }: { params: { id: number } }) => {
  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col gap-4 border-b bg-neutral-5 px-20 pb-4 pt-24 shadow-md">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Personal Information</h2>
          <TbArrowBadgeRightFilled size={20} className="text-neutral-3" />
          <h2 className="text-xl font-bold text-neutral-3">Payment</h2>
          <TbArrowBadgeRightFilled size={20} className="text-neutral-3" />
          <h2 className="text-xl font-bold text-neutral-3">Finish</h2>
        </div>
        <div className="w-full rounded-xl bg-alert-red p-3 text-center">
          <p className="text-base font-medium text-neutral-5">Complete in 15:00</p>
        </div>
      </div>
      <div className="mb-10 mt-8 flex w-full justify-between px-20">
        <div className="flex w-[57%] flex-col gap-6">
          <div className="flex flex-col gap-4 rounded border-2 border-neutral-4 px-5 py-6">
            <h1 className="text-[20px] font-bold">Customer Data</h1>
            <h3 className="w-full rounded-t-2xl bg-neutral-1 px-4 py-2 text-base font-medium text-neutral-5">Customer Personal Information</h3>
            <div className="flex flex-col px-4">
              <label htmlFor="fullname" className="w-fit text-sm font-bold text-primary">
                Full Name
              </label>
              <input type="text" id="fullname" className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary" value={"budi"} />
            </div>
            <div className="flex flex-col px-4">
              <label htmlFor="phoneNumber" className="w-fit text-sm font-bold text-primary">
                Phone Number
              </label>
              <input type="number" id="phoneNumber" value={"08123456789"} className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary" />
            </div>
            <div className="flex flex-col px-4">
              <label htmlFor="email" className="w-fit text-sm font-bold text-primary">
                Email
              </label>
              <input type="email" id="email" value={"budi@mail.com"} className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary" />
            </div>
          </div>
          <PassengersForm />
          <Seat />
          <button className="mx-auto w-[95%] rounded-xl bg-neutral-4 py-3 text-neutral-5">Save</button>
        </div>
        <div className="flex w-[40%] flex-col gap-2 pt-4">
          <FlightDetail id={id} />
        </div>
      </div>
    </>
  );
};

export default FlightId;
