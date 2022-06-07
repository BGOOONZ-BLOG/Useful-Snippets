import { useMemo } from "react";
import { useHistory } from "react-router-dom";

const useQueryParam = (param: string) => {
  const history = useHistory();

  const { get, set } = useMemo(() => {
    const params = new URLSearchParams(history.location.search);
    return {
      // eslint-disable-next-line no-undefined
      get: params.get(param) || undefined,
      set: (paramValue: string) => {
        params.set(param, paramValue);
        history.replace(`${history.location.pathname}?${params.toString()}`);
      },
    };
  }, [history.location.search]);

  return [get, set] as const;
};

export default useQueryParam;
