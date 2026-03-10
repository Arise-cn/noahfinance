import NoahButton from "@/noahButton/NoahButton"

const Header = () => {
    return (
        <header className="flex w-full justify-between items-center px-[136px] sticky top-[36px] z-10">
            <img src="/images/Logo.png" className="w-[184px] h-[48px]" alt="logo" />
            <Tabs />
        </header>
    )
}
const Tabs = () => {
    return (
        <NoahButton>

        </NoahButton>
    )
}

export default Header