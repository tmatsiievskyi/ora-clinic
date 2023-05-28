import { Nav, NavMobile } from "@/components/Nav";
import { navItems } from "@/global/data/navItems";
// import { styles } from "@/styles";
// import { navItems } from "@/data/navItems";
// import { Logo } from "@/components/Logo";
import Link from "next/link";
// import { Button } from "@/components/Button";
import { LngSelect } from "@/components/LngSelect";
import { Logo } from "@/UI/Logo";

export const Header = () => {
  return (
    <header className="w-full h-full">
      <div className={`flex items-center flex-row h-full relative`}>
        <div className="sm:hidden flex justify-end items-center">
          <div>
            <NavMobile navItems={navItems} />
          </div>
        </div>
        <Nav navItems={navItems} />
        <div className="flex items-center">
          <LngSelect />
          {/* <Logo className="hidden sm:block h-[30px] w-auto" /> */}
        </div>
      </div>
    </header>
  );
};
