import { Logo } from "@/UI/Logo";

export const Footer = () => {
  return (
    <footer className="h-full flex py-1 justify-between items-end md:items-center">
      <div className="h-full">
        <ul className="font-comfortaa min-w-[138px] md:max-w-[500px] text-dark [&>li]:leading-[14px] [&>li]:text-sm flex flex-col justify-end md:justify-between h-full">
          <li className="mb-2 md:mb-1">
            <a href="tel:+380981342477">+380 (98) 134-24-77</a>
          </li>
          <li className="">
            <a href="tel:+380969454085">+380 (96) 945-40-85</a>
          </li>
          {/* <li>
            <a href="mailto:oramedcentrdr@gmail.com">oramedcentrdr@gmail.com</a>
          </li> */}
        </ul>
      </div>
      <div className="hidden md:block">
        <Logo className="h-[50px] w-auto" />
      </div>
      <div className="h-full">
        <ul className="font-comfortaa text-right text-dark [&>li]:leading-[14px] [&>li]:text-sm flex flex-col justify-between h-full">
          <li className="mb-2 md:mb-1">
            м. Дрогобич,{" "}
            <span className=" inline-block">вул. Івана Франка, 4</span>
          </li>
          <li className="mb-2 md:mb-1">Пн-Пт – з 9:00 до 18:00</li>
          <li>Сб – з 9:00 до 14:00</li>
        </ul>
      </div>
    </footer>
  );
};
