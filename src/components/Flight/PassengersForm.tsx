const PassengersForm = () => {
  return (
    <div className="flex flex-col gap-4 rounded border-2 border-neutral-4 px-5 py-6">
      <h1 className="text-[20px] font-bold">Passenger Information</h1>
      <h3 className="w-full rounded-t-2xl bg-neutral-1 px-4 py-2 text-base font-medium text-neutral-5">Passenger Personal Information 1 - Adult</h3>
      <div className="flex flex-col px-4">
        <label htmlFor="title" className="w-fit text-sm font-bold text-primary">
          Title
        </label>
        <input type="text" id="title" className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary" placeholder="Mr." />
      </div>
      <div className="flex flex-col px-4">
        <label htmlFor="fullname" className="w-fit text-sm font-bold text-primary">
          Full Name
        </label>
        <input type="text" id="fullname" className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary" placeholder="budi" />
      </div>
      <div className="flex flex-col px-4">
        <label htmlFor="birth" className="w-fit text-sm font-bold text-primary">
          Date of Birth
        </label>
        <input type="date" id="birth" className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary" />
      </div>
      <div className="flex flex-col px-4">
        <label htmlFor="citizen" className="w-fit text-sm font-bold text-primary">
          Citizen
        </label>
        <input type="text" id="citizen" placeholder="Japan" className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary" />
      </div>
      <div className="flex flex-col px-4">
        <label htmlFor="ktp" className="w-fit text-sm font-bold text-primary">
          KTP/Passpor
        </label>
        <input type="text" id="ktp" className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary" />
      </div>
      <div className="flex flex-col px-4">
        <label htmlFor="publisherCountry" className="w-fit text-sm font-bold text-primary">
          Publisher Country
        </label>
        <input type="text" id="publisherCountry" className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary" />
      </div>
      <div className="flex flex-col px-4">
        <label htmlFor="validUntil" className="w-fit text-sm font-bold text-primary">
          Valid Until
        </label>
        <input type="date" id="validUntil" placeholder="hh/bb/tttt" className="rounded border-2 border-neutral-4 px-2 py-1 text-base font-normal outline-none focus:border-primary" />
      </div>
    </div>
  );
};

export default PassengersForm;
