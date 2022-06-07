import { getCookieValue, getDatePickerData, getSelectedValue } from "./index";
import { jsonData as datePickerData } from "src/components/Form/DatePicker/data";

describe("createForm Utils", () => {
  describe("getCookieValue", () => {
    Object.defineProperty(global.document, "cookie", {
      value: "invitationcode=thisisthecode; other=hello; other2=world;",
    });

    it("returns the cookie value if called for in DefaultValueSource", () => {
      const assert1 = getCookieValue({
        DefaultValueKey: { value: "invitationcode" },
        DefaultValueSource: {
          value: [
            { value: "None", selected: false },
            { value: "cookie", selected: true },
          ],
        },
      });
      const assert2 = getCookieValue({
        DefaultValueKey: { value: "other" },
        DefaultValueSource: {
          value: [
            { value: "None", selected: false },
            { value: "cookie", selected: true },
          ],
        },
      });

      expect(assert1).toBe("thisisthecode");
      expect(assert2).toBe("hello");
    });

    it("returns an empty string if there is no DefaultValueSource", () => {
      const assert1 = getCookieValue({
        DefaultValueKey: { value: "invitationcode" },
        DefaultValueSource: {},
      });
      const assert2 = getCookieValue({
        DefaultValueKey: { value: "other" },
        DefaultValueSource: {},
      });

      expect(assert1).toBe("");
      expect(assert2).toBe("");
    });

    it("returns an empty string if the cookie doesnt exist", () => {
      const assert1 = getCookieValue({
        DefaultValueKey: { value: "nope" },
        DefaultValueSource: {
          value: [
            { value: "None", selected: false },
            { value: "cookie", selected: true },
          ],
        },
      });
      const assert2 = getCookieValue({
        DefaultValueKey: { value: "tryagain" },
        DefaultValueSource: {
          value: [
            { value: "None", selected: false },
            { value: "cookie", selected: true },
          ],
        },
      });

      expect(assert1).toBe("");
      expect(assert2).toBe("");
    });
  });

  describe("getDatePickerData", () => {
    it("returns the expected options from the raw fields json", () => {
      const assert = getDatePickerData(datePickerData);
      const expected = [
        {
          blackoutDates: ["09/19/2021"],
          dateRange: null,
          disableSundays: false,
          disableWeekends: false,
          isDateOfBirth: false,
          showDatePicker: true,
        },
      ];

      expect(assert).toStrictEqual(expected);
    });
  });

  describe("getSelectedValue", () => {
    it("gets the sitecore form field column width and returns the object value that has a true selection", () => {
      const colDataFromSitecore = [
        {
          value: "2",
          selected: false,
          label: "2",
        },
        {
          value: "3",
          selected: true,
          label: "3",
        },
        {
          value: "4",
          selected: false,
          label: "4",
        },
        {
          value: "5",
          selected: false,
          label: "5",
        },
        {
          value: "6",
          selected: false,
          label: "6",
        },
      ];

      const assert = getSelectedValue(colDataFromSitecore);
      expect(assert).toEqual("3");
    });
  });
});
