import Image from "next/image";

const DestinationCard = () => {
  return (
    <div className="flex w-[18%] cursor-pointer flex-col gap-[2px] p-2 shadow-md">
      <Image src="/ImageFlight.svg" alt="Image Flight" width={1} height={1} className="w-full" />
      <p className="text-sm font-medium">Jakarta -&gt; Bangkok</p>
      <p className="text-xs font-bold text-primary">AirAsia</p>
      <p className="text-xs">20 - 30 Maret 2023</p>
      <p className="text-sm">
        Price <span className="font-bold text-alert-red">IDR 950.000</span>
      </p>
    </div>
  );
};

export default DestinationCard;
