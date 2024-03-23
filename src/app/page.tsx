import Image from "next/image";

// Components
import Navbar from "@/components/Navbar";
import FlightFilterCard from "@/components/Card/FlightFilterCard";
import FavoriteDestination from "@/components/FavoriteDestination";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex w-full items-center justify-between pt-28">
        <div className="w-[15%] bg-primary-3 py-16"></div>
        <div className="flex w-full overflow-hidden rounded-[20px] bg-secondary-3">
          <div className="my-auto w-2/6 py-16 pl-16">
            <h1 className="text-4xl font-extrabold italic">Discount For Now</h1>
            <h2 className="text-4xl font-bold text-primary-3">85%</h2>
          </div>
          <div className="relative w-4/6">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-3 from-5%"></div>
            <Image src="/HomepageIMG.svg" alt="homepage image" width={1} height={1} className="w-full" />
          </div>
        </div>
        <div className="h-[8rem] w-[15%] bg-primary-4"></div>
      </div>
      <div className="relative left-1/2 top-16 w-[65%] -translate-x-1/2 -translate-y-1/2 transform">
        <FlightFilterCard />
      </div>
      <div className="mx-auto -mt-10 flex w-[65%] flex-col justify-center gap-5 pb-14">
        <FavoriteDestination />
      </div>
    </>
  );
};

export default Home;
