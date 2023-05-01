import { Nav, NavMobile } from "@/components/Nav";
import { navItems } from "@/global/data/navItems";
// import { styles } from "@/styles";
// import { navItems } from "@/data/navItems";
// import { Logo } from "@/components/Logo";
import Link from "next/link";
// import { Button } from "@/components/Button";
import { LngSelect } from "@/components/LngSelect";

export const Header = () => {
  return (
    <header className=" py-1 w-full h-full">
      <div className={`flex flex-row h-full`}>
        <div className="sm:hidden flex justify-end items-center">
          <div>
            <NavMobile navItems={navItems} />
          </div>
        </div>
        <Nav navItems={navItems} />
        <div className="flex items-center">
          <div className="mr-2">
            {" "}
            <LngSelect />
          </div>

          {/* <Button type="primary" text="common.appointment" /> */}
        </div>

        {/* <div className="w-24">
          <Link href="/">
            <Logo />
          </Link>
        </div> */}
      </div>
    </header>
  );
};
