import Image from "next/image";
import oraLogo from "../../../public/img/ora.png";

export const Logo = () => {
  return (
    <Image
      src={oraLogo}
      alt="Ora clinic logo"
      style={{ width: "auto", height: "100%" }}
    />
  );
};
