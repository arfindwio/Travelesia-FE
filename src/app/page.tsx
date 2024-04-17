import Image from "next/image";

// Components
import Navbar from "@/components/Navbar";
import FlightFilterCard from "@/components/Card/FlightFilterCard";
import FavoriteDestination from "@/components/FavoriteDestination";

const Home = async () => {
  return (
    <>
      <Navbar />
      <div className="flex w-full items-center justify-between sm:pt-28">
        <div className="bg-primary-3 sm:w-[5%] sm:py-16 xl:w-[15%]"></div>
        <div className="flex h-[10rem] w-full overflow-hidden bg-secondary-3 sm:h-auto sm:rounded-[20px]">
          <div className="my-auto w-1/2 pl-8 sm:w-2/6 sm:py-16 sm:pl-16">
            <h1 className="text-2xl font-extrabold italic sm:text-4xl">Discount For Now</h1>
            <h2 className="text-2xl font-bold text-primary-3 sm:text-4xl">85%</h2>
          </div>
          <div className="relative h-full w-1/2 sm:h-auto sm:w-4/6">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-3 from-5%"></div>
            <Image src="/HomepageIMG.svg" alt="homepage image" width={1} height={1} className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="bg-primary-4 sm:w-[5%] sm:py-16 xl:w-[15%]"></div>
      </div>
      <div className="relative left-1/2 top-44 w-[95%] -translate-x-1/2 -translate-y-1/2 transform sm:top-24 sm:w-[80%] xl:top-16 xl:w-[65%]">
        <FlightFilterCard />
      </div>
      <div className="mx-auto -mt-3 flex w-[90%] flex-col justify-center gap-5 pb-24 sm:-mt-6 sm:w-[80%] sm:pb-14 xl:-mt-10 xl:w-[65%]">
        <FavoriteDestination />
      </div>
    </>
  );
};

export default Home;
