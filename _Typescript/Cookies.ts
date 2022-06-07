const getCookies = () => {
  const cookies = () => {
    return document.cookie
      .split(";")
      .map((cookie) => cookie.split("="))
      .reduce(
        (accumulator, [key, value]) => ({
          ...accumulator,
          [key.trim()]: decodeURIComponent(value),
        }),
        {}
      );
  };
  if (typeof window !== "undefined") {
    return cookies() as { [key: string]: any };
  } else {
    return null;
  }
};

export default getCookies;
