const Header = () => {
    return (
        <header className="flex w-full justify-between items-center px-[136px] sticky top-[36px] z-10">
            <img src="/images/Logo.png" className="w-[184px] h-[48px]" alt="logo" />
            <div
                className="p-[1px] rounded-full
  bg-[linear-gradient(150deg,#E8D587_0%,transparent_40%),linear-gradient(315deg,#E8D587_0%,transparent_50%)] overflow-hidden h-[48px]"
            >
                <div className="bg-[#343434] flex size-full rounded-full h-[48px]">
                    <div className="bg-[#05050580] rounded-full text-white h-[48px]">
                        Fancy Gradient Border
                    </div>
                </div>
            </div>
            <div
                className="flex p-[1px] rounded-full
  bg-[linear-gradient(150deg,#E8D587_0%,transparent_40%),linear-gradient(315deg,#E8D587_0%,transparent_50%)] overflow-hidden h-[48px]"
            >
                <div className=" bg-[#343434] flex size-full rounded-full h-[48px]">
                    <div className=" flex px-[24px] bg-[#05050580] rounded-full text-white h-[48px] items-center justify-center">
                        <img src="/images/phone_icon.png" className="w-[24px] h-[24px]" alt="phone" />
                        <p className="font-inter text-[20px] font-regular text-[#e8d587] ml-[12px]">03 9341 5678</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
