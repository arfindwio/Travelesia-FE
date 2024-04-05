const Seat = () => {
  return (
    <div className="flex flex-col gap-4 rounded border-2 border-neutral-4 px-5 py-6">
      <h1 className="text-[20px] font-bold">Customer Data</h1>
      <h3 className="rounded-sm bg-alert-green py-2 text-center text-sm font-medium text-neutral-5">Economy - 64 Seats Available</h3>
      <div className="items-centerjustify-center mx-auto flex w-[55%] flex-col">
        <div className="mx-auto flex w-full items-center justify-evenly text-center text-neutral-4">
          <div className="flex w-[14%] justify-center">
            <p className="h-10 w-10">A</p>
          </div>
          <div className="flex w-[14%] justify-center">
            <p className="h-10 w-10">B</p>
          </div>
          <div className="flex w-[14%] justify-center">
            <p className="h-10 w-10">C</p>
          </div>
          <div className="flex w-[14%] justify-center">
            <p className="h-full w-full"></p>
          </div>
          <div className="flex w-[14%] justify-center">
            <p className="h-10 w-10">D</p>
          </div>
          <div className="flex w-[14%] justify-center">
            <p className="h-10 w-10">E</p>
          </div>
          <div className="flex w-[14%] justify-center">
            <p className="h-10 w-10">F</p>
          </div>
        </div>
        <div className="mx-auto flex w-full flex-wrap items-center justify-evenly text-center">
          <div className="mb-3 flex w-[14%] justify-center">
            <p className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-neutral-4"></p>
          </div>
          <div className="mb-3 flex w-[14%] justify-center">
            <p className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-neutral-4"></p>
          </div>
          <div className="mb-3 flex w-[14%] justify-center">
            <p className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-neutral-4"></p>
          </div>
          <div className="mb-3 flex w-[14%] justify-center">
            <p className="flex h-10 w-fit items-center justify-center rounded-md bg-slate-100 px-1 text-center text-neutral-3">1</p>
          </div>
          <div className="mb-3 flex w-[14%] justify-center">
            <p className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-neutral-4"></p>
          </div>
          <div className="mb-3 flex w-[14%] justify-center">
            <p className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-neutral-4"></p>
          </div>
          <div className="mb-3 flex w-[14%] justify-center">
            <p className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-neutral-4"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seat;
