import Image from "next/image";
import oraLogo from "../../../public/img/ora.png";

export const Logo = ({ className }: { className?: string }) => {
  return <Image src={oraLogo} alt="Ora clinic logo" className={className} />;
};
