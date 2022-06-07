import { makeKey } from "./index";

describe("makeKey", () => {
  it("makes a string representing the options argument", () => {
    const assert1 = makeKey({});
    const assert2 = makeKey({ rootMargin: "0px", threshold: 1.0 });
    const assert3 = makeKey({
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: "2px",
    });

    expect(assert1).toBe("{}");
    expect(assert2).toBe('{"rootMargin":"0px","threshold":1}');
    expect(assert3).toBe(
      '{"rootMargin":"2px","threshold":[0,0.25,0.5,0.75,1]}'
    );
  });
});
