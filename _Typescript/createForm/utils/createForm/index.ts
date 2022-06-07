import { toSnakeCase } from "src/lib/helpers";

// sets input's defaultValue to one of these cookie values:
// invitationcode, token1, token2, token3, program, ref_id
const getCookieValue = (fields: any) => {
  if (typeof window === "undefined") return "";

  const cookieName = fields?.DefaultValueKey?.value;
  const valueArr = fields?.DefaultValueSource?.value;
  const valueType = getSelectedValue(valueArr);
  const hasCookie = valueType === "cookie";
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split("=")[1];

  return hasCookie && cookieValue ? cookieValue : "";
};

const getDatePickerData = (fields: any) => {
  const blackoutDates = fields?.DisableDates?.value;
  const hasBlackoutDates = Boolean(blackoutDates);
  const startSpan = parseInt(fields?.StartDateSpan?.value);
  const endSpan = parseInt(fields?.EndDateSpan?.value);
  const hasDateRange = Boolean(startSpan);

  return [
    {
      blackoutDates: hasBlackoutDates ? JSON.parse(blackoutDates) : [],
      dateRange: hasDateRange ? [startSpan, endSpan] : null,
      disableSundays: Boolean(fields?.DisableSundays?.value),
      disableWeekends: Boolean(fields?.DisableWeekends?.value),
      isDateOfBirth: Boolean(fields?.IsDateOfBirth?.value),
      showDatePicker: fields?.ShowMonthYearPicker?.value || true,
    },
  ];
};

const getItems = (fields: any): Array<any> => {
  const isDatePicker = fields?.CalendarMessage;
  const isItemsType = fields?.InputItems?.value;
  const isPillToggle = fields?.FirstOptionText?.value;
  const isRichText = fields?.FormBuilderRTEHtml;

  if (isDatePicker) {
    return getDatePickerData(fields);
  }

  if (isPillToggle) {
    return parsePillToggles();
  }

  if (isItemsType) {
    return parseItems(fields.InputItems.value);
  }

  if (isRichText) {
    return [fields.FormBuilderRTEHtml];
  }

  return [];
};

const getName = (fields: any, title: string) => {
  if (fields?.GroupName?.value && title !== "Checkbox List Progressive") {
    return fields.GroupName.value;
  }

  return fields?.Id?.value;
};

/**
 * Sitecore sends an array of numbers to determine columm width for input fields. This searches
 * the array looking for the one that has a selected value. Returns the number
 * @param arr - The array from fields.ColumnWidth.value OR
 * @param arr - The array from fields.ValidationPattern.value
 */
const getSelectedValue = (arr: Array<any>) => {
  if (!arr) return "";

  const [selected] = arr.filter((elm) => elm.selected);
  return selected?.value;
};

// parses through JSS radio and select field items and returns them as an array
const parseItems = (str: string | Array<any>) => {
  if (Array.isArray(str)) return str;
  return JSON.parse(str);
};

// parses the the JSS pill toggle options and returns them as an array of
// objects structured the same way as selects and radios.
// NOTE: we don't really care what the values are from the json as the options
// will always be 'yes/no'
const parsePillToggles = () => {
  return [
    { text: "Yes", value: "Yes" },
    { text: "No", value: "No" },
  ];
};

const toLowerSnakeCase = (str: string) => toSnakeCase(str).toLowerCase();

export {
  getCookieValue,
  getDatePickerData,
  getItems,
  getName,
  getSelectedValue,
  parseItems,
  parsePillToggles,
  toLowerSnakeCase,
};
