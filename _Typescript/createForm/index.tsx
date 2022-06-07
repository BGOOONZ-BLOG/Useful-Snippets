import loadable from "@loadable/component";
import uid from "uid";
import { dataMap, inputMap, regexMap } from "./mapping";
import * as util from "./utils/createForm";
import {
  CFReturnType,
  GetDataProps,
  GetValidationProps,
  ParsedFormModel,
} from "./types";

const createForm = ({
  fields,
  title,
}: Pick<ParsedFormModel, "fields" | "title">) => {
  // normalize form field title for inputMap lookup
  // 'Drop List' => 'drop_list'
  const formattedTitle = util.toLowerSnakeCase(title);

  // Try to determine the field type by its JSS fields props or do a lookup
  // by the field name in the inputMap. Its not ideal but we have little options here
  const inputType =
    determineFieldType(fields, title) || inputMap[formattedTitle];

  // fields we don't want to render will return a valid null value
  // from inputMap we want to return early for these fields.
  // The null values will later be filtered out of the returned array
  // 'undefined' values will be converted to 'input'
  if (inputType === null) return inputType;
  const processedInput = !inputType ? "input" : inputType;

  // get the data/prop information for the input field,
  // the file name, icon, mask function etc.. and import it
  // ex: { 'FormInput, { type: 'tel' } }
  const { file, props } = dataMap[processedInput];

  // import the form field component
  // https://github.com/gregberge/loadable-components
  const Component = loadable(() => import(`src/components/Form/${file}/index`));

  return {
    Component,
    data: getData({ fields, title }),
    file,
    formName: fields?.FormId?.value,
    id: uid(32),
    props: {
      columns: util.getSelectedValue(fields.ColumnWidth?.value),
      confirmEmailFieldName: fields?.ConfirmationFieldLink?.value,
      ...props,
    },
    validations: getValidations(file, fields, props?.regex),
  };
};

// Called from SingleStepForm or MultiStepForm
// Takes the JSS fields.ModelJson array and processes them through createForm
// The results get returned and then used to build the form
const createFormInit: {
  (arr: Array<ParsedFormModel>, multi: true): CFReturnType[][];
  (arr: Array<ParsedFormModel>, multi: false): CFReturnType[];
} = (arr: Array<ParsedFormModel>, multi: boolean): any => {
  return multi ? multiStepFormFields(arr) : parseFields(arr);
};

// Determine the field type based on its JSS 'fields' props
const determineFieldType = (
  fields: ParsedFormModel["fields"],
  title: string
) => {
  if (fields?.Checked) {
    return "checkbox";
  }

  if (fields?.InputItems?.type === "textarea-split") {
    return "select";
  }

  // TODO: after the final content migration we'll need to go into Sitecore and update the
  // FormBuilder fields on the forms that have hidden fields to make sure they follow this format
  if (fields?.Value?.value === "hidden" && title === "Text Input") {
    return "hidden";
  }

  return null;
};

// The data value that is returned from createForm
const getData: GetDataProps = ({ fields, title }) => ({
  customValidationErrorMsg:
    fields?.CustomValidationErrorMsg?.value || "field is required",
  defaultValue: util.getCookieValue(fields),
  id: fields?.Id?.value,
  items: util.getItems(fields),
  label: fields?.Label?.value || "",
  maxLength: parseInt(fields?.MaximumLength?.value) || 524288,
  minLength: parseInt(fields?.MinimumLength?.value) || 0,
  name: util.getName(fields, title),
  placeholder: fields?.PlaceholderText?.value || "",
  required: fields?.Required?.value,
  tabs: fields?.Tabs?.value.split("\n") || [],
  title,
  toolTipText: fields?.TooltipText?.value,
});

// determine the validations (if any) for this input field
const getValidations: GetValidationProps = (file, fields, regex = "") => {
  const skipValidation = ["Heading", "Recaptcha", "Tabs"];
  let pattern;

  if (file && skipValidation.includes(file)) return null;

  // Validations will usually come through as a string value from sitecore
  // but can also come through as an array of objects, these have the type 'select'
  // We first need to parse through this array and grab the value of the selected validation pattern
  if (fields?.ValidationPattern?.type === "select") {
    pattern = util.getSelectedValue(fields.ValidationPattern.value);
  } else {
    pattern = fields?.ValidationPattern?.value;
  }

  return {
    shouldConfirm: fields?.AppearsOnFormConfirmation?.value,
    validationPattern:
      // 1. by regex in mapping props (phone, ssn)
      // 2. by named regex pattern coming from Sitecore
      regexMap[regex] || regexMap[pattern],
  };
};

const multiStepFormFields = (arr: Array<ParsedFormModel>) => {
  const parsedArr = parseFields(arr);
  const outerArr: CFReturnType[][] = [];
  let innerArr: CFReturnType[] = [];

  // This creates a multi-dimensional array for multistep forms
  // 'End' types mark the end of a chunk
  // 'Start' types mark the first chunk of the array. This function eventually returns:
  // [[form stepper element], [...first section fields], [...second section fields] ...etc]
  parsedArr.map((elm: CFReturnType) => {
    if (elm.file === "End") {
      outerArr.push(innerArr);
      innerArr = [];
    } else if (elm.file === "Start") {
      innerArr.push(elm);
      outerArr.push(innerArr);
      innerArr = [];
    } else {
      innerArr.push(elm);
    }
    return elm;
  });
  return outerArr;
};

// sitecore jss comes in -> our CFReturnType form objects come out
// this array gets used in SingleStepForm and MultiStepForm
const parseFields = (arr: Array<ParsedFormModel>) => {
  const items = arr.reduce((acc: Array<CFReturnType | null>, curr) => {
    const formField = createForm(curr);
    return [...acc, formField];
  }, []);
  // filter out any null values due to early returns from hidden fields
  return items.filter(Boolean) as Array<CFReturnType>;
};

export { createForm, createFormInit };
