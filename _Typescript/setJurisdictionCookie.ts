import { JurisdictionCodes } from "src/components/Jurisdiction/types";
import { setJurisdictionPerServiceKey } from "src/api/duke/jurisdiction";

const setJurisdictionCookie = async (
  code: typeof JurisdictionCodes[number]
) => {
  const [stateAbbreviation, serviceKey] = code.split(/(?=[0])/);

  // The cookie returned from the request must be used on a secure origin (https) so
  // for local development we need to set the cookie on the client here
  if (process.env.NODE_ENV === "development") {
    const oneYear = 31536000;
    const value = encodeURIComponent(
      JSON.stringify({ JU: code, SEGMENT: "RES" })
    );
    document.cookie = `DEC=${value}; path=/; domain=.duke-energy.com; max-age=${oneYear}; samesite=strict`;
  }

  // let the API set the cookie on prod
  const cookie = await setJurisdictionPerServiceKey(
    stateAbbreviation,
    serviceKey
  );
  return cookie;
};

export default setJurisdictionCookie;
