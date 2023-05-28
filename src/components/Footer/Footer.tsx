import { Logo } from "@/UI/Logo";

export const Footer = () => {
  return (
    <footer className="h-full flex py-1 justify-between">
      <div className="h-full">
        <ul className="font-comfortaa  text-dark [&>li]:leading-[14px] [&>li]:text-sm flex flex-col justify-between h-full">
          <li>
            <a href="tel:+380981342477">+380 (98) 134-24-77</a>
          </li>
          <li>
            <a href="tel:+380969454085">+380 (96) 945-40-85</a>
          </li>
          <li>
            <a href="mailto:oramedcentrdr@gmail.com">oramedcentrdr@gmail.com</a>
          </li>
        </ul>
      </div>
      <div className="h-full">
        <Logo />
      </div>
      <div className="h-full">
        <ul className="font-comfortaa text-right text-dark [&>li]:leading-[14px] [&>li]:text-sm flex flex-col justify-between h-full">
          <li>м. Дрогобич, вул. Івана Франка, 4</li>
          <li>Пн-Пт – з 9:00 до 18:00</li>
          <li>Сб – з 9:00 до 14:00</li>
        </ul>
      </div>
    </footer>
  );
};
