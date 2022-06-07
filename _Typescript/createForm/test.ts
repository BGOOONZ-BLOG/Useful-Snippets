/* eslint-disable max-lines */
/* eslint-disable no-useless-escape */
import { createForm, createFormInit } from "./index";
import { Data as SingleStepFormData } from "src/components/SingleStepForm/data";
import { data as multiFormBuilderData } from "src/components/MultiStepForm/data";

describe("createFormInit", () => {
  const singleModel = JSON.parse(
    SingleStepFormData.fields.datasource.ModelJson.value
  );
  const multiModel = JSON.parse(
    multiFormBuilderData.fields.datasource.ModelJson.value
  );

  it("returns a single array by default", () => {
    const assert = createFormInit(singleModel, false);
    expect(assert[0]).toBeInstanceOf(Object);
  });

  it("returns a multi-dimensional array if provided a `true` flag", () => {
    const assert = createFormInit(multiModel, true);
    expect(assert[0]).toBeInstanceOf(Array);
  });

  it("returns FormTabs data in the first nested array", () => {
    const assert = createFormInit(multiModel, true);
    expect(assert[0][0].file).toBe("Start");
  });
});

describe("createForm", () => {
  it("should return a parsed form field object", () => {
    const rawField = {
      title: "First Name",
      fields: {
        FormId: {
          label: "FormId",
          type: "hidden",
          value: "stepOne",
          name: "FormId",
        },
        Name: {
          label: "Name",
          type: "hidden",
          value: "FirstName",
          name: "Name",
        },
        Id: {
          label: "Id",
          type: "hidden",
          value: "FirstName",
          name: "Id",
        },
        Label: {
          label: "Label",
          type: "hidden",
          value: "First Name",
          name: "Label",
        },
        BackEndLabel: {
          label: "BackEnd Label",
          type: "hidden",
          value: "First Name",
          name: "BackEndLabel",
        },
        Value: {
          label: "Default Value",
          type: "hidden",
          value: "",
          name: "Value",
        },
        ValidationPattern: {
          label: "Validation Rule",
          type: "hidden",
          value: "lettersWhiteSpace",
          name: "ValidationPattern",
        },
        TooltipText: {
          label: "Tooltip Text",
          type: "input",
          value: "",
          name: "TooltipText",
        },
        CustomValidationErrorMsg: {
          label: "Custom Validation Err. Msg.",
          type: "hidden",
          value: "Please enter a first name.",
          name: "CustomValidationErrorMsg",
        },
        AppearsOnFormConfirmation: {
          label: "Appear on Confirmation",
          type: "checkbox",
          value: false,
          name: "AppearsOnFormConfirmation",
        },
        Required: {
          label: "Required",
          type: "checkbox",
          value: true,
          name: "Required",
        },
        MinimumLength: {
          label: "Min. Length",
          type: "hidden",
          value: "",
          name: "MinimumLength",
        },
        MaximumLength: {
          label: "Max. Length",
          type: "hidden",
          value: "40",
          name: "MaximumLength",
        },
        Predefined: {
          label: "Predefined",
          type: "hidden",
          value: "true",
          name: "Predefined",
        },
        ColumnWidth: {
          label: "Column Width",
          type: "select",
          value: [
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
          ],
          name: "ColumnWidth",
        },
      },
      fresh: true,
    };

    const parsedField = {
      Component: {},
      data: {
        customValidationErrorMsg: "Please enter a first name.",
        defaultValue: "",
        id: "FirstName",
        items: [],
        label: "First Name",
        maxLength: 40,
        minLength: 0,
        name: "FirstName",
        placeholder: "",
        required: true,
        tabs: [],
        title: "First Name",
        toolTipText: "",
      },
      file: "Input",
      id: "bczhlhv3r0ipb96i52w56jc4wzj49iph",
      props: {
        columns: "3",
        type: "text",
      },
      validations: {
        shouldConfirm: false,
        validationPattern: {
          message: "Can only be letters and spaces",
          value: /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\-]+(\s+[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+)*$/,
        },
      },
    };

    const assert = createForm(rawField);
    expect(assert?.data).toEqual(parsedField.data);
    expect(assert?.file).toEqual(parsedField.file);
    expect(assert?.props).toEqual(parsedField.props);
    expect(assert?.validations).toEqual(parsedField.validations);
  });
});
/* eslint-enable max-lines */
/* eslint-enable no-useless-escape */
