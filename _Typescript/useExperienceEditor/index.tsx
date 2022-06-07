import { useEffect, useState } from "react";
import { isExperienceEditorActive } from "@sitecore-jss/sitecore-jss-react";
import { useSitecoreContext } from "src/lib/SitecoreContextFactory";

const useExperienceEditor = () => {
  const [isEEActive, setIsEEActive] = useState(false);
  const { context: sitecoreContext } = useSitecoreContext();

  useEffect(() => {
    setIsEEActive(isExperienceEditorActive());
  }, [sitecoreContext.pageEditing]);

  return { isEEActive };
};

export { useExperienceEditor };
