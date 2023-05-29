import { Contacts } from "@/components/Contacts";
import { Title } from "@/UI/Title";
import { useTranslation } from "next-i18next";

export const MainContacts = () => {
  const { t } = useTranslation("common");

  return (
    <div className="mt-2 rounded-lg bg-light p-2">
      <Title>{t("common.ourContacts")}</Title>
      <Contacts />
    </div>
  );
};
