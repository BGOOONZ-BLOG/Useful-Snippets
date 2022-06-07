import { useState } from "react";
import { useAppContext } from "src/lib/Contexts/AppContext";

/** returns the next language to toggle translation to */
const useTranslation = () => {
  const [isPending, setPending] = useState(false);
  const { status, mutate } = useAppContext();
  const currentLanguage = status?.language || "en";
  const STATE = {
    // If the current is 'en', we return spanish as the next
    en: { code: "es", text: "español" },
    // If the current is 'es' we return english as the next
    es: { code: "en", text: "english" },
  } as const;
  const nextLanguage = STATE?.[currentLanguage] || STATE.en;

  const translate = () => {
    setPending(true);
    return mutate({ language: nextLanguage.code, withLoader: true }).then(
      () => {
        setPending(false);

        document.documentElement.setAttribute("lang", nextLanguage.code);
      }
    );
  };

  return { isPending, nextLanguage, translate };
};

export { useTranslation };
