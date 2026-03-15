const Header = () => {
  return (
    <header className="flex w-full justify-between items-center px-[136px] sticky top-[36px] z-10">
      <img src="/images/Logo.png" className="w-[184px] h-[48px]" alt="logo" />
      <div
        className="p-[1px] rounded-full
  bg-[linear-gradient(150deg,#E8D587_0%,transparent_40%),linear-gradient(315deg,#E8D587_0%,transparent_50%)] overflow-hidden"
      >
        <div className="bg-[#343434] flex size-full rounded-full">
          <div className="bg-[#05050580] rounded-full p-6 text-white">
            Fancy Gradient Border
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
