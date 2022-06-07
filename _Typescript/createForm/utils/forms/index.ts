import { FormState, FieldValues } from "react-hook-form";
import { getPayloadFields } from "../payload";
import { onlyUniqueWords, stripCurlyBraces } from "src/lib/helpers";
import { BuildPayload } from "../types";
import {
  CFDataType,
  CFReturnType,
  CFValidationsType,
} from "src/lib/createForm/types";

// returns a stringified object for the forms api post
// NOTE: The data needs to be stringified in this way or else if will not post
const buildPayload = ({
  data,
  dataSource,
  formName,
  progressiveState = {},
  token,
  salesforce,
}: BuildPayload) => {
  const salesforceFields = salesforce?.action ? { ...salesforce.fields } : {};

  return {
    htmlJson: JSON.stringify({
      [formName]: {
        ...getPayloadFields(data, progressiveState),
        __RequestVerificationToken: token,
        DataSourceItemId: stripCurlyBraces(dataSource).toLowerCase(),
        status: "new",
        ...salesforceFields,
      },
    }),
  };
};

// maps the column value size from Sitecore to a Tailwind class
const determineColumnSize = (cols: string) => {
  // 6 column grid
  const colOptions = new Map([
    // 4 is 4/6 or "2/3"
    ["4", ["w-full md:w-2/3"]],
    // 3 is 3/6 or "1/2"
    ["3", ["w-full md:w-1/2"]],
    // 2 is 2/6 or "1/3"
    ["2", ["w-full md:w-1/3"]],
  ]);

  const lookup = colOptions.get(cols);
  return lookup ? lookup[0] : "w-full";
};

const fieldIsHeading = ({ type }: CFReturnType["props"]) =>
  type?.toLowerCase() === "heading";

const fieldValidation = {
  // if there is customValidationErrorMsg from sitecore return that string
  // else we should return a boolean if the field is required or not
  isRequired: (data: CFDataType): boolean | string => {
    if (!data.required) return false;
    return data?.customValidationErrorMsg || true;
  },

  // takes two email field values, joins them as an array and removes duplicate
  // values, if only one value remains and matches the value param that was passed in
  // then it passes validation
  matchingEmails: (
    value: string,
    emailValuesObj: { [key: string]: string }
  ): boolean | string =>
    value === onlyUniqueWords(Object.values(emailValuesObj).join(" ")) ||
    "The email confirmation must match the email.",

  // return undefined if validationPattern doesnt exist on the validations object
  // to keep the pattern method from firing on the register method.
  // If exists, return the validationPattern object
  regexPattern: (
    validations: CFReturnType["validations"]
  ): CFValidationsType["validationPattern"] | undefined => {
    // eslint-disable-next-line no-undefined
    if (!validations?.validationPattern) return undefined;
    return validations.validationPattern;
  },
};

// the field names that we need to run validation on
// we need this to trigger the validation 'manually' and it accepts an array of strings
// so we will end up with something like: ['first_name', 'last_name', 'email'] etc..
const getCurrentFieldNames = (arr: Array<CFReturnType>): Array<string> => {
  return Object.values(
    arr.reduce((acc: Array<string>, curr: CFReturnType) => {
      // 'RichText' items are a part of the form but have no associated validation so we skip them
      if (curr.file === "RichText") return acc;
      return [...acc, curr.data.name];
    }, [])
  );
};

// boolean check if the arg is an object
// https://stackoverflow.com/a/51458052/5768445
const isLiteralObject = (a: any) => {
  return !!a && a.constructor === Object;
};

// For transforming various input text values as they type. These functions get passed down to
// the components to be used during onChange events
const masks = {
  // mask date of birth values to MM/DD/YYYY format
  dob: (value: string) => {
    // keep user input slashes
    let numbersSlashes = value?.replace(/[^0-9./]/, "") || "";
    // add leading 0 if only 1 digit after user types slash
    if (numbersSlashes.includes("/")) {
      const numbers = numbersSlashes.split("/");
      for (let i = 0; i < numbers.length - 1; i++) {
        numbers[i] = ("0" + numbers[i]).slice(-2);
      }
      numbersSlashes = numbers.join("/");
    }
    // format when enough numbers
    if (value?.length >= 8) {
      numbersSlashes = numbersSlashes.replace(
        /^(\d{0,2})(\d{0,2})(\d{0,4})(\d{0,4})$/,
        (_, p1, p2, p3) => `${p1}${p2 ? "/" : ""}${p2}${p3 ? "/" : ""}${p3}`
      );
    }
    return numbersSlashes;
  },

  numbers: (value: string) => {
    return value.replace(/[^0-9]/g, "");
  },

  // mask ssn values to 000-00-0000 format
  ssn: (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(
        /^(\d{1,3})(\d{0,2})(\d{0,4})(\d{0,4})$/,
        (_, p1, p2, p3) => `${p1}${p2 ? "-" : ""}${p2}${p3 ? "-" : ""}${p3}`
      );
  },

  // mask telephone values to (000) 000-0000 format
  // (https://stackoverflow.com/a/59689167)
  tel: (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(
        /^(\d{1,3})(\d{0,3})(\d{0,4})(\d{0,4})$/,
        (_, p1, p2, p3) => `(${p1}${p2 ? ") " : ""}${p2}${p3 ? "-" : ""}${p3}`
      );
  },
};

// since react-hook-form doesn't/can't scroll to the first error if we
// manually fire off their trigger function, we have to do it ourselves.
// Most error values have the actual ref we can use but the <select> and
// <Radio> field's use a Controller so we need to get there the hard way
// by looking it up by its field name
const scrollToFirstError = (errors: FormState<FieldValues>["errors"]) => {
  // the ref for the first field in the errors object
  const { ref } = Object.values(errors)[0];

  // most refs will have an id, only <select>'s and <radio>'s will have a name
  const { id, name } = ref;
  const nonInputElement = document.querySelector(`[name="${name}"]`);
  const elm = id ? ref : nonInputElement;

  elm.scrollIntoView();
};

export {
  buildPayload,
  determineColumnSize,
  fieldIsHeading,
  fieldValidation,
  getCurrentFieldNames,
  isLiteralObject,
  masks,
  scrollToFirstError,
};
