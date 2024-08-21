import { Title } from "@/UI/Title";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { styles } from "@/styles/styles";

export const Contacts = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-col  mt-2 rounded-lg">
      <div className={`${styles.container} ml-auto mr-auto mt-2`}>
        <div className="mb-2 grid gap-0 grid-cols-3 max-w-[200px] ml-auto mr-auto">
          <a
            href="https://www.facebook.com/ora.medcentr"
            className={`flex font-comfortaa  justify-center flex-col items-center rounded-lg`}
            target="_blank"
          >
            {/* <div className=""> */}
            <Image src={`/img/svg/fb.svg`} width={30} height={30} alt="icon" />
            {/* <p>Facebook</p> */}
          </a>
          <a
            href="https://instagram.com/ora_medcentr"
            className={`flex font-comfortaa  justify-center flex-col items-center rounded-lg`}
            target="_blank"
          >
            {/* <div className=""> */}
            <Image
              src={`/img/svg/instagram.svg`}
              width={30}
              height={30}
              alt="icon"
            />
            {/* <p>Instagram</p> */}
          </a>
          {/* <div className=""> */}

          <a
            href="https://www.tiktok.com/@ora_medcentr"
            className={`flex font-comfortaa justify-center flex-col items-center rounded-lg`}
            target="_blank"
          >
            <Image
              src={`/img/svg/tiktok.svg`}
              width={30}
              height={30}
              alt="icon"
            />
            {/* <p>Tiktok</p> */}
          </a>
        </div>
      </div>
      <footer className="h-full flex py-1 justify-between items-end">
        <div className="h-full">
          <ul className="font-comfortaa min-w-[138px] md:max-w-[500px] text-dark [&>li]:leading-[14px] [&>li]:text-sm flex flex-col justify-end md:justify-between h-full">
            <li className="mb-2 md:mb-1">
              <a href="tel:+380981342477">+380 (98) 134-24-77</a>
            </li>
            <li className="mb-2 md:mb-1">
              <a href="tel:+380969454085">+380 (96) 945-40-85</a>
            </li>
            <li className="">
              <a href="tel:+380739417198">+380 (73) 941-71-98</a>
            </li>
            {/* <li>
            <a href="mailto:oramedcentrdr@gmail.com">oramedcentrdr@gmail.com</a>
          </li> */}
          </ul>
        </div>
        <div className="hidden md:block">
          {/* <Logo className="h-[50px] w-auto" /> */}
        </div>
        <div className="h-full">
          <ul className="font-comfortaa max-w-[180px] md:max-w-[500px] text-right text-dark [&>li]:leading-[14px] [&>li]:text-sm flex flex-col justify-between h-full">
            <li className="mb-2 md:mb-1">
              м. Дрогобич,{" "}
              <span className=" inline-block">вул. Івана Франка, 4</span>
            </li>
            <li className="mb-2 md:mb-1">Пн-Пт – з 9:00 до 18:00</li>
            <li>Сб – з 9:00 до 14:00</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
