import { PostFormDataType } from 'src/api/duke/forms';

interface CFDataType {
  customValidationErrorMsg: string;
  defaultValue: string;
  id: string;
  items: Array<any>;
  label: string;
  maxLength: number;
  minLength: number;
  name: string;
  placeholder: string;
  required: string | boolean;
  tabs: Array<string>;
  title: string;
  toolTipText?: string;
}

interface CFMappingType {
  dataMap: {
    [key: string]: {
      file: CFReturnType['file'];
      props?: CFReturnType['props'];
    };
  };
  inputMap: { [key: string]: string | null };
  regexMap: { [key: string]: { message: string; value: RegExp } };
}

interface CFPropsType {
  columns: string;
  confirmEmailFieldName?: string;
  icon: string;
  isPillToggleField: boolean;
  mask: Function;
  maxlength: number;
  regex: string;
  type: string;
  validationType: string;
}

interface CFReturnType {
  Component: React.ElementType;
  data: CFDataType;
  file: string;
  formName: string;
  id: string;
  props: Partial<CFPropsType>;
  validations: CFValidationsType | null;
}

interface CFValidationsType {
  shouldConfirm?: boolean;
  validationPattern?: { message: string; value: RegExp };
}

interface CreateFormProps {
  ({ fields, title }: Pick<ParsedFormModel, 'fields' | 'title'>): CFReturnType;
}

interface FormConfirmationData {
  data: Array<{ label: string; value: string }>;
}

interface FormModelType {
  dataSource?: string;
  fields?: any;
  modelJson?: { value: string };
  nameOfForm?: string;
  postMethod?: PostFormDataType;
  token?: string;
  salesforce?: { action: boolean; fields: object };
  subhead?: JSS.TextField;
}

interface FormFieldsType {
  label: string;
  name: string;
  type: string;
  value: any;
}

interface GetValidationProps {
  (
    file: CFReturnType['file'],
    fields: ParsedFormModel['fields'],
    regex?: CFPropsType['regex']
  ): CFReturnType['validations'];
}

interface GetDataProps {
  ({ fields, title }: Pick<ParsedFormModel, 'fields' | 'title'>): CFDataType;
}

interface ParsedFormModelFields {
  AppearsOnFormConfirmation: FormFieldsType;
  BackEndLabel: FormFieldsType;
  CalendarMessage?: FormFieldsType;
  Checked?: FormFieldsType;
  ColumnWidth: FormFieldsType;
  ConfirmationFieldLink?: FormFieldsType;
  CustomValidationErrorMsg: FormFieldsType;
  DefaultValueSource?: FormFieldsType;
  FirstOptionText?: FormFieldsType;
  FormId: FormFieldsType;
  GroupName?: FormFieldsType;
  Id: FormFieldsType;
  InputItems?: FormFieldsType;
  Label: FormFieldsType;
  MaximumLength: FormFieldsType;
  MinimumLength: FormFieldsType;
  Name: FormFieldsType;
  PlaceholderText?: FormFieldsType;
  Predefined: FormFieldsType;
  Required: FormFieldsType;
  Tabs?: FormFieldsType;
  TooltipText: FormFieldsType;
  ValidationPattern: FormFieldsType;
  Value: FormFieldsType;
}

interface ParsedFormModel {
  fields: ParsedFormModelFields;
  fresh: boolean;
  title: string;
}

export type {
  CFDataType,
  CFMappingType,
  CFPropsType,
  CFReturnType,
  CFValidationsType,
  CreateFormProps,
  FormConfirmationData,
  FormModelType,
  GetDataProps,
  GetValidationProps,
  ParsedFormModel,
  ParsedFormModelFields,
};
